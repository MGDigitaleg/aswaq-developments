import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trash2, Upload, Type, Image, Columns } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useState } from "react";
import type { ContentBlock } from "@/types/contentBlocks";

interface Props {
  block: ContentBlock;
  index: number;
  onChange: (index: number, block: ContentBlock) => void;
  onRemove: (index: number) => void;
  canRemove: boolean;
}

const ContentBlockEditor = ({ block, index, onChange, onRemove, canRemove }: Props) => {
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: "mediaUrl") => {
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
      onChange(index, { ...block, [field]: data.publicUrl } as ContentBlock);
      toast.success("Image uploaded");
    }
    setUploading(false);
  };

  const blockTypeLabel = {
    text: "Text",
    media: "Media",
    text_with_media: "Text + Media",
  };

  const blockTypeIcon = {
    text: <Type size={14} />,
    media: <Image size={14} />,
    text_with_media: <Columns size={14} />,
  };

  return (
    <div className="border border-border rounded-lg p-4 space-y-3 bg-background">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
          {blockTypeIcon[block.type]}
          <span>{blockTypeLabel[block.type]} Block #{index + 1}</span>
        </div>
        {canRemove && (
          <Button variant="ghost" size="icon" onClick={() => onRemove(index)}>
            <Trash2 size={14} className="text-destructive" />
          </Button>
        )}
      </div>

      {/* Text block */}
      {block.type === "text" && (
        <Textarea
          value={block.text}
          onChange={(e) => onChange(index, { ...block, text: e.target.value })}
          rows={4}
          placeholder="Enter paragraph text..."
        />
      )}

      {/* Media block */}
      {block.type === "media" && (
        <div className="space-y-3">
          <div>
            <Label>Media Type</Label>
            <Select
              value={block.mediaType}
              onValueChange={(v) => onChange(index, { ...block, mediaType: v as "image" | "youtube" })}
            >
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="image">Image</SelectItem>
                <SelectItem value="youtube">YouTube Video</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {block.mediaType === "image" ? (
            <div>
              <Label>Image</Label>
              <div className="flex items-center gap-3 mt-1">
                <label className="cursor-pointer">
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, "mediaUrl")} />
                  <Button variant="outline" size="sm" asChild disabled={uploading}>
                    <span><Upload size={14} /> {uploading ? "Uploading..." : "Upload"}</span>
                  </Button>
                </label>
                {block.mediaUrl && <img src={block.mediaUrl} alt="preview" className="h-16 rounded-md object-cover" />}
              </div>
              <Input value={block.mediaUrl} onChange={(e) => onChange(index, { ...block, mediaUrl: e.target.value })} placeholder="Or paste image URL" className="mt-2" />
            </div>
          ) : (
            <div>
              <Label>YouTube Video ID</Label>
              <Input value={block.mediaUrl} onChange={(e) => onChange(index, { ...block, mediaUrl: e.target.value })} placeholder="e.g. dQw4w9WgXcQ" />
            </div>
          )}
          <div>
            <Label>Caption (optional)</Label>
            <Input value={block.caption || ""} onChange={(e) => onChange(index, { ...block, caption: e.target.value })} placeholder="Image/video caption" />
          </div>
        </div>
      )}

      {/* Text with Media block */}
      {block.type === "text_with_media" && (
        <div className="space-y-3">
          <Textarea
            value={block.text}
            onChange={(e) => onChange(index, { ...block, text: e.target.value })}
            rows={4}
            placeholder="Enter text content..."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <Label>Media Type</Label>
              <Select
                value={block.mediaType}
                onValueChange={(v) => onChange(index, { ...block, mediaType: v as "image" | "youtube" })}
              >
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="image">Image</SelectItem>
                  <SelectItem value="youtube">YouTube Video</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Media Position</Label>
              <Select
                value={block.mediaPosition}
                onValueChange={(v) => onChange(index, { ...block, mediaPosition: v as "left" | "right" })}
              >
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="left">Left</SelectItem>
                  <SelectItem value="right">Right</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          {block.mediaType === "image" ? (
            <div>
              <Label>Image</Label>
              <div className="flex items-center gap-3 mt-1">
                <label className="cursor-pointer">
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, "mediaUrl")} />
                  <Button variant="outline" size="sm" asChild disabled={uploading}>
                    <span><Upload size={14} /> {uploading ? "Uploading..." : "Upload"}</span>
                  </Button>
                </label>
                {block.mediaUrl && <img src={block.mediaUrl} alt="preview" className="h-16 rounded-md object-cover" />}
              </div>
              <Input value={block.mediaUrl} onChange={(e) => onChange(index, { ...block, mediaUrl: e.target.value })} placeholder="Or paste image URL" className="mt-2" />
            </div>
          ) : (
            <div>
              <Label>YouTube Video ID</Label>
              <Input value={block.mediaUrl} onChange={(e) => onChange(index, { ...block, mediaUrl: e.target.value })} placeholder="e.g. dQw4w9WgXcQ" />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ContentBlockEditor;
