-- Add policy for admin_users table (no public access - managed by edge function)
CREATE POLICY "No direct access to admin_users"
  ON public.admin_users FOR SELECT
  USING (false);