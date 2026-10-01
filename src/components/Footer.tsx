import Link from "next/link";
import { getCategories } from "@/lib/data";

export default async function Footer() {
  const categories = await getCategories();
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col">
            <div className="footer-logo">Portal</div>
            <p style={{ fontSize: 13, color: "#aaa" }}>
              Seu portal de notícias com cobertura completa do Brasil e do mundo,
              24 horas por dia.
            </p>
          </div>
          <div className="footer-col">
            <h4>Editorias</h4>
            <ul>
              {categories.slice(0, 4).map((c) => (
                <li key={c.id}>
                  <Link href={`/categoria/${c.slug}`}>{c.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="footer-col">
            <h4>Mais</h4>
            <ul>
              {categories.slice(4).map((c) => (
                <li key={c.id}>
                  <Link href={`/categoria/${c.slug}`}>{c.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="footer-col">
            <h4>Institucional</h4>
            <ul>
              <li>
                <Link href="/">Sobre</Link>
              </li>
              <li>
                <Link href="/">Contato</Link>
              </li>
              <li>
                <Link href="/">Política de Privacidade</Link>
              </li>
              <li>
                <Link href="/admin/login">Painel Admin</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          © {year} Portal de Notícias. Todos os direitos reservados. Conteúdo
          fictício para fins de demonstração.
        </div>
      </div>
    </footer>
  );
}
