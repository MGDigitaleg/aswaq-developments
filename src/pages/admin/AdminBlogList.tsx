import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import type { Tables } from "@/integrations/supabase/types";

const AdminBlogList = () => {
  const [articles, setArticles] = useState<Tables<"blog_articles">[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchArticles = async () => {
    const { data, error } = await supabase
      .from("blog_articles")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      toast.error("Failed to load articles");
    } else {
      setArticles(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this article?")) return;
    const { error } = await supabase.from("blog_articles").delete().eq("id", id);
    if (error) {
      toast.error("Failed to delete article");
    } else {
      toast.success("Article deleted");
      setArticles((prev) => prev.filter((a) => a.id !== id));
    }
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold font-display text-foreground">Blog Articles</h1>
        <Link to="/admin/blog/new">
          <Button><Plus size={16} /> New Article</Button>
        </Link>
      </div>

      {loading ? (
        <p className="text-muted-foreground">Loading...</p>
      ) : articles.length === 0 ? (
        <p className="text-muted-foreground">No articles yet. Create your first one!</p>
      ) : (
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left p-3 font-medium">Title</th>
                <th className="text-left p-3 font-medium">Language</th>
                <th className="text-left p-3 font-medium">Status</th>
                <th className="text-right p-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {articles.map((article) => (
                <tr key={article.id} className="border-b border-border last:border-0">
                  <td className="p-3">
                    <p className="font-medium text-foreground">{article.title}</p>
                    <p className="text-xs text-muted-foreground">{article.slug}</p>
                  </td>
                  <td className="p-3">
                    <Badge variant="outline">{article.lang.toUpperCase()}</Badge>
                  </td>
                  <td className="p-3">
                    <Badge variant={article.is_published ? "default" : "secondary"}>
                      {article.is_published ? "Published" : "Draft"}
                    </Badge>
                  </td>
                  <td className="p-3 text-right space-x-2">
                    <Link to={`/admin/blog/${article.id}`}>
                      <Button variant="ghost" size="icon"><Pencil size={14} /></Button>
                    </Link>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(article.id)}>
                      <Trash2 size={14} className="text-destructive" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminBlogList;
