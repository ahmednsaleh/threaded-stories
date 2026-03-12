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
      brain_entities: {
        Row: {
          aliases: string[] | null
          entity_type: string
          first_seen_at: string | null
          id: string
          last_seen_at: string | null
          mention_count: number | null
          metadata: Json | null
          name: string
        }
        Insert: {
          aliases?: string[] | null
          entity_type: string
          first_seen_at?: string | null
          id?: string
          last_seen_at?: string | null
          mention_count?: number | null
          metadata?: Json | null
          name: string
        }
        Update: {
          aliases?: string[] | null
          entity_type?: string
          first_seen_at?: string | null
          id?: string
          last_seen_at?: string | null
          mention_count?: number | null
          metadata?: Json | null
          name?: string
        }
        Relationships: []
      }
      brain_entries: {
        Row: {
          access_count: number | null
          bot_response: string | null
          consolidated: boolean | null
          content: string
          content_hash: string | null
          created_at: string
          embedding: string | null
          entities: Json | null
          entry_type: string
          id: string
          importance_score: number | null
          is_identity_fact: boolean | null
          is_synthesized: boolean | null
          last_accessed_at: string | null
          metadata: Json | null
          related_ids: string[] | null
          relevance_score: number | null
          source: string
          source_ids: string[] | null
          tags: string[] | null
          title: string | null
          updated_at: string
          user_id: string | null
          user_message: string | null
        }
        Insert: {
          access_count?: number | null
          bot_response?: string | null
          consolidated?: boolean | null
          content: string
          content_hash?: string | null
          created_at?: string
          embedding?: string | null
          entities?: Json | null
          entry_type?: string
          id?: string
          importance_score?: number | null
          is_identity_fact?: boolean | null
          is_synthesized?: boolean | null
          last_accessed_at?: string | null
          metadata?: Json | null
          related_ids?: string[] | null
          relevance_score?: number | null
          source?: string
          source_ids?: string[] | null
          tags?: string[] | null
          title?: string | null
          updated_at?: string
          user_id?: string | null
          user_message?: string | null
        }
        Update: {
          access_count?: number | null
          bot_response?: string | null
          consolidated?: boolean | null
          content?: string
          content_hash?: string | null
          created_at?: string
          embedding?: string | null
          entities?: Json | null
          entry_type?: string
          id?: string
          importance_score?: number | null
          is_identity_fact?: boolean | null
          is_synthesized?: boolean | null
          last_accessed_at?: string | null
          metadata?: Json | null
          related_ids?: string[] | null
          relevance_score?: number | null
          source?: string
          source_ids?: string[] | null
          tags?: string[] | null
          title?: string | null
          updated_at?: string
          user_id?: string | null
          user_message?: string | null
        }
        Relationships: []
      }
      brain_relations: {
        Row: {
          created_at: string | null
          from_id: string | null
          id: string
          relation_type: string
          strength: number | null
          to_id: string | null
        }
        Insert: {
          created_at?: string | null
          from_id?: string | null
          id?: string
          relation_type: string
          strength?: number | null
          to_id?: string | null
        }
        Update: {
          created_at?: string | null
          from_id?: string | null
          id?: string
          relation_type?: string
          strength?: number | null
          to_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "brain_relations_from_id_fkey"
            columns: ["from_id"]
            isOneToOne: false
            referencedRelation: "brain_entries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "brain_relations_to_id_fkey"
            columns: ["to_id"]
            isOneToOne: false
            referencedRelation: "brain_entries"
            referencedColumns: ["id"]
          },
        ]
      }
      brain_syntheses: {
        Row: {
          created_at: string | null
          date_range_end: string | null
          date_range_start: string | null
          embedding: string | null
          entry_count: number | null
          id: string
          source_entry_ids: string[] | null
          synthesis_text: string
          topic: string
        }
        Insert: {
          created_at?: string | null
          date_range_end?: string | null
          date_range_start?: string | null
          embedding?: string | null
          entry_count?: number | null
          id?: string
          source_entry_ids?: string[] | null
          synthesis_text: string
          topic: string
        }
        Update: {
          created_at?: string | null
          date_range_end?: string | null
          date_range_start?: string | null
          embedding?: string | null
          entry_count?: number | null
          id?: string
          source_entry_ids?: string[] | null
          synthesis_text?: string
          topic?: string
        }
        Relationships: []
      }
      bz_active_bets: {
        Row: {
          bet_rank: number
          break_even_weeks: number | null
          cac_estimate_usd: number | null
          created_at: string | null
          distribution_channel: string | null
          id: string
          ltv_estimate_usd: number | null
          notes: string | null
          opportunity_id: string
          pain_intensity: number | null
          payback_months: number | null
          ranking: string | null
          speed_to_1k_weeks: number | null
          status: string
          status_updated_at: string | null
          title: string
          updated_at: string | null
          wtp_dollars: number | null
          wtp_evidence: string | null
        }
        Insert: {
          bet_rank?: number
          break_even_weeks?: number | null
          cac_estimate_usd?: number | null
          created_at?: string | null
          distribution_channel?: string | null
          id?: string
          ltv_estimate_usd?: number | null
          notes?: string | null
          opportunity_id: string
          pain_intensity?: number | null
          payback_months?: number | null
          ranking?: string | null
          speed_to_1k_weeks?: number | null
          status?: string
          status_updated_at?: string | null
          title: string
          updated_at?: string | null
          wtp_dollars?: number | null
          wtp_evidence?: string | null
        }
        Update: {
          bet_rank?: number
          break_even_weeks?: number | null
          cac_estimate_usd?: number | null
          created_at?: string | null
          distribution_channel?: string | null
          id?: string
          ltv_estimate_usd?: number | null
          notes?: string | null
          opportunity_id?: string
          pain_intensity?: number | null
          payback_months?: number | null
          ranking?: string | null
          speed_to_1k_weeks?: number | null
          status?: string
          status_updated_at?: string | null
          title?: string
          updated_at?: string | null
          wtp_dollars?: number | null
          wtp_evidence?: string | null
        }
        Relationships: []
      }
      bz_pipeline_events: {
        Row: {
          completed_at: string | null
          created_at: string
          event_type: string
          id: string
          payload_bytes: number | null
          payload_json: Json | null
          retry_count: number
          source_bot: string
          status: string
          target_bot: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          event_type: string
          id?: string
          payload_bytes?: number | null
          payload_json?: Json | null
          retry_count?: number
          source_bot: string
          status?: string
          target_bot: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          event_type?: string
          id?: string
          payload_bytes?: number | null
          payload_json?: Json | null
          retry_count?: number
          source_bot?: string
          status?: string
          target_bot?: string
        }
        Relationships: []
      }
      bz_system_state: {
        Row: {
          bot_name: string
          checked_by_at: string | null
          current_load: number | null
          dahab_commitment_backlog: number | null
          error_count: number | null
          id: string
          last_error: string | null
          magd_draft_queue_size: number | null
          sanad_confidence_avg: number | null
          sanad_escalation_rate: number | null
          success_count: number | null
          updated_at: string | null
        }
        Insert: {
          bot_name: string
          checked_by_at?: string | null
          current_load?: number | null
          dahab_commitment_backlog?: number | null
          error_count?: number | null
          id?: string
          last_error?: string | null
          magd_draft_queue_size?: number | null
          sanad_confidence_avg?: number | null
          sanad_escalation_rate?: number | null
          success_count?: number | null
          updated_at?: string | null
        }
        Update: {
          bot_name?: string
          checked_by_at?: string | null
          current_load?: number | null
          dahab_commitment_backlog?: number | null
          error_count?: number | null
          id?: string
          last_error?: string | null
          magd_draft_queue_size?: number | null
          sanad_confidence_avg?: number | null
          sanad_escalation_rate?: number | null
          success_count?: number | null
          updated_at?: string | null
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
      commitments: {
        Row: {
          brain_entry_id: string | null
          commitment_text: string
          completed_at: string | null
          created_at: string | null
          due_date: string | null
          id: string
          notified_at: string | null
          parent_commitment_id: string | null
          priority: string | null
          recurrence_end_date: string | null
          recurrence_pattern: string | null
          reminder_sent_at: string | null
          resolved_at: string | null
          status: string | null
          user_id: string | null
        }
        Insert: {
          brain_entry_id?: string | null
          commitment_text: string
          completed_at?: string | null
          created_at?: string | null
          due_date?: string | null
          id?: string
          notified_at?: string | null
          parent_commitment_id?: string | null
          priority?: string | null
          recurrence_end_date?: string | null
          recurrence_pattern?: string | null
          reminder_sent_at?: string | null
          resolved_at?: string | null
          status?: string | null
          user_id?: string | null
        }
        Update: {
          brain_entry_id?: string | null
          commitment_text?: string
          completed_at?: string | null
          created_at?: string | null
          due_date?: string | null
          id?: string
          notified_at?: string | null
          parent_commitment_id?: string | null
          priority?: string | null
          recurrence_end_date?: string | null
          recurrence_pattern?: string | null
          reminder_sent_at?: string | null
          resolved_at?: string | null
          status?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "commitments_brain_entry_id_fkey"
            columns: ["brain_entry_id"]
            isOneToOne: false
            referencedRelation: "brain_entries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "commitments_parent_commitment_id_fkey"
            columns: ["parent_commitment_id"]
            isOneToOne: false
            referencedRelation: "commitments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "commitments_parent_commitment_id_fkey"
            columns: ["parent_commitment_id"]
            isOneToOne: false
            referencedRelation: "open_commitments_view"
            referencedColumns: ["id"]
          },
        ]
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
      dahab_settings: {
        Row: {
          key: string
          updated_at: string
          value: string | null
        }
        Insert: {
          key: string
          updated_at?: string
          value?: string | null
        }
        Update: {
          key?: string
          updated_at?: string
          value?: string | null
        }
        Relationships: []
      }
      git_listener: {
        Row: {
          error_count: number | null
          id: number
          last_commit_checked: string | null
          last_error: string | null
          last_error_at: string | null
          last_processed_at: string | null
          next_run_scheduled_for: string | null
          polling_interval_seconds: number | null
          success_count: number | null
          updated_at: string | null
        }
        Insert: {
          error_count?: number | null
          id?: number
          last_commit_checked?: string | null
          last_error?: string | null
          last_error_at?: string | null
          last_processed_at?: string | null
          next_run_scheduled_for?: string | null
          polling_interval_seconds?: number | null
          success_count?: number | null
          updated_at?: string | null
        }
        Update: {
          error_count?: number | null
          id?: number
          last_commit_checked?: string | null
          last_error?: string | null
          last_error_at?: string | null
          last_processed_at?: string | null
          next_run_scheduled_for?: string | null
          polling_interval_seconds?: number | null
          success_count?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      haris_incidents: {
        Row: {
          affected_service: string | null
          auto_resolved: boolean | null
          description: string | null
          duration_minutes: number | null
          id: number
          mttr_minutes: number | null
          resolved_at: string | null
          severity: string | null
          started_at: string | null
        }
        Insert: {
          affected_service?: string | null
          auto_resolved?: boolean | null
          description?: string | null
          duration_minutes?: number | null
          id?: number
          mttr_minutes?: number | null
          resolved_at?: string | null
          severity?: string | null
          started_at?: string | null
        }
        Update: {
          affected_service?: string | null
          auto_resolved?: boolean | null
          description?: string | null
          duration_minutes?: number | null
          id?: number
          mttr_minutes?: number | null
          resolved_at?: string | null
          severity?: string | null
          started_at?: string | null
        }
        Relationships: []
      }
      haris_metrics: {
        Row: {
          dahab_webhook_ok: boolean | null
          db_dahab_ok: boolean | null
          db_sanad_ok: boolean | null
          id: number
          n8n_errors_count: number | null
          n8n_up: boolean | null
          overall: string | null
          report: string | null
          sanad_webhook_ok: boolean | null
          sb_dahab_up: boolean | null
          sb_sanad_up: boolean | null
          threaddits_up: boolean | null
          ts: string | null
          vm_disk_pct: number | null
          vm_load: number | null
          vm_ram_pct: number | null
          vm_up: boolean | null
        }
        Insert: {
          dahab_webhook_ok?: boolean | null
          db_dahab_ok?: boolean | null
          db_sanad_ok?: boolean | null
          id?: number
          n8n_errors_count?: number | null
          n8n_up?: boolean | null
          overall?: string | null
          report?: string | null
          sanad_webhook_ok?: boolean | null
          sb_dahab_up?: boolean | null
          sb_sanad_up?: boolean | null
          threaddits_up?: boolean | null
          ts?: string | null
          vm_disk_pct?: number | null
          vm_load?: number | null
          vm_ram_pct?: number | null
          vm_up?: boolean | null
        }
        Update: {
          dahab_webhook_ok?: boolean | null
          db_dahab_ok?: boolean | null
          db_sanad_ok?: boolean | null
          id?: number
          n8n_errors_count?: number | null
          n8n_up?: boolean | null
          overall?: string | null
          report?: string | null
          sanad_webhook_ok?: boolean | null
          sb_dahab_up?: boolean | null
          sb_sanad_up?: boolean | null
          threaddits_up?: boolean | null
          ts?: string | null
          vm_disk_pct?: number | null
          vm_load?: number | null
          vm_ram_pct?: number | null
          vm_up?: boolean | null
        }
        Relationships: []
      }
      insight_deliveries: {
        Row: {
          content_hash: string
          delivered_at: string
          expires_at: string
          id: string
          insight_type: string
        }
        Insert: {
          content_hash: string
          delivered_at?: string
          expires_at: string
          id?: string
          insight_type: string
        }
        Update: {
          content_hash?: string
          delivered_at?: string
          expires_at?: string
          id?: string
          insight_type?: string
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
            referencedRelation: "n8n_products_view"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "keyword_performance_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      lead_drafts: {
        Row: {
          created_at: string
          draft_text: string
          id: string
          lead_id: string
          status: string
          user_id: string
        }
        Insert: {
          created_at?: string
          draft_text: string
          id?: string
          lead_id: string
          status?: string
          user_id: string
        }
        Update: {
          created_at?: string
          draft_text?: string
          id?: string
          lead_id?: string
          status?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "lead_drafts_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
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
      lead_outreach_log: {
        Row: {
          action: string
          created_at: string
          id: string
          lead_id: string
          user_id: string
        }
        Insert: {
          action: string
          created_at?: string
          id?: string
          lead_id: string
          user_id: string
        }
        Update: {
          action?: string
          created_at?: string
          id?: string
          lead_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "lead_outreach_log_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
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
      magd_content_calendar: {
        Row: {
          audience_signals_json: Json | null
          generated_at: string
          id: string
          plan_json: Json
          run_id: string
          status: string
          week_start: string
        }
        Insert: {
          audience_signals_json?: Json | null
          generated_at?: string
          id?: string
          plan_json: Json
          run_id: string
          status?: string
          week_start: string
        }
        Update: {
          audience_signals_json?: Json | null
          generated_at?: string
          id?: string
          plan_json?: Json
          run_id?: string
          status?: string
          week_start?: string
        }
        Relationships: []
      }
      magd_drafts: {
        Row: {
          calendar_slot_json: Json | null
          content_type: string | null
          created_at: string | null
          id: string
          linkedin_posted_at: string | null
          linkedin_text: string | null
          linkedin_url: string | null
          milestone: string | null
          status: string | null
          x_posted_at: string | null
          x_text: string | null
          x_url: string | null
        }
        Insert: {
          calendar_slot_json?: Json | null
          content_type?: string | null
          created_at?: string | null
          id: string
          linkedin_posted_at?: string | null
          linkedin_text?: string | null
          linkedin_url?: string | null
          milestone?: string | null
          status?: string | null
          x_posted_at?: string | null
          x_text?: string | null
          x_url?: string | null
        }
        Update: {
          calendar_slot_json?: Json | null
          content_type?: string | null
          created_at?: string | null
          id?: string
          linkedin_posted_at?: string | null
          linkedin_text?: string | null
          linkedin_url?: string | null
          milestone?: string | null
          status?: string | null
          x_posted_at?: string | null
          x_text?: string | null
          x_url?: string | null
        }
        Relationships: []
      }
      magd_posts: {
        Row: {
          approved_platform: string | null
          comments: number | null
          content_type: string | null
          created_at: string | null
          draft_id: string | null
          draft_linkedin: string | null
          draft_x_single: string | null
          draft_x_thread: string | null
          error_message: string | null
          final_text: string | null
          id: string
          impressions: number | null
          likes: number | null
          linkedin_post_id: string | null
          metrics_fetched_at: string | null
          platform: string | null
          post_url: string | null
          posted_at: string | null
          shares: number | null
          status: string | null
          topic: string | null
          trigger_context: string | null
          trigger_text: string | null
          x_post_id: string | null
        }
        Insert: {
          approved_platform?: string | null
          comments?: number | null
          content_type?: string | null
          created_at?: string | null
          draft_id?: string | null
          draft_linkedin?: string | null
          draft_x_single?: string | null
          draft_x_thread?: string | null
          error_message?: string | null
          final_text?: string | null
          id?: string
          impressions?: number | null
          likes?: number | null
          linkedin_post_id?: string | null
          metrics_fetched_at?: string | null
          platform?: string | null
          post_url?: string | null
          posted_at?: string | null
          shares?: number | null
          status?: string | null
          topic?: string | null
          trigger_context?: string | null
          trigger_text?: string | null
          x_post_id?: string | null
        }
        Update: {
          approved_platform?: string | null
          comments?: number | null
          content_type?: string | null
          created_at?: string | null
          draft_id?: string | null
          draft_linkedin?: string | null
          draft_x_single?: string | null
          draft_x_thread?: string | null
          error_message?: string | null
          final_text?: string | null
          id?: string
          impressions?: number | null
          likes?: number | null
          linkedin_post_id?: string | null
          metrics_fetched_at?: string | null
          platform?: string | null
          post_url?: string | null
          posted_at?: string | null
          shares?: number | null
          status?: string | null
          topic?: string | null
          trigger_context?: string | null
          trigger_text?: string | null
          x_post_id?: string | null
        }
        Relationships: []
      }
      magd_visitor_questions: {
        Row: {
          answer: string | null
          asked_at: string | null
          id: string
          question: string
          session_id: string | null
          visitor_ip_hash: string | null
          was_answered: boolean | null
        }
        Insert: {
          answer?: string | null
          asked_at?: string | null
          id?: string
          question: string
          session_id?: string | null
          visitor_ip_hash?: string | null
          was_answered?: boolean | null
        }
        Update: {
          answer?: string | null
          asked_at?: string | null
          id?: string
          question?: string
          session_id?: string | null
          visitor_ip_hash?: string | null
          was_answered?: boolean | null
        }
        Relationships: []
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
            referencedRelation: "n8n_products_view"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "product_learning_state_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: true
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      product_quality_events: {
        Row: {
          behavior_data: Json | null
          health_score: number | null
          id: string
          pipeline_data: Json | null
          product_id: string
          product_name: string
          recorded_at: string
          run_id: string
          service_up: boolean | null
          synthesis_data: Json | null
          top_issues: string[] | null
        }
        Insert: {
          behavior_data?: Json | null
          health_score?: number | null
          id?: string
          pipeline_data?: Json | null
          product_id: string
          product_name: string
          recorded_at?: string
          run_id: string
          service_up?: boolean | null
          synthesis_data?: Json | null
          top_issues?: string[] | null
        }
        Update: {
          behavior_data?: Json | null
          health_score?: number | null
          id?: string
          pipeline_data?: Json | null
          product_id?: string
          product_name?: string
          recorded_at?: string
          run_id?: string
          service_up?: boolean | null
          synthesis_data?: Json | null
          top_issues?: string[] | null
        }
        Relationships: []
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
            referencedRelation: "n8n_products_view"
            referencedColumns: ["product_id"]
          },
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
      reminders: {
        Row: {
          chat_id: number
          created_at: string
          id: number
          message: string
          remind_at: string
          sent: boolean
        }
        Insert: {
          chat_id?: number
          created_at?: string
          id?: number
          message: string
          remind_at: string
          sent?: boolean
        }
        Update: {
          chat_id?: number
          created_at?: string
          id?: number
          message?: string
          remind_at?: string
          sent?: boolean
        }
        Relationships: []
      }
      rizq_ideas: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          pain_score: number
          title: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          pain_score?: number
          title: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          pain_score?: number
          title?: string
        }
        Relationships: []
      }
      rizq_opportunity_scores: {
        Row: {
          break_even_weeks: number | null
          cac_estimate_usd: number | null
          distribution_channel: string | null
          id: string
          ltv_estimate_usd: number | null
          opportunity_id: string
          pain_intensity: number | null
          payback_months: number | null
          ranking: string | null
          ranking_rationale: string | null
          scored_at: string | null
          scoring_model: string | null
          speed_to_1k_weeks: number
          title: string
          wtp_dollars: number | null
          wtp_evidence: string | null
        }
        Insert: {
          break_even_weeks?: number | null
          cac_estimate_usd?: number | null
          distribution_channel?: string | null
          id?: string
          ltv_estimate_usd?: number | null
          opportunity_id: string
          pain_intensity?: number | null
          payback_months?: number | null
          ranking?: string | null
          ranking_rationale?: string | null
          scored_at?: string | null
          scoring_model?: string | null
          speed_to_1k_weeks: number
          title: string
          wtp_dollars?: number | null
          wtp_evidence?: string | null
        }
        Update: {
          break_even_weeks?: number | null
          cac_estimate_usd?: number | null
          distribution_channel?: string | null
          id?: string
          ltv_estimate_usd?: number | null
          opportunity_id?: string
          pain_intensity?: number | null
          payback_months?: number | null
          ranking?: string | null
          ranking_rationale?: string | null
          scored_at?: string | null
          scoring_model?: string | null
          speed_to_1k_weeks?: number
          title?: string
          wtp_dollars?: number | null
          wtp_evidence?: string | null
        }
        Relationships: []
      }
      rizq_v3_evidence: {
        Row: {
          created_at: string | null
          evidence_type: string
          id: string
          run_id: string
          signal_value: string | null
          snippet: string | null
          source_name: string | null
          source_url: string | null
          title: string | null
          worker_id: string
        }
        Insert: {
          created_at?: string | null
          evidence_type: string
          id?: string
          run_id: string
          signal_value?: string | null
          snippet?: string | null
          source_name?: string | null
          source_url?: string | null
          title?: string | null
          worker_id: string
        }
        Update: {
          created_at?: string | null
          evidence_type?: string
          id?: string
          run_id?: string
          signal_value?: string | null
          snippet?: string | null
          source_name?: string | null
          source_url?: string | null
          title?: string | null
          worker_id?: string
        }
        Relationships: []
      }
      rizq_v3_runs: {
        Row: {
          completed_at: string | null
          created_at: string | null
          error_message: string | null
          id: string
          idea_id: string
          idea_title: string
          started_at: string | null
          status: string
          triggered_by: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string | null
          error_message?: string | null
          id?: string
          idea_id: string
          idea_title: string
          started_at?: string | null
          status?: string
          triggered_by?: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string | null
          error_message?: string | null
          id?: string
          idea_id?: string
          idea_title?: string
          started_at?: string | null
          status?: string
          triggered_by?: string
        }
        Relationships: []
      }
      rizq_v3_synthesis: {
        Row: {
          automation_score: number | null
          build_estimate_days: number | null
          build_score: number | null
          competitor_prices: Json | null
          composite_score: number | null
          created_at: string | null
          customers_needed: number | null
          demand_score: number | null
          distribution_score: number | null
          estimated_conv_rate_pct: number | null
          gap_description: string | null
          gap_score: number | null
          id: string
          idea_id: string
          idea_title: string
          leads_needed: number | null
          payment_score: number | null
          ranking: string
          ranking_rationale: string | null
          recommended_price_usd: number | null
          run_id: string
          telegram_brief_html: string | null
          top_channels: Json | null
          top_reddit_posts: Json | null
          weeks_to_1k: number | null
        }
        Insert: {
          automation_score?: number | null
          build_estimate_days?: number | null
          build_score?: number | null
          competitor_prices?: Json | null
          composite_score?: number | null
          created_at?: string | null
          customers_needed?: number | null
          demand_score?: number | null
          distribution_score?: number | null
          estimated_conv_rate_pct?: number | null
          gap_description?: string | null
          gap_score?: number | null
          id?: string
          idea_id: string
          idea_title: string
          leads_needed?: number | null
          payment_score?: number | null
          ranking?: string
          ranking_rationale?: string | null
          recommended_price_usd?: number | null
          run_id: string
          telegram_brief_html?: string | null
          top_channels?: Json | null
          top_reddit_posts?: Json | null
          weeks_to_1k?: number | null
        }
        Update: {
          automation_score?: number | null
          build_estimate_days?: number | null
          build_score?: number | null
          competitor_prices?: Json | null
          composite_score?: number | null
          created_at?: string | null
          customers_needed?: number | null
          demand_score?: number | null
          distribution_score?: number | null
          estimated_conv_rate_pct?: number | null
          gap_description?: string | null
          gap_score?: number | null
          id?: string
          idea_id?: string
          idea_title?: string
          leads_needed?: number | null
          payment_score?: number | null
          ranking?: string
          ranking_rationale?: string | null
          recommended_price_usd?: number | null
          run_id?: string
          telegram_brief_html?: string | null
          top_channels?: Json | null
          top_reddit_posts?: Json | null
          weeks_to_1k?: number | null
        }
        Relationships: []
      }
      rizq_v3_worker_outputs: {
        Row: {
          created_at: string | null
          duration_ms: number | null
          error_message: string | null
          id: string
          output_json: Json | null
          run_id: string
          status: string
          worker_id: string
        }
        Insert: {
          created_at?: string | null
          duration_ms?: number | null
          error_message?: string | null
          id?: string
          output_json?: Json | null
          run_id: string
          status?: string
          worker_id: string
        }
        Update: {
          created_at?: string | null
          duration_ms?: number | null
          error_message?: string | null
          id?: string
          output_json?: Json | null
          run_id?: string
          status?: string
          worker_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "rizq_v3_worker_outputs_run_id_fkey"
            columns: ["run_id"]
            isOneToOne: false
            referencedRelation: "rizq_v3_runs"
            referencedColumns: ["id"]
          },
        ]
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
      task_patterns: {
        Row: {
          average_duration_hours: number | null
          category: string | null
          created_at: string | null
          frequency: number | null
          id: number
          last_observed_at: string | null
          metadata: Json | null
          pattern_type: string
          updated_at: string | null
        }
        Insert: {
          average_duration_hours?: number | null
          category?: string | null
          created_at?: string | null
          frequency?: number | null
          id?: number
          last_observed_at?: string | null
          metadata?: Json | null
          pattern_type: string
          updated_at?: string | null
        }
        Update: {
          average_duration_hours?: number | null
          category?: string | null
          created_at?: string | null
          frequency?: number | null
          id?: number
          last_observed_at?: string | null
          metadata?: Json | null
          pattern_type?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      task_updates: {
        Row: {
          commit_hash: string | null
          commit_message: string | null
          files_changed: string[] | null
          id: number
          metadata: Json | null
          reason: string | null
          recorded_at: string | null
          status_after: string
          status_before: string
          task_id: number
        }
        Insert: {
          commit_hash?: string | null
          commit_message?: string | null
          files_changed?: string[] | null
          id?: number
          metadata?: Json | null
          reason?: string | null
          recorded_at?: string | null
          status_after: string
          status_before: string
          task_id: number
        }
        Update: {
          commit_hash?: string | null
          commit_message?: string | null
          files_changed?: string[] | null
          id?: number
          metadata?: Json | null
          reason?: string | null
          recorded_at?: string | null
          status_after?: string
          status_before?: string
          task_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "task_updates_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "tasks"
            referencedColumns: ["id"]
          },
        ]
      }
      tasks: {
        Row: {
          category: string | null
          completed_at: string | null
          created_at: string | null
          id: number
          last_commit_hash: string | null
          name: string
          notes: string | null
          req_id: string | null
          status: string
          updated_at: string | null
        }
        Insert: {
          category?: string | null
          completed_at?: string | null
          created_at?: string | null
          id?: number
          last_commit_hash?: string | null
          name: string
          notes?: string | null
          req_id?: string | null
          status?: string
          updated_at?: string | null
        }
        Update: {
          category?: string | null
          completed_at?: string | null
          created_at?: string | null
          id?: number
          last_commit_hash?: string | null
          name?: string
          notes?: string | null
          req_id?: string | null
          status?: string
          updated_at?: string | null
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
          telegram_chat_id: string | null
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
          telegram_chat_id?: string | null
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
          telegram_chat_id?: string | null
          updated_at?: string | null
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
      n8n_products_view: {
        Row: {
          business_type: string | null
          keywords: Json | null
          last_run_at: string | null
          product_category: string | null
          product_description: string | null
          product_id: string | null
          product_name: string | null
          subreddits: string[] | null
          user_email: string | null
          user_id: string | null
        }
        Insert: {
          business_type?: string | null
          keywords?: Json | null
          last_run_at?: string | null
          product_category?: string | null
          product_description?: string | null
          product_id?: string | null
          product_name?: string | null
          subreddits?: string[] | null
          user_email?: never
          user_id?: string | null
        }
        Update: {
          business_type?: string | null
          keywords?: Json | null
          last_run_at?: string | null
          product_category?: string | null
          product_description?: string | null
          product_id?: string | null
          product_name?: string | null
          subreddits?: string[] | null
          user_email?: never
          user_id?: string | null
        }
        Relationships: []
      }
      open_commitments_view: {
        Row: {
          brain_entry_id: string | null
          commitment_text: string | null
          created_at: string | null
          due_date: string | null
          id: string | null
          message_date: string | null
          priority: string | null
          reminder_sent_at: string | null
          resolved_at: string | null
          source_message: string | null
          status: string | null
          urgency: string | null
          user_id: string | null
        }
        Relationships: [
          {
            foreignKeyName: "commitments_brain_entry_id_fkey"
            columns: ["brain_entry_id"]
            isOneToOne: false
            referencedRelation: "brain_entries"
            referencedColumns: ["id"]
          },
        ]
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
      delete_brain_entry: {
        Args: { p_entry_id: string; p_user_id?: string }
        Returns: Json
      }
      edit_brain_entry: {
        Args: { p_entry_id: string; p_new_content: string; p_user_id?: string }
        Returns: Json
      }
      fn_batch_upsert_entities: {
        Args: { p_entities: Json }
        Returns: undefined
      }
      fn_delete_processed_messages: {
        Args: { p_ids: string[] }
        Returns: number
      }
      fn_increment_access_count: {
        Args: { p_entry_ids: string[] }
        Returns: undefined
      }
      fn_queue_message: {
        Args: { p_chat_id: string; p_message: Json }
        Returns: Json
      }
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
      get_brain_entries_in_range: {
        Args: { p_end_date: string; p_limit?: number; p_start_date: string }
        Returns: {
          content: string
          created_at: string
          entry_type: string
          id: string
          metadata: Json
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
          match_count?: number
          p_boost_importance?: boolean
          p_end_date?: string
          p_entry_type?: string
          p_start_date?: string
          p_user_id?: string
          query_embedding: string
          similarity_threshold?: number
        }
        Returns: {
          access_count: number
          bot_response: string
          content: string
          created_at: string
          entities: Json
          entry_type: string
          final_score: number
          id: string
          importance_score: number
          metadata: Json
          related_ids: string[]
          similarity: number
          source: string
          tags: string[]
          title: string
          user_message: string
        }[]
      }
      match_brain_entries_v3: {
        Args: {
          match_count?: number
          p_user_id?: string
          query_embedding: string
          query_text: string
          similarity_threshold?: number
        }
        Returns: {
          access_count: number
          bot_response: string
          content: string
          created_at: string
          entry_type: string
          final_score: number
          id: string
          importance_score: number
          match_method: string
          user_message: string
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
      search_brain_entries_by_keyword: {
        Args: { p_keyword: string; p_limit?: number; p_user_id?: string }
        Returns: {
          content: string
          created_at: string
          entry_type: string
          id: string
        }[]
      }
      search_brain_entries_text: {
        Args: { p_limit?: number; p_query: string }
        Returns: {
          content: string
          created_at: string
          entry_type: string
          id: string
          metadata: Json
        }[]
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
      show_limit: { Args: never; Returns: number }
      show_trgm: { Args: { "": string }; Returns: string[] }
      update_circuit_breaker: {
        Args: { p_api_name: string; p_success: boolean }
        Returns: undefined
      }
      update_subreddit_performance: {
        Args: { target_product_id: string }
        Returns: undefined
      }
      upsert_brain_entity: {
        Args: { p_aliases?: string[]; p_name: string; p_type: string }
        Returns: string
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
