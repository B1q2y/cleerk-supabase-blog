"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { fetchUserProfile } from "@/lib/fetch-profile";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default function EditProfilePage() {
  const { user, isSignedIn } = useUser();
  const router = useRouter();
  const [nickname, setNickname] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      if (!isSignedIn || !user) return;
      const profile = await fetchUserProfile(user.id);
      if (profile?.nickname) setNickname(profile.nickname);
    };
    loadProfile();
  }, [user, isSignedIn]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSaving(true);
    await supabase.from("profiles").update({ nickname }).eq("id", user.id);
    setSaving(false);
    router.push("/profile");
  };

  if (!isSignedIn || !user) return null;

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-3xl p-8 max-w-lg w-full"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">
          プロフィール編集
        </h1>

        <label className="block mb-2 text-sm font-medium text-gray-700">
          ニックネーム
        </label>
        <input
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          className="w-full border border-gray-300 rounded px-4 py-2 mb-4"
          placeholder="例: user name"
        />

        <button
          type="submit"
          disabled={saving}
          className="w-full bg-blue-600 text-white py-2 rounded-full hover:bg-blue-700 transition disabled:opacity-50"
        >
          {saving ? "保存中..." : "保存する"}
        </button>

        <div className="mt-6 text-center">
          <Link
            href="/profile"
            className="text-sm text-gray-600 hover:underline"
          >
            プロフィールに戻る
          </Link>
        </div>
      </form>
    </main>
  );
}
