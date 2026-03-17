
-- Careers table for job listings
CREATE TABLE public.careers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  description text NOT NULL,
  date date NOT NULL DEFAULT CURRENT_DATE,
  is_published boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.careers ENABLE ROW LEVEL SECURITY;

-- Anyone can read published careers
CREATE POLICY "Anyone can read published careers"
  ON public.careers FOR SELECT
  USING (is_published = true);

-- Admins can manage careers
CREATE POLICY "Admins can manage careers"
  ON public.careers FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Career applications table
CREATE TABLE public.career_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  career_id uuid REFERENCES public.careers(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  major text,
  cover_letter text,
  cv_url text,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.career_applications ENABLE ROW LEVEL SECURITY;

-- Anyone can insert applications (public form)
CREATE POLICY "Anyone can submit applications"
  ON public.career_applications FOR INSERT
  WITH CHECK (true);

-- Admins can read applications
CREATE POLICY "Admins can read applications"
  ON public.career_applications FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Create storage bucket for CVs
INSERT INTO storage.buckets (id, name, public)
VALUES ('career-cvs', 'career-cvs', false);

-- Allow anyone to upload CVs
CREATE POLICY "Anyone can upload CVs"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'career-cvs');

-- Admins can read CVs
CREATE POLICY "Admins can read CVs"
  ON storage.objects FOR SELECT
  TO authenticated
  USING (bucket_id = 'career-cvs' AND public.has_role(auth.uid(), 'admin'));
