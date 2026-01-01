-- Fix ERROR: keyword_performance - Add RLS policies for product owners
CREATE POLICY "Users can view their own keyword performance"
ON keyword_performance FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM products
    WHERE products.id = keyword_performance.product_id
    AND products.user_id = auth.uid()
  )
);

CREATE POLICY "Users can insert their own keyword performance"
ON keyword_performance FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM products
    WHERE products.id = keyword_performance.product_id
    AND products.user_id = auth.uid()
  )
);

CREATE POLICY "Users can update their own keyword performance"
ON keyword_performance FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM products
    WHERE products.id = keyword_performance.product_id
    AND products.user_id = auth.uid()
  )
);

CREATE POLICY "Users can delete their own keyword performance"
ON keyword_performance FOR DELETE
USING (
  EXISTS (
    SELECT 1 FROM products
    WHERE products.id = keyword_performance.product_id
    AND products.user_id = auth.uid()
  )
);

-- Fix ERROR: subreddits - Restrict to only subreddits relevant to user's products
DROP POLICY IF EXISTS "Authenticated users can view subreddits" ON subreddits;

CREATE POLICY "Users can view subreddits for their products"
ON subreddits FOR SELECT
USING (
  name = ANY(
    SELECT unnest(subreddits)
    FROM products
    WHERE user_id = auth.uid()
  )
);

-- Fix WARN: is_product_owner - Change to SECURITY INVOKER for safer execution
CREATE OR REPLACE FUNCTION public.is_product_owner(prod_uuid uuid)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY INVOKER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.products
    WHERE id = prod_uuid
    AND user_id = auth.uid()
  );
$$;

-- Fix WARN: Materialized views - Ensure they're not accessible via API
-- Drop and recreate with explicit schema permissions
REVOKE ALL ON public.calibration_data FROM anon, authenticated, public;
REVOKE ALL ON public.daily_product_performance_report FROM anon, authenticated, public;
REVOKE ALL ON public.health_monitor_v1 FROM anon, authenticated, public;
REVOKE ALL ON public.subreddit_quality_overview FROM anon, authenticated, public;
REVOKE ALL ON public.threaddits_advanced_metrics FROM anon, authenticated, public;
REVOKE ALL ON public.threaddits_dashboard FROM anon, authenticated, public;

-- Add RLS policies to tables that have RLS enabled but no policies
-- product_execution_logs - users can view logs for their products
CREATE POLICY "Users can view execution logs for their products"
ON product_execution_logs FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM products
    WHERE products.id = product_execution_logs.product_id
    AND products.user_id = auth.uid()
  )
);

-- product_learning_state - users can view/update learning state for their products
CREATE POLICY "Users can view learning state for their products"
ON product_learning_state FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM products
    WHERE products.id = product_learning_state.product_id
    AND products.user_id = auth.uid()
  )
);

CREATE POLICY "Users can update learning state for their products"
ON product_learning_state FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM products
    WHERE products.id = product_learning_state.product_id
    AND products.user_id = auth.uid()
  )
);

-- rejection_patterns - users can manage rejection patterns for their products
CREATE POLICY "Users can view rejection patterns for their products"
ON rejection_patterns FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM products
    WHERE products.id = rejection_patterns.product_id
    AND products.user_id = auth.uid()
  )
);

CREATE POLICY "Users can insert rejection patterns for their products"
ON rejection_patterns FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM products
    WHERE products.id = rejection_patterns.product_id
    AND products.user_id = auth.uid()
  )
);

CREATE POLICY "Users can delete rejection patterns for their products"
ON rejection_patterns FOR DELETE
USING (
  EXISTS (
    SELECT 1 FROM products
    WHERE products.id = rejection_patterns.product_id
    AND products.user_id = auth.uid()
  )
);

-- system_actions - users can view system actions for their products
CREATE POLICY "Users can view system actions for their products"
ON system_actions FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM products
    WHERE products.id = system_actions.product_id
    AND products.user_id = auth.uid()
  )
);

-- webhook_events - internal system table, no user access needed
CREATE POLICY "Webhook events are system managed"
ON webhook_events FOR SELECT
USING (false);

-- workflow_logs - internal system table, no user access needed
CREATE POLICY "Workflow logs are system managed"
ON workflow_logs FOR SELECT
USING (false);