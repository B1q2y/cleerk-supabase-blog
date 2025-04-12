import { supabase } from "./supabase";
import { UserResource } from "@clerk/types";

export async function registerUserIfNeeded(user: UserResource) {
  if (!user) return;

  const id = user.id;
  const username =
    user.username || user.primaryEmailAddress?.emailAddress || "no-name";
  const avatar_url = user.imageUrl;

  const { error } = await supabase.from("profiles").upsert({
    id,
    username,
    avatar_url,
  });

  if (error) {
    console.error("ユーザー登録エラー:", error.message);
  } else {
    console.log("ユーザー登録成功:", id);
  }
}
