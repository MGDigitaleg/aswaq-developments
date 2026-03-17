import { useSearchParams, Navigate } from "react-router-dom";

const redirectMap: Record<string, string> = {
  "7": "/ar/news/press-conference-solaria-mall",
  "8": "/ar/news/cityscape-egypt-2024",
  "3": "/ar/news/invest-with-experience",
  "6": "/ar/news/launching-solaria-mall",
  "1": "/ar/news/invest-city-hub-mall",
  "2": "/ar/news/choose-suitable-project",
};

const NewsDetailArabicRedirect = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const target = id ? redirectMap[id] : null;
  return <Navigate to={target || "/ar/news"} replace />;
};

export default NewsDetailArabicRedirect;
