import { useSearchParams, Navigate } from "react-router-dom";

const redirectMap: Record<string, string> = {
  "7": "/news/press-conference-solaria-mall",
  "8": "/news/cityscape-egypt-2024",
  "3": "/news/invest-with-experience",
  "2": "/news/choose-suitable-project",
  "1": "/news/invest-city-hub-mall",
  "6": "/news/launching-solaria-mall",
};

const NewsDetailRedirect = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const target = id ? redirectMap[id] : null;

  return <Navigate to={target || "/news"} replace />;
};

export default NewsDetailRedirect;
