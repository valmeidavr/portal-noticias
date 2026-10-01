"use client";

import { useTransition } from "react";
import { deleteArticle } from "@/app/admin/actions";

export default function DeleteButton({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();

  function handleClick() {
    if (!confirm("Tem certeza que deseja excluir esta notícia?")) return;
    startTransition(async () => {
      await deleteArticle(id);
    });
  }

  return (
    <button
      type="button"
      className="btn btn-danger"
      onClick={handleClick}
      disabled={isPending}
    >
      {isPending ? "Excluindo..." : "Excluir"}
    </button>
  );
}
