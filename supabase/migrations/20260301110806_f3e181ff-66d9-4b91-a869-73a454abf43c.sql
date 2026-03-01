
-- Create form_submissions table
CREATE TABLE public.form_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  request_type TEXT NOT NULL,
  unit_type TEXT NOT NULL,
  preferred_mall TEXT NOT NULL,
  notes TEXT,
  lang TEXT NOT NULL DEFAULT 'en',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.form_submissions ENABLE ROW LEVEL SECURITY;

-- Anyone can insert (public form)
CREATE POLICY "Anyone can submit a form"
ON public.form_submissions
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Only admins can read
CREATE POLICY "Admins can view all submissions"
ON public.form_submissions
FOR SELECT
USING (public.is_admin());

-- Only admins can delete
CREATE POLICY "Admins can delete submissions"
ON public.form_submissions
FOR DELETE
USING (public.is_admin());
