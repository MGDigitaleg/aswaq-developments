import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Trash2, Eye, X, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Submission {
  id: string;
  name: string;
  phone: string;
  email: string;
  request_type: string;
  unit_type: string;
  preferred_mall: string;
  notes: string | null;
  lang: string;
  created_at: string;
}

const AdminFormSubmissions = () => {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Submission | null>(null);
  const { toast } = useToast();

  const fetchSubmissions = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("form_submissions")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      setSubmissions(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this submission?")) return;
    const { error } = await supabase.from("form_submissions").delete().eq("id", id);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      setSubmissions((prev) => prev.filter((s) => s.id !== id));
      if (selected?.id === id) setSelected(null);
      toast({ title: "Deleted" });
    }
  };

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Form Submissions</h1>
          <p className="text-sm text-muted-foreground">{submissions.length} total entries</p>
        </div>
        <Button variant="outline" size="sm" onClick={fetchSubmissions} disabled={loading}>
          <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
          <span className="ml-1.5">Refresh</span>
        </Button>
      </div>

      {/* Detail modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => setSelected(null)}>
          <div className="bg-card rounded-lg shadow-lg max-w-lg w-full mx-4 p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-foreground">Submission Details</h2>
              <button onClick={() => setSelected(null)} className="text-muted-foreground hover:text-foreground">
                <X size={20} />
              </button>
            </div>
            <dl className="space-y-3 text-sm">
              {[
                ["Name", selected.name],
                ["Email", selected.email],
                ["Phone", selected.phone],
                ["Request Type", selected.request_type],
                ["Unit Type", selected.unit_type],
                ["Preferred Mall", selected.preferred_mall],
                ["Language", selected.lang === "ar" ? "Arabic" : "English"],
                ["Date", formatDate(selected.created_at)],
              ].map(([label, value]) => (
                <div key={label} className="flex gap-3">
                  <dt className="w-32 shrink-0 font-medium text-muted-foreground">{label}</dt>
                  <dd className="text-foreground">{value}</dd>
                </div>
              ))}
              {selected.notes && (
                <div className="flex gap-3">
                  <dt className="w-32 shrink-0 font-medium text-muted-foreground">Notes</dt>
                  <dd className="text-foreground whitespace-pre-wrap">{selected.notes}</dd>
                </div>
              )}
            </dl>
            <div className="mt-6 flex justify-end">
              <Button variant="destructive" size="sm" onClick={() => handleDelete(selected.id)}>
                <Trash2 size={14} className="mr-1.5" /> Delete
              </Button>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <p className="text-muted-foreground text-center py-12">Loading…</p>
      ) : submissions.length === 0 ? (
        <p className="text-muted-foreground text-center py-12">No submissions yet.</p>
      ) : (
        <div className="bg-card rounded-lg border border-border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Request</TableHead>
                <TableHead>Mall</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="w-20" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {submissions.map((s) => (
                <TableRow key={s.id}>
                  <TableCell className="font-medium">{s.name}</TableCell>
                  <TableCell>{s.email}</TableCell>
                  <TableCell>{s.request_type}</TableCell>
                  <TableCell>{s.preferred_mall}</TableCell>
                  <TableCell className="text-muted-foreground text-xs whitespace-nowrap">{formatDate(s.created_at)}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <button onClick={() => setSelected(s)} className="p-1.5 rounded hover:bg-muted text-muted-foreground hover:text-foreground">
                        <Eye size={15} />
                      </button>
                      <button onClick={() => handleDelete(s.id)} className="p-1.5 rounded hover:bg-destructive/10 text-muted-foreground hover:text-destructive">
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminFormSubmissions;
