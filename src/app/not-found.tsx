import Link from "next/link";

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "70vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: 20,
        gap: 12,
      }}
    >
      <h1 style={{ fontSize: 72, color: "var(--color-primary)" }}>404</h1>
      <p style={{ fontSize: 18, color: "var(--color-muted)" }}>
        A página que você procura não foi encontrada.
      </p>
      <Link href="/" className="btn" style={{ marginTop: 12 }}>
        Voltar para a home
      </Link>
    </div>
  );
}
