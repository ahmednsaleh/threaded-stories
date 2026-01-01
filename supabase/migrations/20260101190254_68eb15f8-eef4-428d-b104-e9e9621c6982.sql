-- Fix function_search_path_mutable warnings by setting search_path on all functions

-- 1. get_optimal_subreddits_by_category
CREATE OR REPLACE FUNCTION public.get_optimal_subreddits_by_category(p_category text, p_business_type text, p_product_name text DEFAULT NULL::text)
 RETURNS text[]
 LANGUAGE plpgsql
 SET search_path = public
AS $function$
   DECLARE
       v_subreddits TEXT[];
       v_base_subreddits TEXT[];
       v_niche_subreddits TEXT[];
   BEGIN
       IF p_business_type = 'b2b' THEN
           v_base_subreddits := ARRAY['sales', 'startups', 'Entrepreneur', 'smallbusiness', 'SaaS'];
       ELSE
           v_base_subreddits := ARRAY['Entrepreneur', 'smallbusiness'];
       END IF;

       CASE 
           WHEN p_category ILIKE '%sales%' OR p_category ILIKE '%crm%' OR p_category ILIKE '%lead%' THEN
               v_niche_subreddits := ARRAY['B2BMarketing', 'EmailMarketing', 'GrowthHacking', 'salesforce', 'digital_marketing'];
           WHEN p_category ILIKE '%data%' OR p_category ILIKE '%analytics%' THEN
               v_niche_subreddits := ARRAY['dataengineering', 'BusinessIntelligence', 'analytics', 'datascience'];
           WHEN p_category ILIKE '%productivity%' OR p_category ILIKE '%project%' THEN
               v_niche_subreddits := ARRAY['productivity', 'projectmanagement', 'agile', 'scrum'];
           WHEN p_category ILIKE '%hr%' OR p_category ILIKE '%recruit%' THEN
               v_niche_subreddits := ARRAY['humanresources', 'recruiting', 'AskHR', 'jobs'];
           WHEN p_category ILIKE '%finance%' OR p_category ILIKE '%accounting%' THEN
               v_niche_subreddits := ARRAY['Accounting', 'smallbusiness', 'finance', 'QuickBooks'];
           WHEN p_category ILIKE '%marketing%' OR p_category ILIKE '%automation%' THEN
               v_niche_subreddits := ARRAY['marketing', 'DigitalMarketing', 'content_marketing', 'SEO', 'PPC'];
           WHEN p_category ILIKE '%developer%' OR p_category ILIKE '%api%' THEN
               v_niche_subreddits := ARRAY['programming', 'webdev', 'devops', 'sysadmin'];
           WHEN p_category ILIKE '%ecommerce%' OR p_category ILIKE '%shopify%' THEN
               v_niche_subreddits := ARRAY['ecommerce', 'shopify', 'FulfillmentByAmazon', 'dropship'];
           ELSE
               v_niche_subreddits := ARRAY['business', 'startups', 'Entrepreneur'];
       END CASE;

       v_subreddits := v_base_subreddits || v_niche_subreddits;
       SELECT ARRAY_AGG(DISTINCT unnest) INTO v_subreddits FROM UNNEST(v_subreddits) unnest;
       v_subreddits := v_subreddits[1:10];
       
       RETURN v_subreddits;
   END;
$function$;

-- 2. generate_optimal_keywords
CREATE OR REPLACE FUNCTION public.generate_optimal_keywords(p_product_id uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
 SET search_path = public
AS $function$
   DECLARE
       v_product_name TEXT;
       v_description TEXT;
       v_category TEXT;
       v_keywords JSONB;
       v_keyword_array TEXT[];
   BEGIN
       SELECT product_name, product_description, product_category
       INTO v_product_name, v_description, v_category
       FROM products WHERE id = p_product_id;

       v_keyword_array := ARRAY[
           v_product_name,
           v_product_name || ' alternative',
           v_product_name || ' review',
           v_product_name || ' pricing'
       ];

       CASE
           WHEN v_category ILIKE '%sales%' OR v_category ILIKE '%crm%' THEN
               v_keyword_array := v_keyword_array || ARRAY[
                   'lead enrichment', 'CRM integration', 'sales automation', 
                   'prospecting tool', 'email finder', 'contact database'
               ];
           WHEN v_category ILIKE '%marketing%' THEN
               v_keyword_array := v_keyword_array || ARRAY[
                   'marketing automation', 'email campaigns', 'audience targeting',
                   'lead generation', 'conversion optimization'
               ];
           WHEN v_category ILIKE '%productivity%' THEN
               v_keyword_array := v_keyword_array || ARRAY[
                   'project management', 'task tracking', 'team collaboration', 'workflow automation'
               ];
           ELSE
               v_keyword_array := v_keyword_array || ARRAY['software tool', 'best solution', 'recommendations'];
       END CASE;

       v_keyword_array := v_keyword_array || ARRAY[
           'looking for', 'need help with', 'recommendations', 'best tool for', 'trying to find'
       ];

       SELECT jsonb_agg(jsonb_build_object('keyword', kw))
       INTO v_keywords
       FROM UNNEST(v_keyword_array[1:30]) kw;

       RETURN v_keywords;
   END;
$function$;

-- 3. update_subreddit_performance
CREATE OR REPLACE FUNCTION public.update_subreddit_performance(target_product_id uuid)
 RETURNS void
 LANGUAGE plpgsql
 SET search_path = public
AS $function$
   DECLARE
       r RECORD;
       score double precision;
       new_status text;
       active_subs text[];
   BEGIN
       INSERT INTO product_subreddit_status (product_id, subreddit, status)
       SELECT target_product_id, unnest(subreddits), 'active'
       FROM products
       WHERE id = target_product_id
       ON CONFLICT (product_id, subreddit) DO NOTHING;

       FOR r IN SELECT * FROM product_subreddit_status WHERE product_id = target_product_id LOOP
           score := wilson_score_lower_bound(GREATEST(0, r.total_leads_found - r.rejected_leads_count), r.total_leads_found);
           new_status := r.status;

           IF r.total_leads_found >= 10 THEN
               IF score < 0.2 THEN new_status := 'retired';
               ELSIF score < 0.4 THEN new_status := 'probation';
               ELSIF score > 0.6 THEN new_status := 'active';
               END IF;
               
               IF new_status != r.status THEN
                   UPDATE product_subreddit_status SET status = new_status, last_activity_at = now() WHERE id = r.id;
                   INSERT INTO system_actions (product_id, action_type, action_details)
                   VALUES (target_product_id, 'subreddit_status_change', jsonb_build_object('subreddit', r.subreddit, 'old', r.status, 'new', new_status));
               END IF;
           END IF;
       END LOOP;

       SELECT array_agg(subreddit) INTO active_subs FROM product_subreddit_status
       WHERE product_id = target_product_id AND status IN ('active', 'probation');
       
       UPDATE products SET subreddits = COALESCE(active_subs, '{}') WHERE id = target_product_id;
   END;
$function$;

-- 4. auto_populate_reddit_targeting
CREATE OR REPLACE FUNCTION public.auto_populate_reddit_targeting()
 RETURNS trigger
 LANGUAGE plpgsql
 SET search_path = public
AS $function$
   DECLARE
       v_subreddits TEXT[];
       v_keywords JSONB;
   BEGIN
       IF NEW.subreddits IS NULL OR array_length(NEW.subreddits, 1) IS NULL THEN
           v_subreddits := get_optimal_subreddits_by_category(
               NEW.product_category, NEW.business_type, NEW.product_name
           );
           NEW.subreddits := v_subreddits;
           RAISE NOTICE 'Auto-populated % subreddits for: %', array_length(v_subreddits, 1), NEW.product_name;
       END IF;

       IF NEW.keywords IS NULL OR NEW.keywords = '[]'::jsonb THEN
           v_keywords := generate_optimal_keywords(NEW.id);
           NEW.keywords := v_keywords;
           RAISE NOTICE 'Auto-populated % keywords for: %', jsonb_array_length(v_keywords), NEW.product_name;
       END IF;

       RETURN NEW;
   END;
$function$;

-- 5. match_subreddits_commercial
CREATE OR REPLACE FUNCTION public.match_subreddits_commercial(query_embedding extensions.vector, match_threshold double precision, min_commercial_score double precision, match_count integer, is_b2b boolean)
 RETURNS TABLE(id bigint, name text, description text, subscribers bigint, commercial_score double precision, community_type text, avg_daily_posts double precision, avg_daily_comments double precision, last_active_utc timestamp with time zone, similarity double precision)
 LANGUAGE plpgsql
 SET search_path = public
AS $function$
BEGIN 
  RETURN QUERY 
  SELECT s.id::int8, s.name, s.description, s.subscribers::int8, s.commercial_score::float, s.community_type, s.avg_daily_posts::float, s.avg_daily_comments::float, s.last_active_utc, (1 - (s.embedding <=> query_embedding))::float as similarity 
  FROM subreddits s 
  WHERE s.embedding IS NOT NULL 
    AND 1 - (s.embedding <=> query_embedding) > match_threshold 
    AND (s.commercial_score IS NOT NULL AND s.commercial_score >= min_commercial_score) 
    AND s.avg_daily_posts >= 1 
    AND s.last_active_utc > NOW() - INTERVAL '90 days' 
  ORDER BY ((1 - (s.embedding <=> query_embedding)) * 0.7 + (COALESCE(s.commercial_score, 0) / 10.0) * 0.3) DESC 
  LIMIT match_count; 
END;
$function$;

-- 6. is_product_owner
CREATE OR REPLACE FUNCTION public.is_product_owner(prod_uuid uuid)
 RETURNS boolean
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path = public
AS $function$
  SELECT EXISTS (
    SELECT 1 FROM public.products
    WHERE id = prod_uuid
      AND user_id = (SELECT auth.uid())
  );
$function$;

-- 7. match_subreddits_sprint
CREATE OR REPLACE FUNCTION public.match_subreddits_sprint(query_embedding extensions.vector, match_count integer, match_threshold double precision, min_commercial_score double precision)
 RETURNS TABLE(id bigint, name text, description text, subscribers bigint, commercial_score double precision, community_type text, avg_daily_posts double precision, avg_daily_comments double precision, last_active_utc timestamp with time zone, similarity double precision, match_tier text)
 LANGUAGE plpgsql
 SET search_path = public
AS $function$
BEGIN
    RETURN QUERY
    WITH scored_subreddits AS (
        SELECT
            s.id::bigint AS sub_id,
            s.name AS sub_name,
            s.description AS sub_description,
            s.subscribers AS sub_subscribers,
            s.commercial_score::float AS sub_commercial_score,
            s.community_type AS sub_community_type,
            s.avg_daily_posts::float AS sub_avg_daily_posts,
            s.avg_daily_comments::float AS sub_avg_daily_comments,
            s.last_active_utc AS sub_last_active_utc,
            (1 - (s.embedding <=> query_embedding))::float AS sub_similarity,
            (
                (1 - (s.embedding <=> query_embedding)) * 0.35
                + (COALESCE(s.commercial_score, 0) / 10.0) * 0.30
                + (LEAST(LN(COALESCE(NULLIF(s.avg_daily_posts, 0), 1) + 1) / 4.0, 1.0)) * 0.20
                + (LEAST(LN(COALESCE(NULLIF(s.subscribers, 0), 1) + 1) / 16.0, 1.0)) * 0.15
            ) AS composite_score
        FROM subreddits s
        WHERE 
            s.embedding IS NOT NULL
            AND (1 - (s.embedding <=> query_embedding)) > match_threshold
            AND COALESCE(s.commercial_score, 0) >= min_commercial_score
            AND COALESCE(s.avg_daily_posts, 0) >= 0.5
            AND s.last_active_utc > now() - INTERVAL '60 days'
    )
    SELECT 
        ss.sub_id,
        ss.sub_name,
        ss.sub_description,
        ss.sub_subscribers,
        ss.sub_commercial_score,
        ss.sub_community_type,
        ss.sub_avg_daily_posts,
        ss.sub_avg_daily_comments,
        ss.sub_last_active_utc,
        ss.sub_similarity,
        CASE 
            WHEN ss.sub_similarity > 0.5 AND ss.sub_commercial_score >= 6 THEN 'tier_1_excellent'
            WHEN ss.sub_similarity > 0.4 AND ss.sub_commercial_score >= 4 THEN 'tier_2_good'
            WHEN ss.sub_similarity > 0.3 AND ss.sub_commercial_score >= 3 THEN 'tier_3_relevant'
            ELSE 'tier_4_exploratory'
        END AS match_tier
    FROM scored_subreddits ss
    ORDER BY ss.composite_score DESC
    LIMIT match_count;
END;
$function$;

-- 8. get_weekly_high_intent_leads_count
CREATE OR REPLACE FUNCTION public.get_weekly_high_intent_leads_count(p_product_id uuid, p_user_id uuid)
 RETURNS integer
 LANGUAGE plpgsql
 SET search_path = public
AS $function$
DECLARE
    lead_count INTEGER;
BEGIN
    SELECT COUNT(*)
    INTO lead_count
    FROM leads
    WHERE product_id = p_product_id
      AND user_id = p_user_id
      AND intent_score >= 8
      AND created_at >= NOW() - INTERVAL '7 days';

    RETURN lead_count;
END;
$function$;

-- 9. get_subreddit_stats
CREATE OR REPLACE FUNCTION public.get_subreddit_stats(query_embedding extensions.vector)
 RETURNS TABLE(total_matching bigint, tier_1_count bigint, tier_2_count bigint, tier_3_count bigint, avg_similarity double precision, avg_commercial_score double precision)
 LANGUAGE plpgsql
 SET search_path = public
AS $function$
BEGIN
    RETURN QUERY
    WITH matches AS (
        SELECT
            s.name,
            s.community_type,
            s.commercial_score,
            (1 - (s.embedding <=> query_embedding))::float AS sim
        FROM subreddits s
        WHERE 
            s.embedding IS NOT NULL
            AND (1 - (s.embedding <=> query_embedding)) > 0.2
    )
    SELECT
        COUNT(*)::bigint AS total_matching,
        COUNT(*) FILTER (WHERE m.sim > 0.5)::bigint AS tier_1_count,
        COUNT(*) FILTER (WHERE m.sim > 0.35 AND m.sim <= 0.5)::bigint AS tier_2_count,
        COUNT(*) FILTER (WHERE m.sim > 0.2 AND m.sim <= 0.35)::bigint AS tier_3_count,
        AVG(m.sim)::float AS avg_similarity,
        AVG(m.commercial_score)::float AS avg_commercial_score
    FROM matches m;
END;
$function$;

-- 10. wilson_score_lower_bound
CREATE OR REPLACE FUNCTION public.wilson_score_lower_bound(positive integer, total integer, z double precision DEFAULT 1.96)
 RETURNS double precision
 LANGUAGE plpgsql
 IMMUTABLE
 SET search_path = public
AS $function$
   DECLARE
       phat double precision;
   BEGIN
       IF total = 0 THEN RETURN 0; END IF;
       phat := positive::double precision / total::double precision;
       RETURN (phat + z*z/(2*total) - z * sqrt((phat*(1-phat) + z*z/(4*total))/total)) / (1 + z*z/total);
   END;
$function$;

-- 11. match_rejection_patterns
CREATE OR REPLACE FUNCTION public.match_rejection_patterns(target_product_id uuid, query_embedding extensions.vector, match_threshold double precision, match_count integer)
 RETURNS TABLE(id uuid, rejection_reason rejection_reason, post_content text, similarity double precision)
 LANGUAGE plpgsql
 SET search_path = public
AS $function$
   begin
     return query
     select
       rp.id,
       rp.rejection_reason,
       rp.post_content,
       1 - (rp.embedding <=> query_embedding) as similarity
     from rejection_patterns rp
     where rp.product_id = target_product_id
     and 1 - (rp.embedding <=> query_embedding) > match_threshold
     order by rp.embedding <=> query_embedding
     limit match_count;
   end;
$function$;

-- 12. current_auth_uid (fix empty search_path)
CREATE OR REPLACE FUNCTION public.current_auth_uid()
 RETURNS uuid
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path = public
AS $function$
  SELECT (auth.uid())::uuid;
$function$;

-- Revoke public access from materialized views to fix materialized_view_in_api warning
REVOKE ALL ON public.calibration_data FROM anon, authenticated;
REVOKE ALL ON public.daily_product_performance_report FROM anon, authenticated;
REVOKE ALL ON public.health_monitor_v1 FROM anon, authenticated;
REVOKE ALL ON public.subreddit_quality_overview FROM anon, authenticated;
REVOKE ALL ON public.threaddits_advanced_metrics FROM anon, authenticated;
REVOKE ALL ON public.threaddits_dashboard FROM anon, authenticated;