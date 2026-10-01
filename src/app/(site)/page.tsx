import Link from "next/link";
import Image from "next/image";
import ArticleCard from "@/components/ArticleCard";
import {
  getFeaturedArticles,
  getLatestArticles,
  getMostViewedArticles,
  getArticlesGroupedByCategory,
} from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [featured, latest, mostViewed, grouped] = await Promise.all([
    getFeaturedArticles(3),
    getLatestArticles(8),
    getMostViewedArticles(5),
    getArticlesGroupedByCategory(),
  ]);

  const heroMain = featured[0];
  const heroSide = featured.slice(1, 3);

  return (
    <div className="container">
      {/* HERO */}
      {heroMain && (
        <section className="hero">
          <Link href={`/noticia/${heroMain.slug}`} className="hero-main">
            <Image
              src={heroMain.imageUrl}
              alt={heroMain.title}
              fill
              priority
              sizes="(max-width: 700px) 100vw, 800px"
            />
            <div className="hero-overlay">
              <span className="tag">{heroMain.category.name}</span>
              <h2>{heroMain.title}</h2>
              <p>{heroMain.summary}</p>
            </div>
          </Link>
          <div className="hero-side">
            {heroSide.map((a) => (
              <Link
                key={a.id}
                href={`/noticia/${a.slug}`}
                className="hero-side-card"
              >
                <Image
                  src={a.imageUrl}
                  alt={a.title}
                  fill
                  sizes="(max-width: 700px) 100vw, 400px"
                />
                <div className="hero-overlay">
                  <span className="tag">{a.category.name}</span>
                  <h3>{a.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <div className="layout-grid">
        <div>
          {/* ÚLTIMAS */}
          <section className="section">
            <h2 className="section-title">Últimas Notícias</h2>
            <div className="card-grid">
              {latest.map((a) => (
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

          {/* POR CATEGORIA */}
          {grouped.map((cat) => (
            <section className="section" key={cat.id}>
              <h2 className="section-title">
                {cat.name}
                <Link href={`/categoria/${cat.slug}`}>Ver tudo →</Link>
              </h2>
              <div className="card-grid">
                {cat.articles.map((a) => (
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
          ))}
        </div>

        {/* SIDEBAR */}
        <aside>
          <div className="sidebar-widget">
            <h3 className="widget-title">Mais Lidas</h3>
            <ol className="ranked-list">
              {mostViewed.map((a) => (
                <li key={a.id}>
                  <Link href={`/noticia/${a.slug}`}>{a.title}</Link>
                </li>
              ))}
            </ol>
          </div>

          <div className="sidebar-widget">
            <h3 className="widget-title">Editorias</h3>
            <ul style={{ listStyle: "none" }}>
              {grouped.map((c) => (
                <li
                  key={c.id}
                  style={{
                    padding: "10px 0",
                    borderBottom: "1px solid var(--color-border)",
                    fontSize: 14,
                    fontWeight: 700,
                  }}
                >
                  <Link href={`/categoria/${c.slug}`}>{c.name} →</Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
