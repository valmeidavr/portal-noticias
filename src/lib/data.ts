import { prisma } from "@/lib/prisma";

export async function getFeaturedArticles(limit = 5) {
  return prisma.article.findMany({
    where: { published: true, featured: true },
    include: { category: true, author: true },
    orderBy: { publishedAt: "desc" },
    take: limit,
  });
}

export async function getLatestArticles(limit = 12) {
  return prisma.article.findMany({
    where: { published: true },
    include: { category: true, author: true },
    orderBy: { publishedAt: "desc" },
    take: limit,
  });
}

export async function getMostViewedArticles(limit = 5) {
  return prisma.article.findMany({
    where: { published: true },
    include: { category: true },
    orderBy: { views: "desc" },
    take: limit,
  });
}

export async function getArticleBySlug(slug: string) {
  return prisma.article.findUnique({
    where: { slug },
    include: { category: true, author: true },
  });
}

export async function getRelatedArticles(
  categoryId: string,
  excludeId: string,
  limit = 4
) {
  return prisma.article.findMany({
    where: {
      published: true,
      categoryId,
      NOT: { id: excludeId },
    },
    include: { category: true },
    orderBy: { publishedAt: "desc" },
    take: limit,
  });
}

export async function getCategories() {
  return prisma.category.findMany({ orderBy: { name: "asc" } });
}

export async function getCategoryBySlug(slug: string) {
  return prisma.category.findUnique({ where: { slug } });
}

export async function getArticlesByCategory(categoryId: string) {
  return prisma.article.findMany({
    where: { published: true, categoryId },
    include: { category: true, author: true },
    orderBy: { publishedAt: "desc" },
  });
}

export async function getArticlesGroupedByCategory() {
  const categories = await prisma.category.findMany({
    include: {
      articles: {
        where: { published: true },
        include: { category: true },
        orderBy: { publishedAt: "desc" },
        take: 4,
      },
    },
    orderBy: { name: "asc" },
  });
  return categories.filter((c) => c.articles.length > 0);
}

export async function incrementViews(id: string) {
  try {
    await prisma.article.update({
      where: { id },
      data: { views: { increment: 1 } },
    });
  } catch {
    // ignore
  }
}
