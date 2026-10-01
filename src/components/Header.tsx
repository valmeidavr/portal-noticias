import Link from "next/link";
import { getCategories } from "@/lib/data";

export default async function Header() {
  const categories = await getCategories();

  const today = new Intl.DateTimeFormat("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date());

  return (
    <header className="site-header">
      <div className="header-top">
        <Link href="/" className="logo" aria-label="Página inicial">
          <span className="logo-mark">P</span>ortal
        </Link>
        <span className="header-date">{today}</span>
        <Link href="/admin/login" className="header-login">
          Painel Admin
        </Link>
      </div>
      <nav className="main-nav">
        <ul>
          <li>
            <Link href="/">Início</Link>
          </li>
          {categories.map((cat) => (
            <li key={cat.id}>
              <Link href={`/categoria/${cat.slug}`}>{cat.name}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
