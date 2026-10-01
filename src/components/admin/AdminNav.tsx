"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/noticias", label: "Notícias" },
  { href: "/admin/noticias/novo", label: "Nova Notícia" },
  { href: "/", label: "Ver o site" },
];

export default function AdminNav() {
  const pathname = usePathname();

  return (
    <nav>
      {links.map((link) => {
        const active =
          link.href === "/admin"
            ? pathname === "/admin"
            : link.href !== "/" && pathname.startsWith(link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            className={active ? "active" : ""}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
