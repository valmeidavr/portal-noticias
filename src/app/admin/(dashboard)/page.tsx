import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const [total, published, drafts, categories, viewsAgg, recent] =
    await Promise.all([
      prisma.article.count(),
      prisma.article.count({ where: { published: true } }),
      prisma.article.count({ where: { published: false } }),
      prisma.category.count(),
      prisma.article.aggregate({ _sum: { views: true } }),
      prisma.article.findMany({
        include: { category: true },
        orderBy: { createdAt: "desc" },
        take: 5,
      }),
    ]);

  const stats = [
    { label: "Total de notícias", value: total },
    { label: "Publicadas", value: published },
    { label: "Rascunhos", value: drafts },
    { label: "Categorias", value: categories },
    {
      label: "Visualizações totais",
      value: (viewsAgg._sum.views ?? 0).toLocaleString("pt-BR"),
    },
  ];

  return (
    <>
      <div className="admin-topbar">
        <h1>Dashboard</h1>
      </div>

      <div className="stats-grid">
        {stats.map((s) => (
          <div className="stat-card" key={s.label}>
            <div className="stat-value">{s.value}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      <h2 className="section-title">Notícias recentes</h2>
      <table className="data-table">
        <thead>
          <tr>
            <th>Título</th>
            <th>Categoria</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {recent.map((a) => (
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.category.name}</td>
              <td>
                {a.published ? (
                  <span className="badge badge-green">Publicada</span>
                ) : (
                  <span className="badge badge-gray">Rascunho</span>
                )}
              </td>
              <td>
                <Link
                  href={`/admin/noticias/${a.id}/editar`}
                  className="btn btn-secondary btn-sm"
                >
                  Editar
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
