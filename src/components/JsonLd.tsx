import { useEffect } from "react";

interface JsonLdProps {
  data: Record<string, unknown> | Record<string, unknown>[];
}

const JsonLd = ({ data }: JsonLdProps) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(data);
    script.id = `jsonld-${JSON.stringify(data).slice(0, 20).replace(/\W/g, "")}`;
    document.head.appendChild(script);
    return () => {
      script.remove();
    };
  }, [data]);

  return null;
};

export default JsonLd;

// ── Schema Helpers ──

const SITE_URL = "https://aswaq-eg.site";
const LOGO_URL = `${SITE_URL}/favicon.png`;
const COMPANY = "ASWAQ Developments";

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  name: COMPANY,
  alternateName: "أسواق للتطوير العقاري",
  url: SITE_URL,
  logo: LOGO_URL,
  image: LOGO_URL,
  description:
    "ASWAQ Developments delivers premium units for rent and property for sale in Egypt, with mixed-use properties in Shorouk City and flexible payment plans.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Villa 1/127 - Al-Nsoor complex, Al Moltaqa Neighborhood, Otostrad road",
    addressLocality: "Sheraton",
    addressRegion: "Cairo",
    addressCountry: "EG",
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    availableLanguage: ["English", "Arabic"],
  },
  sameAs: [
    "https://www.facebook.com/aswaqdev",
    "https://www.instagram.com/aswaqdev",
  ],
  areaServed: {
    "@type": "City",
    name: "Shorouk City",
  },
  foundingDate: "2004",
  numberOfEmployees: { "@type": "QuantitativeValue", minValue: 50 },
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: COMPANY,
  url: SITE_URL,
  inLanguage: ["en", "ar"],
  publisher: { "@type": "Organization", name: COMPANY, logo: LOGO_URL },
};

export const buildBreadcrumbSchema = (
  items: { name: string; url: string }[]
) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: item.name,
    item: `${SITE_URL}${item.url}`,
  })),
});

export const buildFaqSchema = (
  faqs: { question: string; answer: string }[]
) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
});

export const buildArticleSchema = (article: {
  title: string;
  excerpt: string;
  date: string;
  image: string;
  slug: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  headline: article.title,
  description: article.excerpt,
  image: article.image,
  datePublished: article.date,
  author: { "@type": "Organization", name: COMPANY },
  publisher: {
    "@type": "Organization",
    name: COMPANY,
    logo: { "@type": "ImageObject", url: LOGO_URL },
  },
  mainEntityOfPage: `${SITE_URL}/news/${article.slug}`,
});

export const buildProjectSchema = (project: {
  name: string;
  description: string;
  image: string;
  url: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "RealEstateListing",
  name: project.name,
  description: project.description,
  image: project.image,
  url: `${SITE_URL}${project.url}`,
  offeredBy: { "@type": "Organization", name: COMPANY },
});
