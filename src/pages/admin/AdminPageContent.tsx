import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Plus, Save, Trash2 } from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";

const PAGES = [
  "home", "about", "projects", "units", "contact", "gallery",
  "arena-mall", "city-hub-mall", "mercado-mall", "solaria-mall",
];

const AdminPageContent = () => {
  const [items, setItems] = useState<Tables<"page_content">[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterPage, setFilterPage] = useState("all");
  const [filterLang, setFilterLang] = useState("all");

  // New item form
  const [showNew, setShowNew] = useState(false);
  const [newPageKey, setNewPageKey] = useState("home");
  const [newSectionKey, setNewSectionKey] = useState("");
  const [newLang, setNewLang] = useState("en");
  const [newContent, setNewContent] = useState("");

  const fetchItems = async () => {
    const { data, error } = await supabase
      .from("page_content")
      .select("*")
      .order("page_key")
      .order("section_key");
    if (error) {
      toast.error("Failed to load page content");
    } else {
      setItems(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const filtered = items.filter((item) => {
    if (filterPage !== "all" && item.page_key !== filterPage) return false;
    if (filterLang !== "all" && item.lang !== filterLang) return false;
    return true;
  });

  const handleSave = async (item: Tables<"page_content">, newContentStr: string) => {
    let parsed: any;
    try {
      parsed = JSON.parse(newContentStr);
    } catch {
      parsed = newContentStr;
    }
    const { error } = await supabase
      .from("page_content")
      .update({ content: parsed })
      .eq("id", item.id);
    if (error) {
      toast.error("Failed to save");
    } else {
      toast.success(`Updated ${item.page_key} / ${item.section_key}`);
      fetchItems();
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this content section?")) return;
    const { error } = await supabase.from("page_content").delete().eq("id", id);
    if (error) {
      toast.error("Failed to delete");
    } else {
      toast.success("Deleted");
      setItems((prev) => prev.filter((i) => i.id !== id));
    }
  };

  const handleCreate = async () => {
    if (!newSectionKey.trim()) {
      toast.error("Section key is required");
      return;
    }
    let parsed: any;
    try {
      parsed = JSON.parse(newContent);
    } catch {
      parsed = newContent;
    }
    const { error } = await supabase.from("page_content").insert({
      page_key: newPageKey,
      section_key: newSectionKey,
      lang: newLang,
      content: parsed,
    });
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Content section created");
      setShowNew(false);
      setNewSectionKey("");
      setNewContent("");
      fetchItems();
    }
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold font-display text-foreground">Page Content</h1>
        <Button onClick={() => setShowNew(!showNew)}>
          <Plus size={16} /> Add Section
        </Button>
      </div>

      {/* Filters */}
      <div className="flex gap-3 mb-6">
        <Select value={filterPage} onValueChange={setFilterPage}>
          <SelectTrigger className="w-40"><SelectValue placeholder="All pages" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Pages</SelectItem>
            {PAGES.map((p) => (
              <SelectItem key={p} value={p}>{p}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={filterLang} onValueChange={setFilterLang}>
          <SelectTrigger className="w-28"><SelectValue placeholder="All langs" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="en">EN</SelectItem>
            <SelectItem value="ar">AR</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* New item form */}
      {showNew && (
        <div className="bg-card rounded-xl border border-border p-5 mb-6 space-y-3">
          <h3 className="font-bold text-foreground">New Content Section</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <Label>Page</Label>
              <Select value={newPageKey} onValueChange={setNewPageKey}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {PAGES.map((p) => (
                    <SelectItem key={p} value={p}>{p}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Section Key</Label>
              <Input value={newSectionKey} onChange={(e) => setNewSectionKey(e.target.value)} placeholder="e.g. hero_title" />
            </div>
            <div>
              <Label>Language</Label>
              <Select value={newLang} onValueChange={setNewLang}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="ar">Arabic</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <Label>Content (text or JSON)</Label>
            <Textarea value={newContent} onChange={(e) => setNewContent(e.target.value)} rows={3} />
          </div>
          <div className="flex gap-2">
            <Button onClick={handleCreate}>Create</Button>
            <Button variant="outline" onClick={() => setShowNew(false)}>Cancel</Button>
          </div>
        </div>
      )}

      {/* Content list */}
      {loading ? (
        <p className="text-muted-foreground">Loading...</p>
      ) : filtered.length === 0 ? (
        <p className="text-muted-foreground">No content sections found.</p>
      ) : (
        <div className="space-y-4">
          {filtered.map((item) => (
            <ContentCard key={item.id} item={item} onSave={handleSave} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </AdminLayout>
  );
};

const ContentCard = ({
  item,
  onSave,
  onDelete,
}: {
  item: Tables<"page_content">;
  onSave: (item: Tables<"page_content">, content: string) => void;
  onDelete: (id: string) => void;
}) => {
  const contentStr = typeof item.content === "string" ? item.content : JSON.stringify(item.content, null, 2);
  const [value, setValue] = useState(contentStr);

  return (
    <div className="bg-card rounded-xl border border-border p-5">
      <div className="flex items-center justify-between mb-2">
        <div>
          <span className="text-xs font-mono bg-muted px-2 py-0.5 rounded text-muted-foreground">{item.page_key}</span>
          <span className="text-xs font-mono bg-muted px-2 py-0.5 rounded text-muted-foreground ml-2">{item.section_key}</span>
          <span className="text-xs bg-muted px-2 py-0.5 rounded text-muted-foreground ml-2">{item.lang.toUpperCase()}</span>
        </div>
        <div className="flex gap-1">
          <Button variant="ghost" size="icon" onClick={() => onSave(item, value)}>
            <Save size={14} />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => onDelete(item.id)}>
            <Trash2 size={14} className="text-destructive" />
          </Button>
        </div>
      </div>
      <Textarea value={value} onChange={(e) => setValue(e.target.value)} rows={4} className="font-mono text-sm" />
    </div>
  );
};

export default AdminPageContent;
