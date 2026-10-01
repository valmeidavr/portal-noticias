import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getArticleBySlug,
  getRelatedArticles,
  incrementViews,
} from "@/lib/data";
import ArticleCard from "@/components/ArticleCard";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return { title: "Notícia não encontrada" };
  return {
    title: `${article.title} | Portal de Notícias`,
    description: article.summary,
  };
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article || !article.published) {
    notFound();
  }

  await incrementViews(article.id);

  const related = await getRelatedArticles(article.categoryId, article.id, 4);

  return (
    <div className="container">
      <article className="article-page">
        <nav className="breadcrumb">
          <Link href="/">Início</Link> {" / "}
          <Link href={`/categoria/${article.category.slug}`}>
            {article.category.name}
          </Link>
        </nav>

        <span className="tag">{article.category.name}</span>
        <h1 className="article-title">{article.title}</h1>
        <p className="article-summary">{article.summary}</p>

        <div className="article-byline">
          <span>
            Por <strong>{article.author.name}</strong>
          </span>
          <span>•</span>
          <span>{formatDate(article.publishedAt)}</span>
          <span>•</span>
          <span>{article.views.toLocaleString("pt-BR")} visualizações</span>
        </div>

        <div className="article-hero-img">
          <Image
            src={article.imageUrl}
            alt={article.title}
            fill
            priority
            sizes="(max-width: 820px) 100vw, 800px"
          />
        </div>
        <p className="article-caption">
          Imagem ilustrativa — conteúdo fictício para demonstração.
        </p>

        <div className="article-content">
          {article.content.split("\n\n").map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </article>

      {related.length > 0 && (
        <section className="section" style={{ marginTop: 40 }}>
          <h2 className="section-title">Leia também</h2>
          <div className="card-grid">
            {related.map((a) => (
              <ArticleCard
                key={a.id}
                title={a.title}
                slug={a.slug}
                summary={a.summary}
                imageUrl={a.imageUrl}
                categoryName={a.category.name}
                publishedAt={a.publishedAt}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
