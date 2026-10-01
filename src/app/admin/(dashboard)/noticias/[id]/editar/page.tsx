import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getCategories } from "@/lib/data";
import { updateArticle } from "@/app/admin/actions";
import ArticleForm from "@/components/admin/ArticleForm";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ id: string }> };

export default async function EditArticlePage({ params }: Props) {
  const { id } = await params;
  const [article, categories] = await Promise.all([
    prisma.article.findUnique({ where: { id } }),
    getCategories(),
  ]);

  if (!article) notFound();

  const updateWithId = updateArticle.bind(null, id);

  return (
    <>
      <div className="admin-topbar">
        <h1>Editar Notícia</h1>
      </div>
      <ArticleForm
        action={updateWithId}
        categories={categories}
        submitLabel="Salvar alterações"
        defaults={{
          title: article.title,
          summary: article.summary,
          content: article.content,
          categoryId: article.categoryId,
          imageUrl: article.imageUrl,
          featured: article.featured,
          published: article.published,
        }}
      />
    </>
  );
}
