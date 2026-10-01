import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ArticleCard from "@/components/ArticleCard";
import {
  getCategoryBySlug,
  getArticlesByCategory,
} from "@/lib/data";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) return { title: "Categoria não encontrada" };
  return {
    title: `${category.name} | Portal de Notícias`,
    description: `Últimas notícias de ${category.name}.`,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const articles = await getArticlesByCategory(category.id);

  return (
    <div className="container">
      <div className="page-header">
        <h1>{category.name}</h1>
        <p>
          {articles.length}{" "}
          {articles.length === 1
            ? "notícia encontrada"
            : "notícias encontradas"}
        </p>
      </div>

      {articles.length === 0 ? (
        <div className="empty-state">
          Nenhuma notícia publicada nesta categoria ainda.
        </div>
      ) : (
        <div className="card-grid">
          {articles.map((a) => (
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
      )}
    </div>
  );
}
