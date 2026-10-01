import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function img(seed: string) {
  return `https://picsum.photos/seed/${encodeURIComponent(seed)}/800/450`;
}

function paragraphs(topic: string): string {
  return [
    `Em uma movimentação que repercutiu em todo o país, ${topic.toLowerCase()} ganhou destaque nesta semana. Especialistas ouvidos pela reportagem avaliam que os desdobramentos devem influenciar o cenário nos próximos meses.`,
    `De acordo com fontes próximas ao assunto, os números divulgados surpreenderam analistas e abriram espaço para novas discussões. "É um momento decisivo e precisamos acompanhar com atenção", afirmou um dos entrevistados.`,
    `Entidades do setor se manifestaram defendendo cautela, enquanto representantes da sociedade civil pedem mais transparência. A expectativa é de que novos dados sejam apresentados nas próximas semanas.`,
    `A reportagem continua acompanhando os desdobramentos e trará atualizações assim que novas informações forem confirmadas pelas partes envolvidas.`,
  ].join("\n\n");
}

const categoriesData = [
  { name: "Política", slug: "politica" },
  { name: "Economia", slug: "economia" },
  { name: "Esportes", slug: "esportes" },
  { name: "Tecnologia", slug: "tecnologia" },
  { name: "Entretenimento", slug: "entretenimento" },
  { name: "Saúde", slug: "saude" },
  { name: "Mundo", slug: "mundo" },
  { name: "Ciência", slug: "ciencia" },
];

const articlesData: {
  title: string;
  summary: string;
  category: string;
  featured?: boolean;
}[] = [
  // Política
  { title: "Congresso aprova novo pacote de medidas econômicas em votação apertada", summary: "Texto segue agora para sanção presidencial após longa sessão no plenário.", category: "politica", featured: true },
  { title: "Governadores se reúnem para discutir reforma do pacto federativo", summary: "Encontro busca alinhar propostas de distribuição de recursos entre os estados.", category: "politica" },
  { title: "Nova proposta de reforma administrativa é apresentada no Senado", summary: "Projeto prevê mudanças na carreira do funcionalismo público federal.", category: "politica" },
  { title: "Prefeituras anunciam plano conjunto de investimentos em mobilidade urbana", summary: "Iniciativa deve beneficiar grandes centros com transporte integrado.", category: "politica" },

  // Economia
  { title: "Banco Central mantém taxa de juros e sinaliza estabilidade para o próximo trimestre", summary: "Decisão era esperada pelo mercado e busca controlar a inflação.", category: "economia", featured: true },
  { title: "Dólar recua e bolsa fecha em alta impulsionada por setor de tecnologia", summary: "Investidores reagem a dados positivos da economia internacional.", category: "economia" },
  { title: "Setor de serviços registra crescimento acima do esperado em agosto", summary: "Resultado reforça expectativa de recuperação gradual da economia.", category: "economia" },
  { title: "Pequenas empresas lideram geração de empregos no último trimestre", summary: "Dados mostram papel central dos microempreendedores na retomada.", category: "economia" },

  // Esportes
  { title: "Seleção brasileira define convocados para a próxima rodada de eliminatórias", summary: "Técnico aposta em mistura de experiência e jovens talentos.", category: "esportes", featured: true },
  { title: "Clube paulista contrata reforço internacional para a temporada", summary: "Jogador chega com expectativa de reforçar o ataque da equipe.", category: "esportes" },
  { title: "Atleta brasileira conquista medalha de ouro em campeonato mundial", summary: "Desempenho histórico coloca o país no topo do ranking da modalidade.", category: "esportes" },
  { title: "Final do campeonato nacional terá transmissão em novo formato", summary: "Organização aposta em tecnologia para ampliar alcance da partida.", category: "esportes" },

  // Tecnologia
  { title: "Startups brasileiras recebem rodada recorde de investimentos em inteligência artificial", summary: "Setor atrai capital estrangeiro e acelera contratações.", category: "tecnologia", featured: true },
  { title: "Nova geração de smartphones promete bateria com duração dobrada", summary: "Fabricantes apostam em eficiência energética como diferencial.", category: "tecnologia" },
  { title: "Empresas aceleram adoção de computação em nuvem no país", summary: "Migração de sistemas busca reduzir custos e aumentar segurança.", category: "tecnologia" },
  { title: "Especialistas debatem regulação de inteligência artificial no Brasil", summary: "Discussão envolve privacidade, ética e impacto no mercado de trabalho.", category: "tecnologia" },

  // Entretenimento
  { title: "Festival de cinema nacional anuncia programação com estreias inéditas", summary: "Evento reúne produções premiadas e novos diretores.", category: "entretenimento", featured: true },
  { title: "Série brasileira é indicada a premiação internacional de streaming", summary: "Produção conquista crítica e público fora do país.", category: "entretenimento" },
  { title: "Turnê de artista nacional esgota ingressos em poucas horas", summary: "Shows adicionais são confirmados após alta procura.", category: "entretenimento" },
  { title: "Museu abre exposição interativa que une arte e tecnologia", summary: "Mostra convida o público a explorar instalações imersivas.", category: "entretenimento" },

  // Saúde
  { title: "Campanha nacional de vacinação amplia público-alvo em todo o país", summary: "Ministério reforça importância da imunização em massa.", category: "saude", featured: true },
  { title: "Estudo aponta benefícios da atividade física regular para a saúde mental", summary: "Pesquisadores recomendam exercícios como parte do tratamento.", category: "saude" },
  { title: "Hospitais investem em telemedicina para ampliar atendimento", summary: "Tecnologia facilita acesso de pacientes em regiões remotas.", category: "saude" },
  { title: "Especialistas alertam para importância do sono na prevenção de doenças", summary: "Qualidade do descanso impacta diretamente o sistema imunológico.", category: "saude" },

  // Mundo
  { title: "Líderes mundiais se reúnem em cúpula sobre mudanças climáticas", summary: "Encontro busca metas mais ambiciosas de redução de emissões.", category: "mundo", featured: true },
  { title: "Economia global mostra sinais de recuperação, aponta relatório", summary: "Organismos internacionais revisam projeções para o ano.", category: "mundo" },
  { title: "Acordo comercial entre blocos econômicos avança após negociações", summary: "Entendimento deve facilitar exportações de diversos setores.", category: "mundo" },

  // Ciência
  { title: "Cientistas brasileiros desenvolvem material sustentável a partir de resíduos", summary: "Inovação pode reduzir impacto ambiental na indústria.", category: "ciencia", featured: true },
  { title: "Telescópio registra imagens inéditas de galáxia distante", summary: "Descoberta ajuda a entender a formação do universo.", category: "ciencia" },
  { title: "Pesquisa nacional avança no estudo de energia limpa e renovável", summary: "Projeto busca alternativas viáveis para a matriz energética.", category: "ciencia" },
];

async function main() {
  console.log("🌱 Iniciando seed...");

  // Admin user
  const passwordHash = await bcrypt.hash("admin123", 10);
  const admin = await prisma.user.upsert({
    where: { email: "admin@portal.com" },
    update: {},
    create: {
      name: "Administrador",
      email: "admin@portal.com",
      passwordHash,
      role: "admin",
    },
  });
  console.log(`👤 Admin criado: ${admin.email} (senha: admin123)`);

  // Categories
  const categoryMap: Record<string, string> = {};
  for (const c of categoriesData) {
    const cat = await prisma.category.upsert({
      where: { slug: c.slug },
      update: { name: c.name },
      create: c,
    });
    categoryMap[c.slug] = cat.id;
  }
  console.log(`📂 ${categoriesData.length} categorias criadas`);

  // Articles
  let count = 0;
  const now = Date.now();
  for (let i = 0; i < articlesData.length; i++) {
    const a = articlesData[i];
    const slug = slugify(a.title);
    const publishedAt = new Date(now - i * 1000 * 60 * 60 * 6); // 6h apart
    await prisma.article.upsert({
      where: { slug },
      update: {},
      create: {
        title: a.title,
        slug,
        summary: a.summary,
        content: paragraphs(a.title),
        imageUrl: img(slug),
        featured: a.featured ?? false,
        published: true,
        views: Math.floor(Math.random() * 5000) + 100,
        categoryId: categoryMap[a.category],
        authorId: admin.id,
        publishedAt,
      },
    });
    count++;
  }
  console.log(`📰 ${count} notícias criadas`);
  console.log("✅ Seed concluído!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
