export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      dictionaries: {
        Row: {
          categories: string;
          created_at: string | null;
          file_name: string;
          id: number;
          user_id: string;
          username: string;
          status: string;
        };
        Insert: {
          categories: string[];
          created_at?: string | null;
          file_name: string;
          id?: number;
          user_id: string;
          username: string;
          status: string;
        };
        Update: {
          categories?: string[];
          created_at?: string | null;
          file_name?: string;
          id?: number;
          user_id?: string;
          username?: string;
          status: string;
        };
      };
      users: {
        Row: {
          created_at: string | null;
          dictionaries: number[] | null;
          id: number;
          score: number | null;
          user_id: string;
          username: string;
        };
        Insert: {
          created_at?: string | null;
          dictionaries?: number[] | null;
          id?: number;
          score?: number | null;
          user_id: string;
          username: string;
        };
        Update: {
          created_at?: string | null;
          dictionaries?: number[] | null;
          id?: number;
          score?: number | null;
          user_id?: string;
          username?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
