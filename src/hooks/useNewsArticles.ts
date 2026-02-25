import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

export interface NewsArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  content: string[];
  youtubeId?: string;
}

function mapArticle(row: Tables<"blog_articles">): NewsArticle {
  // content is stored as JSON array of strings (paragraphs)
  let contentArray: string[] = [];
  if (Array.isArray(row.content)) {
    contentArray = row.content as string[];
  }

  return {
    id: row.slug,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt || "",
    image: row.image_url || "",
    content: contentArray,
    youtubeId: row.youtube_id || undefined,
  };
}

export function useNewsArticles(lang: "en" | "ar" = "en") {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase
        .from("blog_articles")
        .select("*")
        .eq("is_published", true)
        .eq("lang", lang)
        .order("created_at", { ascending: false });

      setArticles((data || []).map(mapArticle));
      setLoading(false);
    };
    fetch();
  }, [lang]);

  return { articles, loading };
}

export function useNewsArticle(slug: string | undefined, lang: "en" | "ar" = "en") {
  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) { setLoading(false); return; }
    const fetch = async () => {
      const { data } = await supabase
        .from("blog_articles")
        .select("*")
        .eq("slug", slug)
        .eq("lang", lang)
        .eq("is_published", true)
        .maybeSingle();

      setArticle(data ? mapArticle(data) : null);
      setLoading(false);
    };
    fetch();
  }, [slug, lang]);

  return { article, loading };
}

export function useLatestNews(lang: "en" | "ar" = "en", limit = 3) {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase
        .from("blog_articles")
        .select("*")
        .eq("is_published", true)
        .eq("lang", lang)
        .order("created_at", { ascending: false })
        .limit(limit);

      setArticles((data || []).map(mapArticle));
      setLoading(false);
    };
    fetch();
  }, [lang, limit]);

  return { articles, loading };
}
