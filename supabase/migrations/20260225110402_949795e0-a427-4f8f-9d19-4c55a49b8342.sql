
ALTER TABLE public.blog_articles DROP CONSTRAINT blog_articles_slug_key;
ALTER TABLE public.blog_articles ADD CONSTRAINT blog_articles_slug_lang_key UNIQUE (slug, lang);
