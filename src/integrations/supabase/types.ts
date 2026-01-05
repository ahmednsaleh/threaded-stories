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
      keyword_performance: {
        Row: {
          conversion_rate: number
          id: string
          impressions: number
          keyword: string
          last_success_at: string | null
          leads_found: number
          product_id: string | null
          status: string
        }
        Insert: {
          conversion_rate?: number
          id?: string
          impressions?: number
          keyword: string
          last_success_at?: string | null
          leads_found?: number
          product_id?: string | null
          status?: string
        }
        Update: {
          conversion_rate?: number
          id?: string
          impressions?: number
          keyword?: string
          last_success_at?: string | null
          leads_found?: number
          product_id?: string | null
          status?: string
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
          created_at: string | null
          feedback_category: string | null
          feedback_text: string | null
          id: string
          lead_id: string
          product_id: string
          rating: number
          user_id: string
        }
        Insert: {
          created_at?: string | null
          feedback_category?: string | null
          feedback_text?: string | null
          id?: string
          lead_id: string
          product_id: string
          rating: number
          user_id: string
        }
        Update: {
          created_at?: string | null
          feedback_category?: string | null
          feedback_text?: string | null
          id?: string
          lead_id?: string
          product_id?: string
          rating?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "lead_feedback_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lead_feedback_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      leads: {
        Row: {
          author: string
          buying_stage_detail: string | null
          competitive_context_detail: string | null
          competitors_mentioned: string | null
          created_at: string | null
          created_utc: string | null
          id: string
          intent_score: number
          is_problem_focused: boolean | null
          is_solution_seeking: boolean | null
          objection_barrier: string | null
          post_content: string
          post_title: string
          post_url: string
          problem_statement_detail: string | null
          product_id: string | null
          relevance_summary: string | null
          sentiment: string | null
          source_subreddit: string
          status: string
          suggested_reply_hook: string | null
          updated_at: string | null
          urgency_signals_detail: string | null
          user_feedback: string | null
          user_goal: string | null
          user_id: string
        }
        Insert: {
          author: string
          buying_stage_detail?: string | null
          competitive_context_detail?: string | null
          competitors_mentioned?: string | null
          created_at?: string | null
          created_utc?: string | null
          id?: string
          intent_score: number
          is_problem_focused?: boolean | null
          is_solution_seeking?: boolean | null
          objection_barrier?: string | null
          post_content: string
          post_title: string
          post_url: string
          problem_statement_detail?: string | null
          product_id?: string | null
          relevance_summary?: string | null
          sentiment?: string | null
          source_subreddit: string
          status?: string
          suggested_reply_hook?: string | null
          updated_at?: string | null
          urgency_signals_detail?: string | null
          user_feedback?: string | null
          user_goal?: string | null
          user_id: string
        }
        Update: {
          author?: string
          buying_stage_detail?: string | null
          competitive_context_detail?: string | null
          competitors_mentioned?: string | null
          created_at?: string | null
          created_utc?: string | null
          id?: string
          intent_score?: number
          is_problem_focused?: boolean | null
          is_solution_seeking?: boolean | null
          objection_barrier?: string | null
          post_content?: string
          post_title?: string
          post_url?: string
          problem_statement_detail?: string | null
          product_id?: string | null
          relevance_summary?: string | null
          sentiment?: string | null
          source_subreddit?: string
          status?: string
          suggested_reply_hook?: string | null
          updated_at?: string | null
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
      rejection_patterns: {
        Row: {
          confidence: number | null
          created_at: string | null
          embedding: string | null
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
          embedding?: string | null
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
          embedding?: string | null
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
          embedding: unknown
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
          embedding?: unknown
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
          embedding?: unknown
          engagement_ratio?: number | null
          id?: never
          last_active_utc?: string | null
          name?: string
          subscribers?: number | null
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
      [_ in never]: never
    }
    Functions: {
      current_auth_uid: { Args: never; Returns: string }
      generate_optimal_keywords: {
        Args: { p_product_id: string }
        Returns: Json
      }
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
      get_optimal_subreddits_by_category: {
        Args: {
          p_business_type: string
          p_category: string
          p_product_name?: string
        }
        Returns: string[]
      }
      get_subreddit_stats: {
        Args: { query_embedding: string }
        Returns: {
          avg_commercial_score: number
          avg_similarity: number
          tier_1_count: number
          tier_2_count: number
          tier_3_count: number
          total_matching: number
        }[]
      }
      get_weekly_high_intent_leads_count: {
        Args: { p_product_id: string; p_user_id: string }
        Returns: number
      }
      is_product_owner: { Args: { prod_uuid: string }; Returns: boolean }
      match_rejection_patterns: {
        Args: {
          match_count: number
          match_threshold: number
          query_embedding: string
          target_product_id: string
        }
        Returns: {
          id: string
          post_content: string
          rejection_reason: Database["public"]["Enums"]["rejection_reason"]
          similarity: number
        }[]
      }
      match_subreddits_commercial: {
        Args: {
          is_b2b: boolean
          match_count: number
          match_threshold: number
          min_commercial_score: number
          query_embedding: string
        }
        Returns: {
          avg_daily_comments: number
          avg_daily_posts: number
          commercial_score: number
          community_type: string
          description: string
          id: number
          last_active_utc: string
          name: string
          similarity: number
          subscribers: number
        }[]
      }
      match_subreddits_sprint: {
        Args: {
          match_count: number
          match_threshold: number
          min_commercial_score: number
          query_embedding: string
        }
        Returns: {
          avg_daily_comments: number
          avg_daily_posts: number
          commercial_score: number
          community_type: string
          description: string
          id: number
          last_active_utc: string
          match_tier: string
          name: string
          similarity: number
          subscribers: number
        }[]
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
