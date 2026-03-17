import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface Career {
  id: string;
  title: string;
  slug: string;
  description: string;
  date: string;
  is_published: boolean;
}

export const useCareers = () => {
  const [careers, setCareers] = useState<Career[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCareers = async () => {
      const { data, error } = await supabase
        .from("careers")
        .select("*")
        .eq("is_published", true)
        .order("date", { ascending: false });

      if (!error && data) {
        setCareers(data as Career[]);
      }
      setLoading(false);
    };
    fetchCareers();
  }, []);

  return { careers, loading };
};

export const useCareer = (slug: string | undefined) => {
  const [career, setCareer] = useState<Career | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) { setLoading(false); return; }

    const fetchCareer = async () => {
      const { data, error } = await supabase
        .from("careers")
        .select("*")
        .eq("slug", slug)
        .eq("is_published", true)
        .maybeSingle();

      if (!error && data) {
        setCareer(data as Career);
      }
      setLoading(false);
    };
    fetchCareer();
  }, [slug]);

  return { career, loading };
};
