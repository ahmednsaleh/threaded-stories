-- Fix 1: Remove duplicate RLS policies on users table (keep one of each type)
DROP POLICY IF EXISTS "Profiles: select own" ON public.users;
DROP POLICY IF EXISTS "users_select_own_profile" ON public.users;
DROP POLICY IF EXISTS "Profiles: insert own" ON public.users;

-- Fix 2: Change current_auth_uid function to SECURITY INVOKER
CREATE OR REPLACE FUNCTION public.current_auth_uid()
RETURNS uuid
LANGUAGE sql
STABLE
SECURITY INVOKER
SET search_path = public
AS $$
  SELECT auth.uid();
$$;

-- Fix 3: Ensure is_product_owner uses SECURITY INVOKER with safe search_path
CREATE OR REPLACE FUNCTION public.is_product_owner(prod_uuid uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY INVOKER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.products
    WHERE id = prod_uuid
    AND user_id = auth.uid()
  );
$$;