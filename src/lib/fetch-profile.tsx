import { supabase } from "./supabase";

export async function fetchUserProfile(id: string) {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("プロフィール取得エラー:", error.message);
    return null;
  }

  return data;
}
