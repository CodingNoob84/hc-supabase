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
          codename: string | null
          created_at: string
          display_name: string | null
          email: string | null
          id: string
          level: string | null
          moto: string | null
          teamdescription: string | null
          teamname: string | null
        }
        Insert: {
          avatar_url?: string | null
          codename?: string | null
          created_at?: string
          display_name?: string | null
          email?: string | null
          id?: string
          level?: string | null
          moto?: string | null
          teamdescription?: string | null
          teamname?: string | null
        }
        Update: {
          avatar_url?: string | null
          codename?: string | null
          created_at?: string
          display_name?: string | null
          email?: string | null
          id?: string
          level?: string | null
          moto?: string | null
          teamdescription?: string | null
          teamname?: string | null
        }
        Relationships: []
      }
      matches: {
        Row: {
          batting_first: string | null
          batting_id: string | null
          batting_second: string | null
          bot_id: string | null
          created_at: string | null
          current_ball: number | null
          forfeit_id: string | null
          id: string
          innings: number | null
          is_completed: boolean | null
          is_innings_over: boolean | null
          is_timer: boolean
          isdraw: boolean | null
          isforfeit: boolean | null
          isstarted: boolean | null
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
          batting_first?: string | null
          batting_id?: string | null
          batting_second?: string | null
          bot_id?: string | null
          created_at?: string | null
          current_ball?: number | null
          forfeit_id?: string | null
          id?: string
          innings?: number | null
          is_completed?: boolean | null
          is_innings_over?: boolean | null
          is_timer?: boolean
          isdraw?: boolean | null
          isforfeit?: boolean | null
          isstarted?: boolean | null
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
          batting_first?: string | null
          batting_id?: string | null
          batting_second?: string | null
          bot_id?: string | null
          created_at?: string | null
          current_ball?: number | null
          forfeit_id?: string | null
          id?: string
          innings?: number | null
          is_completed?: boolean | null
          is_innings_over?: boolean | null
          is_timer?: boolean
          isdraw?: boolean | null
          isforfeit?: boolean | null
          isstarted?: boolean | null
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
      usereachball: {
        Row: {
          ball: number
          battingid: string | null
          battingnumber: number | null
          bowlingnumber: number | null
          created_at: string
          id: string
          inningsended: boolean | null
          matchid: string
          result: string | null
          toss: boolean | null
          updated_at: string
        }
        Insert: {
          ball: number
          battingid?: string | null
          battingnumber?: number | null
          bowlingnumber?: number | null
          created_at?: string
          id?: string
          inningsended?: boolean | null
          matchid: string
          result?: string | null
          toss?: boolean | null
          updated_at?: string
        }
        Update: {
          ball?: number
          battingid?: string | null
          battingnumber?: number | null
          bowlingnumber?: number | null
          created_at?: string
          id?: string
          inningsended?: boolean | null
          matchid?: string
          result?: string | null
          toss?: boolean | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "usereachball_battingid_fkey"
            columns: ["battingid"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "usereachball_matchid_fkey"
            columns: ["matchid"]
            isOneToOne: false
            referencedRelation: "matches"
            referencedColumns: ["id"]
          },
        ]
      }
      userpresence: {
        Row: {
          isplaying: boolean | null
          last_seen: string
          status: string
          userid: string
        }
        Insert: {
          isplaying?: boolean | null
          last_seen?: string
          status?: string
          userid: string
        }
        Update: {
          isplaying?: boolean | null
          last_seen?: string
          status?: string
          userid?: string
        }
        Relationships: [
          {
            foreignKeyName: "userpresence_userid_fkey"
            columns: ["userid"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      userrequest: {
        Row: {
          created_at: string
          gamemode: string | null
          id: string
          matchid: string | null
          receiverid: string | null
          senderid: string | null
          status_req: string
          updated_at: string
          userone: string | null
          usertwo: string | null
        }
        Insert: {
          created_at?: string
          gamemode?: string | null
          id?: string
          matchid?: string | null
          receiverid?: string | null
          senderid?: string | null
          status_req?: string
          updated_at?: string
          userone?: string | null
          usertwo?: string | null
        }
        Update: {
          created_at?: string
          gamemode?: string | null
          id?: string
          matchid?: string | null
          receiverid?: string | null
          senderid?: string | null
          status_req?: string
          updated_at?: string
          userone?: string | null
          usertwo?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "userrequest_matchid_fkey"
            columns: ["matchid"]
            isOneToOne: false
            referencedRelation: "matches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "userrequest_receiverid_fkey"
            columns: ["receiverid"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "userrequest_senderid_fkey"
            columns: ["senderid"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "userrequest_userone_fkey"
            columns: ["userone"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "userrequest_usertwo_fkey"
            columns: ["usertwo"]
            isOneToOne: false
            referencedRelation: "users"
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
          fcmtoken: string | null
          id: string
          last_seen: string | null
          role: string | null
          status: string | null
          teamdescription: string | null
          teamname: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          display_name?: string | null
          email?: string | null
          fcmtoken?: string | null
          id?: string
          last_seen?: string | null
          role?: string | null
          status?: string | null
          teamdescription?: string | null
          teamname?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          display_name?: string | null
          email?: string | null
          fcmtoken?: string | null
          id?: string
          last_seen?: string | null
          role?: string | null
          status?: string | null
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
      botmatchinit: {
        Args: {
          user_id: string
          bot_id: string
          max_wickets: number
          max_overs: number
        }
        Returns: Json
      }
      cleanup_balldata: {
        Args: {
          match_type: string
          match_id: string
        }
        Returns: undefined
      }
      get_all_matches_by_userid: {
        Args: {
          userid: string
        }
        Returns: {
          id: string
          winner: string
          result: string
          result_by: string
          type: string
          user_one: Json
          user_two: Json
        }[]
      }
      get_all_users_match_stats: {
        Args: {
          top: number
          minimummatches: number
        }
        Returns: {
          user_id: string
          display_name: string
          avatar_url: string
          matches_played: number
          matches_won: number
          matches_lost: number
          winning_percentage: number
        }[]
      }
      get_match_details_by_matchid: {
        Args: {
          matchid: string
        }
        Returns: {
          id: string
          winner: string
          result: string
          result_by: string
          type: string
          bat_first: Json
          bat_second: Json
        }[]
      }
      get_user_matches: {
        Args: {
          userid: string
        }
        Returns: {
          id: string
          winner: string
          result: string
          result_by: string
          type: string
          battingfirst: Json
          battingsecond: Json
        }[]
      }
      get_users_with_requests: {
        Args: {
          my_user_id: string
        }
        Returns: {
          user_id: string
          display_name: string
          avatar_url: string
          email: string
          teamname: string
          presence_status: string
          last_seen: string
          matchid: string
          req_id: string
          req_status: string
          gamemode: string
        }[]
      }
      getallmatches_byuserid: {
        Args: {
          userid: string
        }
        Returns: {
          id: string
          winner: string
          result: string
          result_by: string
          type: string
          user_one: Json
          user_two: Json
        }[]
      }
      getmatchdata: {
        Args: {
          match_id: string
        }
        Returns: Json
      }
      getuserstats: {
        Args: {
          userid: string
        }
        Returns: {
          display_name: string
          email: string
          avatar_url: string
          matches_played: number
          matches_won: number
          matches_lost: number
        }[]
      }
      handlebotscore: {
        Args: {
          p_matchid: string
          p_userid: string
          p_ball: number
          p_mynumber: number
          p_botnumber: number
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
      handleuserscore: {
        Args: {
          p_matchid: string
          p_userid: string
          p_ball: number
          p_number: number
        }
        Returns: Json
      }
      init_usermatch: {
        Args: {
          userone: string
          usertwo: string
          gamemode: string
          is_timer: boolean
        }
        Returns: {
          match_id: string
          inserted_at: string
        }[]
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
      switchuserinnings: {
        Args: {
          p_matchid: string
        }
        Returns: Json
      }
      update_user_status: {
        Args: {
          _userid: string
          _status: string
        }
        Returns: undefined
      }
      updatescore: {
        Args: {
          p_matchid: string
          p_runs: number
          p_wickets: number
        }
        Returns: undefined
      }
      updatetoss: {
        Args: {
          match_id: string
          toss_selection: string
        }
        Returns: Json
      }
      upsertreqstatus: {
        Args: {
          myid: string
          friendid: string
          reqstatus: string
          reqgamemode: string
        }
        Returns: {
          operation: string
          id: string
          status_req: string
          gamemode: string
          matchid: string
        }[]
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
