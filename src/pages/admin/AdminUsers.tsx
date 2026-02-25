import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, X } from "lucide-react";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface UserRecord {
  id: string;
  email: string;
  created_at: string;
  role: string;
}

const AdminUsers = () => {
  const [users, setUsers] = useState<UserRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [creating, setCreating] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");

  const fetchUsers = async () => {
    const { data, error } = await supabase.functions.invoke("manage-users", {
      body: { action: "list" },
    });
    if (error) {
      toast.error("Failed to load users");
    } else {
      setUsers(data.users || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);
    const { data, error } = await supabase.functions.invoke("manage-users", {
      body: { action: "create", email, password, role },
    });
    setCreating(false);
    if (error || data?.error) {
      toast.error(data?.error || "Failed to create user");
    } else {
      toast.success("User created");
      setEmail("");
      setPassword("");
      setRole("user");
      setShowForm(false);
      fetchUsers();
    }
  };

  const handleDelete = async (userId: string, userEmail: string) => {
    if (!confirm(`Delete user ${userEmail}? This cannot be undone.`)) return;
    const { data, error } = await supabase.functions.invoke("manage-users", {
      body: { action: "delete", user_id: userId },
    });
    if (error || data?.error) {
      toast.error(data?.error || "Failed to delete user");
    } else {
      toast.success("User deleted");
      setUsers((prev) => prev.filter((u) => u.id !== userId));
    }
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold font-display text-foreground">
          Users
        </h1>
        <Button onClick={() => setShowForm(!showForm)}>
          {showForm ? <X size={16} /> : <Plus size={16} />}
          {showForm ? "Cancel" : "New User"}
        </Button>
      </div>

      {showForm && (
        <form
          onSubmit={handleCreate}
          className="bg-card rounded-xl border border-border p-4 mb-6 space-y-4"
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Role</Label>
              <Select value={role} onValueChange={setRole}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="user">User</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button type="submit" disabled={creating}>
            {creating ? "Creating..." : "Create User"}
          </Button>
        </form>
      )}

      {loading ? (
        <p className="text-muted-foreground">Loading...</p>
      ) : users.length === 0 ? (
        <p className="text-muted-foreground">No users found.</p>
      ) : (
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left p-3 font-medium">Email</th>
                <th className="text-left p-3 font-medium">Role</th>
                <th className="text-left p-3 font-medium">Created</th>
                <th className="text-right p-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="border-b border-border last:border-0"
                >
                  <td className="p-3 text-foreground">{user.email}</td>
                  <td className="p-3">
                    <Badge
                      variant={user.role === "admin" ? "default" : "secondary"}
                    >
                      {user.role}
                    </Badge>
                  </td>
                  <td className="p-3 text-muted-foreground">
                    {new Date(user.created_at).toLocaleDateString()}
                  </td>
                  <td className="p-3 text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(user.id, user.email)}
                    >
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

export default AdminUsers;
