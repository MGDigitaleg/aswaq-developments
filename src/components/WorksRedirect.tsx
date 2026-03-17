import { useSearchParams, Navigate } from "react-router-dom";

const levelMap: Record<string, string> = {
  "1": "/projects/city-hub-mall",
  "2": "/projects/mercado-mall",
  "3": "/projects/arena-mall",
  "25": "/projects/solaria-mall",
};

const WorksRedirect = () => {
  const [searchParams] = useSearchParams();
  const level = searchParams.get("level");
  const target = level ? levelMap[level] : null;
  return <Navigate to={target || "/projects"} replace />;
};

export default WorksRedirect;
