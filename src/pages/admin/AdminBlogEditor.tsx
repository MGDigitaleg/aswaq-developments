import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { ArrowLeft, Plus, Upload, Type, Image, Columns } from "lucide-react";
import ContentBlockEditor from "@/components/admin/ContentBlockEditor";
import { normalizeContent, type ContentBlock } from "@/types/contentBlocks";

const AdminBlogEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = id === "new";

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [blocks, setBlocks] = useState<ContentBlock[]>([{ type: "text", text: "" }]);
  const [imageUrl, setImageUrl] = useState("");
  const [youtubeId, setYoutubeId] = useState("");
  const [lang, setLang] = useState("en");
  const [isPublished, setIsPublished] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (!isNew && id) {
      supabase
        .from("blog_articles")
        .select("*")
        .eq("id", id)
        .single()
        .then(({ data, error }) => {
          if (error || !data) {
            toast.error("Article not found");
            navigate("/admin");
            return;
          }
          setTitle(data.title);
          setSlug(data.slug);
          setExcerpt(data.excerpt || "");
          setBlocks(normalizeContent(data.content));
          setImageUrl(data.image_url || "");
          setYoutubeId(data.youtube_id || "");
          setLang(data.lang);
          setIsPublished(data.is_published);
        });
    }
  }, [id, isNew, navigate]);

  const generateSlug = (text: string) =>
    text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (isNew) setSlug(generateSlug(val));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const ext = file.name.split(".").pop();
    const path = `${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from("blog-images").upload(path, file);
    if (error) {
      toast.error("Image upload failed");
    } else {
      const { data } = supabase.storage.from("blog-images").getPublicUrl(path);
      setImageUrl(data.publicUrl);
      toast.success("Image uploaded");
    }
    setUploading(false);
  };

  const handleSave = async () => {
    if (!title.trim() || !slug.trim()) {
      toast.error("Title and slug are required");
      return;
    }
    setSaving(true);

    const payload = {
      title,
      slug,
      excerpt,
      content: JSON.parse(JSON.stringify(blocks.filter((b) => {
        if (b.type === "text") return b.text.trim();
        if (b.type === "media") return b.mediaUrl.trim();
        if (b.type === "text_with_media") return b.text.trim() || b.mediaUrl.trim();
        return false;
      }))),
      image_url: imageUrl || null,
      youtube_id: youtubeId || null,
      lang,
      is_published: isPublished,
    };

    if (isNew) {
      const { error } = await supabase.from("blog_articles").insert(payload);
      if (error) toast.error(error.message);
      else { toast.success("Article created"); navigate("/admin"); }
    } else {
      const { error } = await supabase.from("blog_articles").update(payload).eq("id", id!);
      if (error) toast.error(error.message);
      else toast.success("Article updated");
    }
    setSaving(false);
  };

  const addBlock = (type: ContentBlock["type"]) => {
    const newBlock: ContentBlock =
      type === "text" ? { type: "text", text: "" } :
      type === "media" ? { type: "media", mediaUrl: "", mediaType: "image", caption: "" } :
      { type: "text_with_media", text: "", mediaUrl: "", mediaType: "image", mediaPosition: "right" };
    setBlocks([...blocks, newBlock]);
  };

  const updateBlock = (i: number, block: ContentBlock) => {
    const updated = [...blocks];
    updated[i] = block;
    setBlocks(updated);
  };

  const removeBlock = (i: number) => setBlocks(blocks.filter((_, idx) => idx !== i));

  return (
    <AdminLayout>
      <div className="flex items-center gap-3 mb-6">
        <Button variant="ghost" size="icon" onClick={() => navigate("/admin")}>
          <ArrowLeft size={18} />
        </Button>
        <h1 className="text-2xl font-bold font-display text-foreground">
          {isNew ? "New Article" : "Edit Article"}
        </h1>
      </div>

      <div className="bg-card rounded-xl border border-border p-6 space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>Title</Label>
            <Input value={title} onChange={(e) => handleTitleChange(e.target.value)} />
          </div>
          <div>
            <Label>Slug</Label>
            <Input value={slug} onChange={(e) => setSlug(e.target.value)} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>Language</Label>
            <Select value={lang} onValueChange={setLang}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="ar">Arabic</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>YouTube Video ID (optional)</Label>
            <Input value={youtubeId} onChange={(e) => setYoutubeId(e.target.value)} placeholder="e.g. dQw4w9WgXcQ" />
          </div>
        </div>

        <div>
          <Label>Excerpt</Label>
          <Textarea value={excerpt} onChange={(e) => setExcerpt(e.target.value)} rows={2} />
        </div>

        <div>
          <Label>Featured Image</Label>
          <div className="flex items-center gap-3 mt-1">
            <label className="cursor-pointer">
              <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
              <Button variant="outline" size="sm" asChild disabled={uploading}>
                <span><Upload size={14} /> {uploading ? "Uploading..." : "Upload Image"}</span>
              </Button>
            </label>
            {imageUrl && <img src={imageUrl} alt="preview" className="h-16 rounded-md object-cover" />}
          </div>
          <Input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="Or paste image URL" className="mt-2" />
        </div>

        <div>
          <div className="flex items-center justify-between mb-3">
            <Label className="text-base">Content Blocks</Label>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => addBlock("text")}>
                <Type size={14} /> Text
              </Button>
              <Button variant="outline" size="sm" onClick={() => addBlock("media")}>
                <Image size={14} /> Media
              </Button>
              <Button variant="outline" size="sm" onClick={() => addBlock("text_with_media")}>
                <Columns size={14} /> Text + Media
              </Button>
            </div>
          </div>
          <div className="space-y-3">
            {blocks.map((block, i) => (
              <ContentBlockEditor
                key={i}
                block={block}
                index={i}
                onChange={updateBlock}
                onRemove={removeBlock}
                canRemove={blocks.length > 1}
              />
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Switch checked={isPublished} onCheckedChange={setIsPublished} />
          <Label>Published</Label>
        </div>

        <div className="flex gap-3 pt-2">
          <Button onClick={handleSave} disabled={saving}>
            {saving ? "Saving..." : "Save Article"}
          </Button>
          <Button variant="outline" onClick={() => navigate("/admin")}>Cancel</Button>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminBlogEditor;
