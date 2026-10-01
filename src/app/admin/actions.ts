"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { slugify } from "@/lib/utils";

async function requireAuth() {
  const session = await auth();
  if (!session?.user) {
    throw new Error("Não autorizado");
  }
  return session;
}

async function uniqueSlug(base: string, ignoreId?: string): Promise<string> {
  let slug = base || "noticia";
  let n = 1;
  while (true) {
    const existing = await prisma.article.findUnique({ where: { slug } });
    if (!existing || existing.id === ignoreId) return slug;
    n += 1;
    slug = `${base}-${n}`;
  }
}

export async function createArticle(formData: FormData) {
  const session = await requireAuth();

  const title = String(formData.get("title") || "").trim();
  const summary = String(formData.get("summary") || "").trim();
  const content = String(formData.get("content") || "").trim();
  const categoryId = String(formData.get("categoryId") || "");
  const imageUrlRaw = String(formData.get("imageUrl") || "").trim();
  const featured = formData.get("featured") === "on";
  const published = formData.get("published") === "on";

  if (!title || !summary || !content || !categoryId) {
    throw new Error("Preencha todos os campos obrigatórios");
  }

  const baseSlug = slugify(title);
  const slug = await uniqueSlug(baseSlug);
  const imageUrl =
    imageUrlRaw || `https://picsum.photos/seed/${encodeURIComponent(slug)}/800/450`;

  await prisma.article.create({
    data: {
      title,
      slug,
      summary,
      content,
      imageUrl,
      featured,
      published,
      categoryId,
      authorId: session.user.id as string,
    },
  });

  revalidatePath("/");
  revalidatePath("/admin/noticias");
  redirect("/admin/noticias");
}

export async function updateArticle(id: string, formData: FormData) {
  await requireAuth();

  const title = String(formData.get("title") || "").trim();
  const summary = String(formData.get("summary") || "").trim();
  const content = String(formData.get("content") || "").trim();
  const categoryId = String(formData.get("categoryId") || "");
  const imageUrl = String(formData.get("imageUrl") || "").trim();
  const featured = formData.get("featured") === "on";
  const published = formData.get("published") === "on";

  if (!title || !summary || !content || !categoryId) {
    throw new Error("Preencha todos os campos obrigatórios");
  }

  const current = await prisma.article.findUnique({ where: { id } });
  if (!current) throw new Error("Notícia não encontrada");

  const slug =
    current.title === title
      ? current.slug
      : await uniqueSlug(slugify(title), id);

  await prisma.article.update({
    where: { id },
    data: {
      title,
      slug,
      summary,
      content,
      imageUrl: imageUrl || current.imageUrl,
      featured,
      published,
      categoryId,
    },
  });

  revalidatePath("/");
  revalidatePath("/admin/noticias");
  redirect("/admin/noticias");
}

export async function deleteArticle(id: string) {
  await requireAuth();
  await prisma.article.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin/noticias");
}
