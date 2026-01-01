-- Create internal schema and move views
CREATE SCHEMA IF NOT EXISTS internal;

-- Move regular views to internal schema (not exposed via PostgREST API)
ALTER VIEW public.calibration_data SET SCHEMA internal;
ALTER VIEW public.daily_product_performance_report SET SCHEMA internal;
ALTER VIEW public.health_monitor_v1 SET SCHEMA internal;
ALTER VIEW public.subreddit_quality_overview SET SCHEMA internal;
ALTER VIEW public.threaddits_advanced_metrics SET SCHEMA internal;
ALTER VIEW public.threaddits_dashboard SET SCHEMA internal;