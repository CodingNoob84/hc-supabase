export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      bots: {
        Row: {
          avatar_url: string | null
          created_at: string
          display_name: string | null
          id: string
          teamdescription: string | null
          teamname: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          display_name?: string | null
          id?: string
          teamdescription?: string | null
          teamname?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          display_name?: string | null
          id?: string
          teamdescription?: string | null
          teamname?: string | null
        }
        Relationships: []
      }
      matches: {
        Row: {
          batting_id: string | null
          bot_id: string | null
          created_at: string | null
          current_ball: number | null
          id: string
          innings: number | null
          is_completed: boolean | null
          is_innings_over: boolean | null
          is_timer: boolean
          max_overs: number
          max_wickets: number
          result: string | null
          result_by: string | null
          targetscore: number | null
          toss_choice: string | null
          toss_winner: string | null
          type: string
          updated_at: string | null
          user_one: string | null
          user_two: string | null
          winner: string | null
        }
        Insert: {
          batting_id?: string | null
          bot_id?: string | null
          created_at?: string | null
          current_ball?: number | null
          id?: string
          innings?: number | null
          is_completed?: boolean | null
          is_innings_over?: boolean | null
          is_timer?: boolean
          max_overs: number
          max_wickets: number
          result?: string | null
          result_by?: string | null
          targetscore?: number | null
          toss_choice?: string | null
          toss_winner?: string | null
          type: string
          updated_at?: string | null
          user_one?: string | null
          user_two?: string | null
          winner?: string | null
        }
        Update: {
          batting_id?: string | null
          bot_id?: string | null
          created_at?: string | null
          current_ball?: number | null
          id?: string
          innings?: number | null
          is_completed?: boolean | null
          is_innings_over?: boolean | null
          is_timer?: boolean
          max_overs?: number
          max_wickets?: number
          result?: string | null
          result_by?: string | null
          targetscore?: number | null
          toss_choice?: string | null
          toss_winner?: string | null
          type?: string
          updated_at?: string | null
          user_one?: string | null
          user_two?: string | null
          winner?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "matches_bot_id_fkey"
            columns: ["bot_id"]
            isOneToOne: false
            referencedRelation: "bots"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "matches_user_one_fkey1"
            columns: ["user_one"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "matches_user_two_fkey"
            columns: ["user_two"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      reviews: {
        Row: {
          created_at: string
          description: string | null
          id: number
          rating: number | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: number
          rating?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: number
          rating?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reviews_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      runperball: {
        Row: {
          ball: number
          battingnumber: number | null
          bowlingnumber: number | null
          created_at: string | null
          id: string
          match_id: string
          result: string | null
          updated_at: string | null
        }
        Insert: {
          ball: number
          battingnumber?: number | null
          bowlingnumber?: number | null
          created_at?: string | null
          id?: string
          match_id: string
          result?: string | null
          updated_at?: string | null
        }
        Update: {
          ball?: number
          battingnumber?: number | null
          bowlingnumber?: number | null
          created_at?: string | null
          id?: string
          match_id?: string
          result?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "runperball_match_id_fkey"
            columns: ["match_id"]
            isOneToOne: false
            referencedRelation: "matches"
            referencedColumns: ["id"]
          },
        ]
      }
      scorepermatch: {
        Row: {
          created_at: string
          id: string
          matchid: string | null
          team_id: string | null
          totalballs: number | null
          totalruns: number | null
          totalwickets: number | null
        }
        Insert: {
          created_at?: string
          id?: string
          matchid?: string | null
          team_id?: string | null
          totalballs?: number | null
          totalruns?: number | null
          totalwickets?: number | null
        }
        Update: {
          created_at?: string
          id?: string
          matchid?: string | null
          team_id?: string | null
          totalballs?: number | null
          totalruns?: number | null
          totalwickets?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "scorepermatch_matchid_fkey"
            columns: ["matchid"]
            isOneToOne: false
            referencedRelation: "matches"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          display_name: string | null
          email: string | null
          id: string
          role: string | null
          teamdescription: string | null
          teamname: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          display_name?: string | null
          email?: string | null
          id?: string
          role?: string | null
          teamdescription?: string | null
          teamname?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          display_name?: string | null
          email?: string | null
          id?: string
          role?: string | null
          teamdescription?: string | null
          teamname?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      autogenerate_toss: {
        Args: {
          match_id: string
        }
        Returns: Json
      }
      getmatchdata: {
        Args: {
          match_id: string
        }
        Returns: Json
      }
      handlescore: {
        Args: {
          p_matchid: string
          p_userid: string
          p_ball: number
          p_number: number
        }
        Returns: Json
      }
      matchinit: {
        Args: {
          user_one: string
          opponent_id: string
          type: string
          max_overs?: number
          max_wickets?: number
          is_timer?: boolean
        }
        Returns: Json
      }
      switchinnings: {
        Args: {
          p_matchid: string
        }
        Returns: Json
      }
      updatescore: {
        Args: {
          p_matchid: string
          p_runs: number
          p_wickets: number
        }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
