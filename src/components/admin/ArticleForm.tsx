"use client";

import { useFormStatus } from "react-dom";
import Link from "next/link";

type Category = { id: string; name: string };

type Defaults = {
  title?: string;
  summary?: string;
  content?: string;
  categoryId?: string;
  imageUrl?: string;
  featured?: boolean;
  published?: boolean;
};

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="btn" disabled={pending}>
      {pending ? "Salvando..." : label}
    </button>
  );
}

export default function ArticleForm({
  action,
  categories,
  defaults = {},
  submitLabel = "Salvar",
}: {
  action: (formData: FormData) => void | Promise<void>;
  categories: Category[];
  defaults?: Defaults;
  submitLabel?: string;
}) {
  return (
    <form action={action} className="admin-form-card">
      <div className="form-group">
        <label htmlFor="title">Título *</label>
        <input
          id="title"
          name="title"
          type="text"
          defaultValue={defaults.title ?? ""}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="summary">Resumo *</label>
        <textarea
          id="summary"
          name="summary"
          defaultValue={defaults.summary ?? ""}
          style={{ minHeight: 70 }}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="content">Conteúdo *</label>
        <textarea
          id="content"
          name="content"
          defaultValue={defaults.content ?? ""}
          style={{ minHeight: 220 }}
          placeholder="Separe os parágrafos com uma linha em branco."
          required
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="categoryId">Categoria *</label>
          <select
            id="categoryId"
            name="categoryId"
            defaultValue={defaults.categoryId ?? ""}
            required
          >
            <option value="" disabled>
              Selecione...
            </option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="imageUrl">URL da imagem</label>
          <input
            id="imageUrl"
            name="imageUrl"
            type="text"
            defaultValue={defaults.imageUrl ?? ""}
            placeholder="Deixe em branco para gerar automaticamente"
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group form-checkbox">
          <input
            id="featured"
            name="featured"
            type="checkbox"
            defaultChecked={defaults.featured ?? false}
          />
          <label htmlFor="featured" style={{ marginBottom: 0 }}>
            Destaque na home
          </label>
        </div>

        <div className="form-group form-checkbox">
          <input
            id="published"
            name="published"
            type="checkbox"
            defaultChecked={defaults.published ?? true}
          />
          <label htmlFor="published" style={{ marginBottom: 0 }}>
            Publicada
          </label>
        </div>
      </div>

      <div className="form-actions">
        <SubmitButton label={submitLabel} />
        <Link href="/admin/noticias" className="btn btn-secondary">
          Cancelar
        </Link>
      </div>
    </form>
  );
}
