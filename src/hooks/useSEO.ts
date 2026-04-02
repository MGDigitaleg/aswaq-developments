import { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface SEOOptions {
  title: string;
  description: string;
  ogImage?: string;
  ogType?: string;
  canonical?: string;
  noindex?: boolean;
}

const useSEO = (title: string, description: string, options?: Partial<Omit<SEOOptions, 'title' | 'description'>>) => {
  const location = useLocation();
  const isArabic = location.pathname.startsWith("/ar");
  const baseDomain = "https://aswaq-eg.site";

  useEffect(() => {
    // Title & Description
    document.title = title;
    setMeta("description", description);

    // Canonical
    const canonicalUrl = options?.canonical || `${baseDomain}${location.pathname}`;
    setLink("canonical", canonicalUrl);

    // Hreflang
    const enPath = isArabic ? location.pathname.replace(/^\/ar/, "") || "/" : location.pathname;
    const arPath = isArabic ? location.pathname : `/ar${location.pathname === "/" ? "" : location.pathname}`;
    setLink("alternate", `${baseDomain}${enPath}`, "en");
    setLink("alternate", `${baseDomain}${arPath}`, "ar");
    setLink("alternate", `${baseDomain}${enPath}`, "x-default");

    // Open Graph
    setMeta("og:title", title, true);
    setMeta("og:description", description, true);
    setMeta("og:url", canonicalUrl, true);
    setMeta("og:type", options?.ogType || "website", true);
    setMeta("og:site_name", "ASWAQ Developments", true);
    setMeta("og:locale", isArabic ? "ar_EG" : "en_US", true);
    if (options?.ogImage) {
      setMeta("og:image", options.ogImage, true);
    }

    // Twitter Cards
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", title);
    setMeta("twitter:description", description);
    if (options?.ogImage) {
      setMeta("twitter:image", options.ogImage);
    }

    // Robots
    if (options?.noindex) {
      setMeta("robots", "noindex, nofollow");
    }
  }, [title, description, location.pathname, isArabic]);
};

function setMeta(nameOrProp: string, content: string, isProperty = false) {
  const attr = isProperty ? "property" : "name";
  let el = document.querySelector(`meta[${attr}="${nameOrProp}"]`) as HTMLMetaElement | null;
  if (el) {
    el.setAttribute("content", content);
  } else {
    el = document.createElement("meta");
    el.setAttribute(attr, nameOrProp);
    el.setAttribute("content", content);
    document.head.appendChild(el);
  }
}

function setLink(rel: string, href: string, hreflang?: string) {
  const selector = hreflang
    ? `link[rel="${rel}"][hreflang="${hreflang}"]`
    : `link[rel="${rel}"]:not([hreflang])`;
  let el = document.querySelector(selector) as HTMLLinkElement | null;
  if (el) {
    el.setAttribute("href", href);
  } else {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    el.setAttribute("href", href);
    if (hreflang) el.setAttribute("hreflang", hreflang);
    document.head.appendChild(el);
  }
}

export default useSEO;
