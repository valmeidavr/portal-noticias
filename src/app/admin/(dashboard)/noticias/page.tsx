import Link from "next/link";
import { prisma } from "@/lib/prisma";
import DeleteButton from "@/components/admin/DeleteButton";

export const dynamic = "force-dynamic";

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(date));
}

export default async function AdminArticlesPage() {
  const articles = await prisma.article.findMany({
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <>
      <div className="admin-topbar">
        <h1>Notícias ({articles.length})</h1>
        <Link href="/admin/noticias/novo" className="btn">
          + Nova Notícia
        </Link>
      </div>

      <table className="data-table">
        <thead>
          <tr>
            <th>Título</th>
            <th>Categoria</th>
            <th>Data</th>
            <th>Views</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {articles.map((a) => (
            <tr key={a.id}>
              <td style={{ maxWidth: 340 }}>
                {a.title}
                {a.featured && (
                  <span
                    className="badge badge-red"
                    style={{ marginLeft: 8 }}
                  >
                    Destaque
                  </span>
                )}
              </td>
              <td>{a.category.name}</td>
              <td>{formatDate(a.publishedAt)}</td>
              <td>{a.views.toLocaleString("pt-BR")}</td>
              <td>
                {a.published ? (
                  <span className="badge badge-green">Publicada</span>
                ) : (
                  <span className="badge badge-gray">Rascunho</span>
                )}
              </td>
              <td>
                <div className="table-actions">
                  <Link
                    href={`/admin/noticias/${a.id}/editar`}
                    className="btn btn-secondary btn-sm"
                  >
                    Editar
                  </Link>
                  <DeleteButton id={a.id} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
