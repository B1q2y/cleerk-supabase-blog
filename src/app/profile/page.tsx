"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { fetchUserProfile } from "@/lib/fetch-profile";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { format } from "date-fns";

export default function ProfilePage() {
  const { user, isSignedIn } = useUser();
  const router = useRouter();
  const [profile, setProfile] = useState<{
    id: string;
    username: string;
    avatar_url: string;
    created_at: string;
    updated_at?: string;
    last_login_at?: string;
    nickname?: string;
  } | null>(null);

  useEffect(() => {
    const load = async () => {
      if (!isSignedIn || !user) return router.push("/signin");
      const profile = await fetchUserProfile(user.id);
      setProfile(profile);
    };
    load();
  }, [isSignedIn, user, router]);

  if (!isSignedIn || !profile) return null;

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-xl rounded-3xl p-8 max-w-xl w-full text-center">
        <img
          src={profile.avatar_url}
          alt="user avatar"
          className="w-24 h-24 rounded-full mx-auto shadow-md border border-white"
        />
        <h1 className="text-2xl font-bold mt-4">
          {profile.nickname || profile.username} さん
        </h1>

        <div className="mt-4 space-y-1 text-sm text-gray-500">
          <p>登録日: {format(new Date(profile.created_at), "yyyy/MM/dd")}</p>
          <p>
            最終更新:{" "}
            {profile.updated_at
              ? format(new Date(profile.updated_at), "yyyy/MM/dd HH:mm")
              : "未取得"}
          </p>
          <p>
            最終ログイン:{" "}
            {profile.last_login_at
              ? format(new Date(profile.last_login_at), "yyyy/MM/dd HH:mm")
              : "未取得"}
          </p>
        </div>

        <div className="mt-6 space-y-3">
          <Link
            href="/profile/edit"
            className="inline-flex items-center gap-2 text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-full transition"
          >
            プロフィールを編集
          </Link>

          <Link
            href="/"
            className="block text-sm text-gray-600 hover:underline"
          >
            ホームに戻る
          </Link>
        </div>
      </div>
    </main>
  );
}
