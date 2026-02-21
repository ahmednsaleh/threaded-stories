export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      alert_log: {
        Row: {
          alerted_via: string | null
          conversation_id: string | null
          created_at: string | null
          error_message: string
          execution_id: string | null
          id: number
          node_name: string
          severity: string
          workflow_id: string | null
        }
        Insert: {
          alerted_via?: string | null
          conversation_id?: string | null
          created_at?: string | null
          error_message: string
          execution_id?: string | null
          id?: number
          node_name: string
          severity: string
          workflow_id?: string | null
        }
        Update: {
          alerted_via?: string | null
          conversation_id?: string | null
          created_at?: string | null
          error_message?: string
          execution_id?: string | null
          id?: number
          node_name?: string
          severity?: string
          workflow_id?: string | null
        }
        Relationships: []
      }
      bot_activity_log: {
        Row: {
          action: string
          confidence: number | null
          confidence_score: number | null
          conversation_id: string
          created_at: string | null
          customer_email: string | null
          customer_name: string | null
          customer_question: string | null
          generated_response: string | null
          id: number
          matched_article_id: string | null
          matched_source: string | null
        }
        Insert: {
          action: string
          confidence?: number | null
          confidence_score?: number | null
          conversation_id: string
          created_at?: string | null
          customer_email?: string | null
          customer_name?: string | null
          customer_question?: string | null
          generated_response?: string | null
          id?: number
          matched_article_id?: string | null
          matched_source?: string | null
        }
        Update: {
          action?: string
          confidence?: number | null
          confidence_score?: number | null
          conversation_id?: string
          created_at?: string | null
          customer_email?: string | null
          customer_name?: string | null
          customer_question?: string | null
          generated_response?: string | null
          id?: number
          matched_article_id?: string | null
          matched_source?: string | null
        }
        Relationships: []
      }
      bot_metrics: {
        Row: {
          chat_id: number | null
          duration_ms: number | null
          error_message: string | null
          estimated_cost_usd: number | null
          execution_id: string | null
          has_memory: boolean | null
          id: number
          input_tokens: number | null
          message_type: string | null
          model_used: string | null
          output_tokens: number | null
          routed_to: string | null
          routing_confidence: number | null
          routing_method: string | null
          status: string
          timestamp: string | null
          tools_used: string[] | null
          trace_id: string | null
          user_id: string | null
          worker_name: string | null
        }
        Insert: {
          chat_id?: number | null
          duration_ms?: number | null
          error_message?: string | null
          estimated_cost_usd?: number | null
          execution_id?: string | null
          has_memory?: boolean | null
          id?: number
          input_tokens?: number | null
          message_type?: string | null
          model_used?: string | null
          output_tokens?: number | null
          routed_to?: string | null
          routing_confidence?: number | null
          routing_method?: string | null
          status?: string
          timestamp?: string | null
          tools_used?: string[] | null
          trace_id?: string | null
          user_id?: string | null
          worker_name?: string | null
        }
        Update: {
          chat_id?: number | null
          duration_ms?: number | null
          error_message?: string | null
          estimated_cost_usd?: number | null
          execution_id?: string | null
          has_memory?: boolean | null
          id?: number
          input_tokens?: number | null
          message_type?: string | null
          model_used?: string | null
          output_tokens?: number | null
          routed_to?: string | null
          routing_confidence?: number | null
          routing_method?: string | null
          status?: string
          timestamp?: string | null
          tools_used?: string[] | null
          trace_id?: string | null
          user_id?: string | null
          worker_name?: string | null
        }
        Relationships: []
      }
      bot_reply_log: {
        Row: {
          conversation_id: string
          created_at: string | null
          id: string
          reply_hash: string
          sent_at: string | null
        }
        Insert: {
          conversation_id: string
          created_at?: string | null
          id?: string
          reply_hash: string
          sent_at?: string | null
        }
        Update: {
          conversation_id?: string
          created_at?: string | null
          id?: string
          reply_hash?: string
          sent_at?: string | null
        }
        Relationships: []
      }
      bot_users: {
        Row: {
          created_at: string | null
          display_name: string | null
          id: string
          is_authorized: boolean | null
          settings: Json | null
          telegram_chat_id: number
        }
        Insert: {
          created_at?: string | null
          display_name?: string | null
          id?: string
          is_authorized?: boolean | null
          settings?: Json | null
          telegram_chat_id: number
        }
        Update: {
          created_at?: string | null
          display_name?: string | null
          id?: string
          is_authorized?: boolean | null
          settings?: Json | null
          telegram_chat_id?: number
        }
        Relationships: []
      }
      brain_entries: {
        Row: {
          bot_response: string | null
          consolidated: boolean | null
          content: string
          content_hash: string | null
          created_at: string
          embedding: string | null
          entry_type: string
          id: string
          metadata: Json | null
          relevance_score: number | null
          source: string
          title: string | null
          updated_at: string
          user_id: string | null
          user_message: string | null
        }
        Insert: {
          bot_response?: string | null
          consolidated?: boolean | null
          content: string
          content_hash?: string | null
          created_at?: string
          embedding?: string | null
          entry_type?: string
          id?: string
          metadata?: Json | null
          relevance_score?: number | null
          source?: string
          title?: string | null
          updated_at?: string
          user_id?: string | null
          user_message?: string | null
        }
        Update: {
          bot_response?: string | null
          consolidated?: boolean | null
          content?: string
          content_hash?: string | null
          created_at?: string
          embedding?: string | null
          entry_type?: string
          id?: string
          metadata?: Json | null
          relevance_score?: number | null
          source?: string
          title?: string | null
          updated_at?: string
          user_id?: string | null
          user_message?: string | null
        }
        Relationships: []
      }
      cache_calendar_events: {
        Row: {
          cache_key: string
          cached_at: string | null
          events: Json
          expires_at: string
          hit_count: number | null
          last_hit_at: string | null
          time_max: string
          time_min: string
        }
        Insert: {
          cache_key: string
          cached_at?: string | null
          events: Json
          expires_at: string
          hit_count?: number | null
          last_hit_at?: string | null
          time_max: string
          time_min: string
        }
        Update: {
          cache_key?: string
          cached_at?: string | null
          events?: Json
          expires_at?: string
          hit_count?: number | null
          last_hit_at?: string | null
          time_max?: string
          time_min?: string
        }
        Relationships: []
      }
      cache_gmail_searches: {
        Row: {
          cache_key: string
          cached_at: string | null
          expires_at: string
          hit_count: number | null
          last_hit_at: string | null
          query: string
          results: Json
        }
        Insert: {
          cache_key: string
          cached_at?: string | null
          expires_at: string
          hit_count?: number | null
          last_hit_at?: string | null
          query: string
          results: Json
        }
        Update: {
          cache_key?: string
          cached_at?: string | null
          expires_at?: string
          hit_count?: number | null
          last_hit_at?: string | null
          query?: string
          results?: Json
        }
        Relationships: []
      }
      cache_jira_issues: {
        Row: {
          cache_key: string
          cached_at: string | null
          expires_at: string
          hit_count: number | null
          jql: string
          last_hit_at: string | null
          results: Json
        }
        Insert: {
          cache_key: string
          cached_at?: string | null
          expires_at: string
          hit_count?: number | null
          jql: string
          last_hit_at?: string | null
          results: Json
        }
        Update: {
          cache_key?: string
          cached_at?: string | null
          expires_at?: string
          hit_count?: number | null
          jql?: string
          last_hit_at?: string | null
          results?: Json
        }
        Relationships: []
      }
      cache_web_searches: {
        Row: {
          cache_key: string
          cached_at: string | null
          expires_at: string
          hit_count: number | null
          last_hit_at: string | null
          query: string
          results: Json
        }
        Insert: {
          cache_key: string
          cached_at?: string | null
          expires_at: string
          hit_count?: number | null
          last_hit_at?: string | null
          query: string
          results: Json
        }
        Update: {
          cache_key?: string
          cached_at?: string | null
          expires_at?: string
          hit_count?: number | null
          last_hit_at?: string | null
          query?: string
          results?: Json
        }
        Relationships: []
      }
      circuit_breaker_state: {
        Row: {
          api_name: string
          created_at: string | null
          failure_count: number | null
          id: string
          last_failure_at: string | null
          last_success_at: string | null
          opened_at: string | null
          state: string
          success_count: number | null
          updated_at: string | null
          window_start: string | null
          worker_name: string | null
        }
        Insert: {
          api_name: string
          created_at?: string | null
          failure_count?: number | null
          id?: string
          last_failure_at?: string | null
          last_success_at?: string | null
          opened_at?: string | null
          state: string
          success_count?: number | null
          updated_at?: string | null
          window_start?: string | null
          worker_name?: string | null
        }
        Update: {
          api_name?: string
          created_at?: string | null
          failure_count?: number | null
          id?: string
          last_failure_at?: string | null
          last_success_at?: string | null
          opened_at?: string | null
          state?: string
          success_count?: number | null
          updated_at?: string | null
          window_start?: string | null
          worker_name?: string | null
        }
        Relationships: []
      }
      conversation_followup_state: {
        Row: {
          auto_closed_at: string | null
          conversation_id: string
          created_at: string | null
          customer_email: string | null
          followup_sent_at: string | null
          id: number
          initial_reply_sent_at: string | null
          last_customer_response_at: string | null
          status: string
          updated_at: string | null
        }
        Insert: {
          auto_closed_at?: string | null
          conversation_id: string
          created_at?: string | null
          customer_email?: string | null
          followup_sent_at?: string | null
          id?: number
          initial_reply_sent_at?: string | null
          last_customer_response_at?: string | null
          status?: string
          updated_at?: string | null
        }
        Update: {
          auto_closed_at?: string | null
          conversation_id?: string
          created_at?: string | null
          customer_email?: string | null
          followup_sent_at?: string | null
          id?: number
          initial_reply_sent_at?: string | null
          last_customer_response_at?: string | null
          status?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      crawler_locks: {
        Row: {
          id: string
          locked_at: string | null
          locked_until: string
        }
        Insert: {
          id: string
          locked_at?: string | null
          locked_until: string
        }
        Update: {
          id?: string
          locked_at?: string | null
          locked_until?: string
        }
        Relationships: []
      }
      crawler_runs: {
        Row: {
          batches_processed: number | null
          completed_at: string | null
          duration_seconds: number | null
          id: string
          leads_inserted: number | null
          leads_skipped: number | null
          notes: string | null
          products_processed: number | null
          started_at: string
          status: string | null
          top_score: number | null
          trigger_mode: string | null
        }
        Insert: {
          batches_processed?: number | null
          completed_at?: string | null
          duration_seconds?: number | null
          id?: string
          leads_inserted?: number | null
          leads_skipped?: number | null
          notes?: string | null
          products_processed?: number | null
          started_at?: string
          status?: string | null
          top_score?: number | null
          trigger_mode?: string | null
        }
        Update: {
          batches_processed?: number | null
          completed_at?: string | null
          duration_seconds?: number | null
          id?: string
          leads_inserted?: number | null
          leads_skipped?: number | null
          notes?: string | null
          products_processed?: number | null
          started_at?: string
          status?: string | null
          top_score?: number | null
          trigger_mode?: string | null
        }
        Relationships: []
      }
      daily_digest_log: {
        Row: {
          created_at: string | null
          email_sent_at: string | null
          id: number
          period_end: string
          period_start: string
        }
        Insert: {
          created_at?: string | null
          email_sent_at?: string | null
          id?: number
          period_end: string
          period_start: string
        }
        Update: {
          created_at?: string | null
          email_sent_at?: string | null
          id?: number
          period_end?: string
          period_start?: string
        }
        Relationships: []
      }
      failed_bot_actions: {
        Row: {
          conversation_id: string
          created_at: string | null
          customer_email: string | null
          customer_question: string | null
          error_details: Json | null
          error_message: string | null
          error_stack: string | null
          execution_id: string | null
          failed_at: string | null
          failed_node: string
          failure_reason: string | null
          id: string
          last_retry_at: string | null
          node_name: string | null
          resolution_notes: string | null
          resolved: boolean | null
          resolved_at: string | null
          retry_count: number | null
          updated_at: string | null
        }
        Insert: {
          conversation_id: string
          created_at?: string | null
          customer_email?: string | null
          customer_question?: string | null
          error_details?: Json | null
          error_message?: string | null
          error_stack?: string | null
          execution_id?: string | null
          failed_at?: string | null
          failed_node: string
          failure_reason?: string | null
          id?: string
          last_retry_at?: string | null
          node_name?: string | null
          resolution_notes?: string | null
          resolved?: boolean | null
          resolved_at?: string | null
          retry_count?: number | null
          updated_at?: string | null
        }
        Update: {
          conversation_id?: string
          created_at?: string | null
          customer_email?: string | null
          customer_question?: string | null
          error_details?: Json | null
          error_message?: string | null
          error_stack?: string | null
          execution_id?: string | null
          failed_at?: string | null
          failed_node?: string
          failure_reason?: string | null
          id?: string
          last_retry_at?: string | null
          node_name?: string | null
          resolution_notes?: string | null
          resolved?: boolean | null
          resolved_at?: string | null
          retry_count?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      failedbotactions: {
        Row: {
          conversation_id: string | null
          created_at: string | null
          error_message: string | null
          error_stack: string | null
          execution_id: string | null
          id: number
          node_name: string | null
        }
        Insert: {
          conversation_id?: string | null
          created_at?: string | null
          error_message?: string | null
          error_stack?: string | null
          execution_id?: string | null
          id?: number
          node_name?: string | null
        }
        Update: {
          conversation_id?: string | null
          created_at?: string | null
          error_message?: string | null
          error_stack?: string | null
          execution_id?: string | null
          id?: number
          node_name?: string | null
        }
        Relationships: []
      }
      keyword_performance: {
        Row: {
          conversion_rate: number
          created_at: string | null
          id: string
          impressions: number
          keyword: string
          keyword_tier: string | null
          last_success_at: string | null
          leads_found: number
          product_id: string | null
          status: string
          updated_at: string | null
        }
        Insert: {
          conversion_rate?: number
          created_at?: string | null
          id?: string
          impressions?: number
          keyword: string
          keyword_tier?: string | null
          last_success_at?: string | null
          leads_found?: number
          product_id?: string | null
          status?: string
          updated_at?: string | null
        }
        Update: {
          conversion_rate?: number
          created_at?: string | null
          id?: string
          impressions?: number
          keyword?: string
          keyword_tier?: string | null
          last_success_at?: string | null
          leads_found?: number
          product_id?: string | null
          status?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "keyword_performance_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      lead_feedback: {
        Row: {
          id: string
          lead_id: string
          recorded_at: string | null
          verdict: string
        }
        Insert: {
          id?: string
          lead_id: string
          recorded_at?: string | null
          verdict: string
        }
        Update: {
          id?: string
          lead_id?: string
          recorded_at?: string | null
          verdict?: string
        }
        Relationships: [
          {
            foreignKeyName: "lead_feedback_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: true
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
        ]
      }
      leads: {
        Row: {
          author: string
          buying_signal: string | null
          buying_stage_detail: string | null
          competitive_context_detail: string | null
          competitors_mentioned: string | null
          created_at: string | null
          created_utc: string | null
          id: string
          intent_score: number
          intent_type: string | null
          is_problem_focused: boolean | null
          is_solution_seeking: boolean | null
          objection_barrier: string | null
          pipeline_version: number | null
          post_age_hours: number | null
          post_content: string
          post_created_utc: number | null
          post_title: string
          post_url: string
          problem_statement_detail: string | null
          product_id: string | null
          relevance_summary: string | null
          sentiment: string | null
          source_subreddit: string
          stage: string | null
          status: string
          suggested_reply_hook: string | null
          updated_at: string | null
          urgency_signal: string | null
          urgency_signals_detail: string | null
          user_feedback: string | null
          user_goal: string | null
          user_id: string
        }
        Insert: {
          author: string
          buying_signal?: string | null
          buying_stage_detail?: string | null
          competitive_context_detail?: string | null
          competitors_mentioned?: string | null
          created_at?: string | null
          created_utc?: string | null
          id?: string
          intent_score: number
          intent_type?: string | null
          is_problem_focused?: boolean | null
          is_solution_seeking?: boolean | null
          objection_barrier?: string | null
          pipeline_version?: number | null
          post_age_hours?: number | null
          post_content: string
          post_created_utc?: number | null
          post_title: string
          post_url: string
          problem_statement_detail?: string | null
          product_id?: string | null
          relevance_summary?: string | null
          sentiment?: string | null
          source_subreddit: string
          stage?: string | null
          status?: string
          suggested_reply_hook?: string | null
          updated_at?: string | null
          urgency_signal?: string | null
          urgency_signals_detail?: string | null
          user_feedback?: string | null
          user_goal?: string | null
          user_id: string
        }
        Update: {
          author?: string
          buying_signal?: string | null
          buying_stage_detail?: string | null
          competitive_context_detail?: string | null
          competitors_mentioned?: string | null
          created_at?: string | null
          created_utc?: string | null
          id?: string
          intent_score?: number
          intent_type?: string | null
          is_problem_focused?: boolean | null
          is_solution_seeking?: boolean | null
          objection_barrier?: string | null
          pipeline_version?: number | null
          post_age_hours?: number | null
          post_content?: string
          post_created_utc?: number | null
          post_title?: string
          post_url?: string
          problem_statement_detail?: string | null
          product_id?: string | null
          relevance_summary?: string | null
          sentiment?: string | null
          source_subreddit?: string
          stage?: string | null
          status?: string
          suggested_reply_hook?: string | null
          updated_at?: string | null
          urgency_signal?: string | null
          urgency_signals_detail?: string | null
          user_feedback?: string | null
          user_goal?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "leads_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      processed_messages: {
        Row: {
          chat_id: number
          id: number
          message_id: number
          processed_at: string | null
        }
        Insert: {
          chat_id: number
          id?: number
          message_id: number
          processed_at?: string | null
        }
        Update: {
          chat_id?: number
          id?: number
          message_id?: number
          processed_at?: string | null
        }
        Relationships: []
      }
      product_execution_logs: {
        Row: {
          created_at: string | null
          error_details: string | null
          high_intent_leads: number | null
          id: string
          keywords_used: string[] | null
          leads_qualified: number | null
          posts_analyzed: number | null
          posts_fetched: number | null
          product_id: string | null
          run_id: string
          status: string | null
          strategy_used: string | null
          subreddits_scanned: string[] | null
          time_filter: string | null
        }
        Insert: {
          created_at?: string | null
          error_details?: string | null
          high_intent_leads?: number | null
          id?: string
          keywords_used?: string[] | null
          leads_qualified?: number | null
          posts_analyzed?: number | null
          posts_fetched?: number | null
          product_id?: string | null
          run_id: string
          status?: string | null
          strategy_used?: string | null
          subreddits_scanned?: string[] | null
          time_filter?: string | null
        }
        Update: {
          created_at?: string | null
          error_details?: string | null
          high_intent_leads?: number | null
          id?: string
          keywords_used?: string[] | null
          leads_qualified?: number | null
          posts_analyzed?: number | null
          posts_fetched?: number | null
          product_id?: string | null
          run_id?: string
          status?: string | null
          strategy_used?: string | null
          subreddits_scanned?: string[] | null
          time_filter?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "product_execution_logs_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      product_learning_state: {
        Row: {
          buyer_persona_refinements: Json | null
          id: string
          intent_signal_boosters: Json | null
          product_id: string | null
          scope_boundaries: Json | null
          scoring_calibration_instruction: string | null
          updated_at: string | null
        }
        Insert: {
          buyer_persona_refinements?: Json | null
          id?: string
          intent_signal_boosters?: Json | null
          product_id?: string | null
          scope_boundaries?: Json | null
          scoring_calibration_instruction?: string | null
          updated_at?: string | null
        }
        Update: {
          buyer_persona_refinements?: Json | null
          id?: string
          intent_signal_boosters?: Json | null
          product_id?: string | null
          scope_boundaries?: Json | null
          scoring_calibration_instruction?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "product_learning_state_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: true
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      product_subreddit_status: {
        Row: {
          avg_intent_score: number | null
          created_at: string | null
          id: string
          last_activity_at: string | null
          origin: string | null
          product_id: string | null
          rejected_leads_count: number | null
          status: string | null
          subreddit: string
          total_leads_found: number | null
        }
        Insert: {
          avg_intent_score?: number | null
          created_at?: string | null
          id?: string
          last_activity_at?: string | null
          origin?: string | null
          product_id?: string | null
          rejected_leads_count?: number | null
          status?: string | null
          subreddit: string
          total_leads_found?: number | null
        }
        Update: {
          avg_intent_score?: number | null
          created_at?: string | null
          id?: string
          last_activity_at?: string | null
          origin?: string | null
          product_id?: string | null
          rejected_leads_count?: number | null
          status?: string | null
          subreddit?: string
          total_leads_found?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "product_subreddit_status_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          business_type: string
          crawl_exhausted: boolean | null
          crawl_history: Json | null
          created_at: string
          discovery_attempts_count: number | null
          id: string
          jobs_to_be_done: string | null
          keywords: Json | null
          keywords_generated_at: string | null
          last_fetched_at: string | null
          last_lead_found_at: string | null
          last_run_at: string | null
          magic_fill_attempts_count: number | null
          pain_points_solved: string
          persona: string | null
          product_category: string | null
          product_description: string
          product_name: string
          product_url: string | null
          status: string | null
          subreddits: string[] | null
          typical_sale_value: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          business_type: string
          crawl_exhausted?: boolean | null
          crawl_history?: Json | null
          created_at?: string
          discovery_attempts_count?: number | null
          id?: string
          jobs_to_be_done?: string | null
          keywords?: Json | null
          keywords_generated_at?: string | null
          last_fetched_at?: string | null
          last_lead_found_at?: string | null
          last_run_at?: string | null
          magic_fill_attempts_count?: number | null
          pain_points_solved: string
          persona?: string | null
          product_category?: string | null
          product_description: string
          product_name: string
          product_url?: string | null
          status?: string | null
          subreddits?: string[] | null
          typical_sale_value?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          business_type?: string
          crawl_exhausted?: boolean | null
          crawl_history?: Json | null
          created_at?: string
          discovery_attempts_count?: number | null
          id?: string
          jobs_to_be_done?: string | null
          keywords?: Json | null
          keywords_generated_at?: string | null
          last_fetched_at?: string | null
          last_lead_found_at?: string | null
          last_run_at?: string | null
          magic_fill_attempts_count?: number | null
          pain_points_solved?: string
          persona?: string | null
          product_category?: string | null
          product_description?: string
          product_name?: string
          product_url?: string | null
          status?: string | null
          subreddits?: string[] | null
          typical_sale_value?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      rate_limits: {
        Row: {
          call_count: number
          created_at: string | null
          function_name: string
          id: string
          user_id: string
          window_start: string
        }
        Insert: {
          call_count?: number
          created_at?: string | null
          function_name: string
          id?: string
          user_id: string
          window_start?: string
        }
        Update: {
          call_count?: number
          created_at?: string | null
          function_name?: string
          id?: string
          user_id?: string
          window_start?: string
        }
        Relationships: []
      }
      rejection_patterns: {
        Row: {
          confidence: number | null
          created_at: string | null
          id: string
          post_content: string
          post_title: string | null
          product_id: string | null
          rejected_at: string | null
          rejected_by: string | null
          rejection_reason:
            | Database["public"]["Enums"]["rejection_reason"]
            | null
          status: string | null
        }
        Insert: {
          confidence?: number | null
          created_at?: string | null
          id?: string
          post_content: string
          post_title?: string | null
          product_id?: string | null
          rejected_at?: string | null
          rejected_by?: string | null
          rejection_reason?:
            | Database["public"]["Enums"]["rejection_reason"]
            | null
          status?: string | null
        }
        Update: {
          confidence?: number | null
          created_at?: string | null
          id?: string
          post_content?: string
          post_title?: string | null
          product_id?: string | null
          rejected_at?: string | null
          rejected_by?: string | null
          rejection_reason?:
            | Database["public"]["Enums"]["rejection_reason"]
            | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "rejection_patterns_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      resolved_conversations: {
        Row: {
          answer: string
          category: string | null
          conversation_id: string
          embedding: string | null
          id: number
          learned_at: string | null
          question: string
        }
        Insert: {
          answer: string
          category?: string | null
          conversation_id: string
          embedding?: string | null
          id?: number
          learned_at?: string | null
          question: string
        }
        Update: {
          answer?: string
          category?: string | null
          conversation_id?: string
          embedding?: string | null
          id?: number
          learned_at?: string | null
          question?: string
        }
        Relationships: []
      }
      sanad_conversations: {
        Row: {
          auto_closed_at: string | null
          conversation_id: string
          created_at: string | null
          followup_sent_at: string | null
          initial_reply_sent_at: string | null
          status: string
          updated_at: string | null
          user_email: string | null
        }
        Insert: {
          auto_closed_at?: string | null
          conversation_id: string
          created_at?: string | null
          followup_sent_at?: string | null
          initial_reply_sent_at?: string | null
          status?: string
          updated_at?: string | null
          user_email?: string | null
        }
        Update: {
          auto_closed_at?: string | null
          conversation_id?: string
          created_at?: string | null
          followup_sent_at?: string | null
          initial_reply_sent_at?: string | null
          status?: string
          updated_at?: string | null
          user_email?: string | null
        }
        Relationships: []
      }
      subreddits: {
        Row: {
          avg_daily_comments: number | null
          avg_daily_posts: number | null
          buying_keywords_found: number | null
          commercial_score: number | null
          community_type: string | null
          content_sample: string | null
          content_sample_updated_utc: string | null
          description: string | null
          engagement_ratio: number | null
          id: number
          last_active_utc: string | null
          name: string
          subscribers: number | null
          updated_at: string | null
        }
        Insert: {
          avg_daily_comments?: number | null
          avg_daily_posts?: number | null
          buying_keywords_found?: number | null
          commercial_score?: number | null
          community_type?: string | null
          content_sample?: string | null
          content_sample_updated_utc?: string | null
          description?: string | null
          engagement_ratio?: number | null
          id?: never
          last_active_utc?: string | null
          name: string
          subscribers?: number | null
          updated_at?: string | null
        }
        Update: {
          avg_daily_comments?: number | null
          avg_daily_posts?: number | null
          buying_keywords_found?: number | null
          commercial_score?: number | null
          community_type?: string | null
          content_sample?: string | null
          content_sample_updated_utc?: string | null
          description?: string | null
          engagement_ratio?: number | null
          id?: never
          last_active_utc?: string | null
          name?: string
          subscribers?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      support_articles: {
        Row: {
          answer: string
          category: string | null
          created_at: string | null
          embedding: string | null
          id: number
          question: string
          times_used: number | null
          updated_at: string | null
        }
        Insert: {
          answer: string
          category?: string | null
          created_at?: string | null
          embedding?: string | null
          id?: number
          question: string
          times_used?: number | null
          updated_at?: string | null
        }
        Update: {
          answer?: string
          category?: string | null
          created_at?: string | null
          embedding?: string | null
          id?: number
          question?: string
          times_used?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      system_actions: {
        Row: {
          action_details: Json | null
          action_type: string
          executed_at: string | null
          id: string
          product_id: string | null
        }
        Insert: {
          action_details?: Json | null
          action_type: string
          executed_at?: string | null
          id?: string
          product_id?: string | null
        }
        Update: {
          action_details?: Json | null
          action_type?: string
          executed_at?: string | null
          id?: string
          product_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "system_actions_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      telegram_error_log: {
        Row: {
          chat_id: string
          created_at: string
          error: string | null
          id: number
          message: string
          retry_count: number | null
          workflow_id: string | null
          workflow_name: string | null
        }
        Insert: {
          chat_id: string
          created_at?: string
          error?: string | null
          id?: number
          message: string
          retry_count?: number | null
          workflow_id?: string | null
          workflow_name?: string | null
        }
        Update: {
          chat_id?: string
          created_at?: string
          error?: string | null
          id?: number
          message?: string
          retry_count?: number | null
          workflow_id?: string | null
          workflow_name?: string | null
        }
        Relationships: []
      }
      telegram_health_log: {
        Row: {
          checked_at: string
          error_message: string | null
          id: number
          response_time_ms: number | null
          status: string
        }
        Insert: {
          checked_at?: string
          error_message?: string | null
          id?: number
          response_time_ms?: number | null
          status: string
        }
        Update: {
          checked_at?: string
          error_message?: string | null
          id?: number
          response_time_ms?: number | null
          status?: string
        }
        Relationships: []
      }
      test_results: {
        Row: {
          assertions: Json | null
          completed_at: string | null
          error_message: string | null
          id: string
          metadata: Json | null
          started_at: string | null
          status: string
          test_id: string
          test_run_id: string | null
        }
        Insert: {
          assertions?: Json | null
          completed_at?: string | null
          error_message?: string | null
          id?: string
          metadata?: Json | null
          started_at?: string | null
          status: string
          test_id: string
          test_run_id?: string | null
        }
        Update: {
          assertions?: Json | null
          completed_at?: string | null
          error_message?: string | null
          id?: string
          metadata?: Json | null
          started_at?: string | null
          status?: string
          test_id?: string
          test_run_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "test_results_test_run_id_fkey"
            columns: ["test_run_id"]
            isOneToOne: false
            referencedRelation: "test_runs"
            referencedColumns: ["id"]
          },
        ]
      }
      test_runs: {
        Row: {
          completed_at: string | null
          failed_tests: number | null
          id: string
          metadata: Json | null
          passed_tests: number | null
          report: string | null
          session_id: string
          started_at: string | null
          status: string
          total_tests: number | null
        }
        Insert: {
          completed_at?: string | null
          failed_tests?: number | null
          id?: string
          metadata?: Json | null
          passed_tests?: number | null
          report?: string | null
          session_id: string
          started_at?: string | null
          status?: string
          total_tests?: number | null
        }
        Update: {
          completed_at?: string | null
          failed_tests?: number | null
          id?: string
          metadata?: Json | null
          passed_tests?: number | null
          report?: string | null
          session_id?: string
          started_at?: string | null
          status?: string
          total_tests?: number | null
        }
        Relationships: []
      }
      user_events: {
        Row: {
          created_at: string | null
          details: Json | null
          event_type: string
          id: string
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          details?: Json | null
          event_type: string
          id?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          details?: Json | null
          event_type?: string
          id?: string
          user_id?: string | null
        }
        Relationships: []
      }
      users: {
        Row: {
          avatar_url: string | null
          email: string | null
          full_name: string | null
          id: string
          onboarding_complete: boolean | null
          product_url: string | null
          stripe_customer_id: string | null
          subscription_tier: string | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          email?: string | null
          full_name?: string | null
          id: string
          onboarding_complete?: boolean | null
          product_url?: string | null
          stripe_customer_id?: string | null
          subscription_tier?: string | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          onboarding_complete?: boolean | null
          product_url?: string | null
          stripe_customer_id?: string | null
          subscription_tier?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      webhook_events: {
        Row: {
          error_message: string | null
          event_type: string
          id: string
          payload: Json
          processed_at: string | null
          stripe_event_id: string
        }
        Insert: {
          error_message?: string | null
          event_type: string
          id?: string
          payload: Json
          processed_at?: string | null
          stripe_event_id: string
        }
        Update: {
          error_message?: string | null
          event_type?: string
          id?: string
          payload?: Json
          processed_at?: string | null
          stripe_event_id?: string
        }
        Relationships: []
      }
      workflow_logs: {
        Row: {
          completed_at: string | null
          details: Json | null
          error_message: string | null
          id: string
          products_processed_count: number | null
          qualified_leads_count: number | null
          reddit_api_calls: number | null
          reddit_ratelimit_remaining: number | null
          run_id: string | null
          started_at: string | null
          status: string
          tokens_used_input: number | null
          tokens_used_output: number | null
          total_leads_found: number | null
        }
        Insert: {
          completed_at?: string | null
          details?: Json | null
          error_message?: string | null
          id?: string
          products_processed_count?: number | null
          qualified_leads_count?: number | null
          reddit_api_calls?: number | null
          reddit_ratelimit_remaining?: number | null
          run_id?: string | null
          started_at?: string | null
          status: string
          tokens_used_input?: number | null
          tokens_used_output?: number | null
          total_leads_found?: number | null
        }
        Update: {
          completed_at?: string | null
          details?: Json | null
          error_message?: string | null
          id?: string
          products_processed_count?: number | null
          qualified_leads_count?: number | null
          reddit_api_calls?: number | null
          reddit_ratelimit_remaining?: number | null
          run_id?: string | null
          started_at?: string | null
          status?: string
          tokens_used_input?: number | null
          tokens_used_output?: number | null
          total_leads_found?: number | null
        }
        Relationships: []
      }
    }
    Views: {
      cache_statistics: {
        Row: {
          active_entries: number | null
          age_seconds: number | null
          avg_hits_per_entry: number | null
          expired_entries: number | null
          newest_entry: string | null
          oldest_entry: string | null
          service: string | null
          total_entries: number | null
          total_hits: number | null
        }
        Relationships: []
      }
      threaddits_advanced_metrics: {
        Row: {
          avg_discovery_saturation: number | null
          avg_time_to_first_lead_mins: number | null
          global_cprl: number | null
          global_signal_to_noise_ratio: number | null
        }
        Relationships: []
      }
    }
    Functions: {
      cleanup_all_caches: {
        Args: never
        Returns: {
          deleted_count: number
          remaining_count: number
          service: string
        }[]
      }
      cleanup_calendar_cache: {
        Args: never
        Returns: {
          deleted_count: number
        }[]
      }
      cleanup_gmail_cache: {
        Args: never
        Returns: {
          deleted_count: number
        }[]
      }
      cleanup_jira_cache: {
        Args: never
        Returns: {
          deleted_count: number
        }[]
      }
      cleanup_processed_messages: { Args: never; Returns: undefined }
      cleanup_rate_limits: { Args: never; Returns: undefined }
      cleanup_sanad_processed_messages: { Args: never; Returns: undefined }
      cleanup_web_cache: {
        Args: never
        Returns: {
          deleted_count: number
        }[]
      }
      current_auth_uid: { Args: never; Returns: string }
      fn_record_lead_feedback: {
        Args: { p_lead_id: string; p_verdict: string }
        Returns: Json
      }
      fn_update_calibration_from_feedback: {
        Args: { p_lead_id: string }
        Returns: Json
      }
      generate_optimal_keywords: {
        Args: { p_product_id: string }
        Returns: {
          keyword: string
          tier: string
        }[]
      }
      get_calendar_cache: { Args: { p_cache_key: string }; Returns: Json }
      get_existing_post_urls: {
        Args: {
          p_searched_keyword: string
          p_user_id: string
          urls_to_check: string[]
        }
        Returns: {
          post_url: string
        }[]
      }
      get_gmail_cache: { Args: { p_cache_key: string }; Returns: Json }
      get_jira_cache: { Args: { p_cache_key: string }; Returns: Json }
      get_optimal_subreddits_by_category: {
        Args: {
          p_business_type: string
          p_category: string
          p_product_name?: string
        }
        Returns: string[]
      }
      get_web_cache: { Args: { p_cache_key: string }; Returns: Json }
      get_weekly_high_intent_leads_count: {
        Args: { p_product_id: string; p_user_id: string }
        Returns: number
      }
      invalidate_calendar_cache: { Args: never; Returns: number }
      invalidate_gmail_cache: { Args: never; Returns: number }
      invalidate_jira_cache: { Args: never; Returns: number }
      is_product_owner: { Args: { prod_uuid: string }; Returns: boolean }
      match_brain_entries_v2: {
        Args: {
          filter_user_id?: string
          match_count?: number
          match_threshold?: number
          query_embedding: string
        }
        Returns: {
          content: string
          entry_type: string
          id: string
          similarity: number
        }[]
      }
      match_support_knowledge: {
        Args: {
          match_count?: number
          match_threshold?: number
          query_embedding: string
        }
        Returns: {
          answer: string
          category: string
          id: string
          question: string
          similarity: number
          source: string
        }[]
      }
      record_subreddit_rejection: {
        Args: { p_product_id: string; p_subreddit: string }
        Returns: undefined
      }
      set_calendar_cache: {
        Args: {
          p_cache_key: string
          p_events: Json
          p_time_max: string
          p_time_min: string
          p_ttl_minutes?: number
        }
        Returns: undefined
      }
      set_gmail_cache: {
        Args: {
          p_cache_key: string
          p_query: string
          p_results: Json
          p_ttl_minutes?: number
        }
        Returns: undefined
      }
      set_jira_cache: {
        Args: {
          p_cache_key: string
          p_jql: string
          p_results: Json
          p_ttl_minutes?: number
        }
        Returns: undefined
      }
      set_web_cache: {
        Args: {
          p_cache_key: string
          p_query: string
          p_results: Json
          p_ttl_minutes?: number
        }
        Returns: undefined
      }
      update_circuit_breaker: {
        Args: { p_api_name: string; p_success: boolean }
        Returns: undefined
      }
      update_subreddit_performance: {
        Args: { target_product_id: string }
        Returns: undefined
      }
      wilson_score_lower_bound: {
        Args: { positive: number; total: number; z?: number }
        Returns: number
      }
    }
    Enums: {
      rejection_reason:
        | "wrong_persona"
        | "wrong_intent"
        | "wrong_scope"
        | "spam"
        | "geography"
        | "other"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      rejection_reason: [
        "wrong_persona",
        "wrong_intent",
        "wrong_scope",
        "spam",
        "geography",
        "other",
      ],
    },
  },
} as const
