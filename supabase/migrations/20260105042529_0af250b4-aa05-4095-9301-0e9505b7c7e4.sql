-- Move the materialized view to internal schema to prevent exposure via PostgREST API
ALTER MATERIALIZED VIEW public.threaddits_metrics_cached SET SCHEMA internal;