import { getCategories } from "@/lib/data";
import { createArticle } from "@/app/admin/actions";
import ArticleForm from "@/components/admin/ArticleForm";

export const dynamic = "force-dynamic";

export default async function NewArticlePage() {
  const categories = await getCategories();

  return (
    <>
      <div className="admin-topbar">
        <h1>Nova Notícia</h1>
      </div>
      <ArticleForm
        action={createArticle}
        categories={categories}
        submitLabel="Publicar notícia"
      />
    </>
  );
}
