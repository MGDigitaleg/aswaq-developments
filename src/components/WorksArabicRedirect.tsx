import { useSearchParams, Navigate } from "react-router-dom";

const levelMap: Record<string, string> = {
  "1": "/ar/projects/city-hub-mall",
  "2": "/ar/projects/mercado-mall",
  "3": "/ar/projects/arena-mall",
  "25": "/ar/projects/solaria-mall",
};

const WorksArabicRedirect = () => {
  const [searchParams] = useSearchParams();
  const level = searchParams.get("level");
  const target = level ? levelMap[level] : null;
  return <Navigate to={target || "/ar/projects"} replace />;
};

export default WorksArabicRedirect;
