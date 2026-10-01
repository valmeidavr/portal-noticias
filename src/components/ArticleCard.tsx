import Link from "next/link";
import Image from "next/image";

type ArticleCardProps = {
  title: string;
  slug: string;
  summary: string;
  imageUrl: string;
  categoryName: string;
  publishedAt: Date;
};

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
}

export default function ArticleCard({
  title,
  slug,
  summary,
  imageUrl,
  categoryName,
  publishedAt,
}: ArticleCardProps) {
  return (
    <article className="card">
      <Link href={`/noticia/${slug}`} className="card-img">
        <Image
          src={imageUrl}
          alt={title}
          fill
          sizes="(max-width: 700px) 100vw, 300px"
        />
      </Link>
      <div className="card-body">
        <span className="tag tag-light">{categoryName}</span>
        <Link href={`/noticia/${slug}`}>
          <h3>{title}</h3>
        </Link>
        <p>{summary}</p>
        <div className="card-meta">
          <span>{formatDate(publishedAt)}</span>
        </div>
      </div>
    </article>
  );
}
