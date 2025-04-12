"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { fetchUserProfile } from "@/lib/fetch-profile";
import Link from "next/link";
import { Newspaper, User } from "lucide-react";
import { format } from "date-fns";
import Image from "next/image";

export default function HomePage() {
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
    const handleUser = async () => {
      if (isSignedIn && user) {
        const profile = await fetchUserProfile(user.id);
        setProfile(profile);
      } else if (!isSignedIn) {
        router.push("/signin");
      }
    };
    handleUser();
  }, [isSignedIn, user, router]);

  if (!isSignedIn || !profile) return null;

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 flex flex-col items-center justify-center p-6">
      <div className="bg-white shadow-xl rounded-3xl p-8 max-w-xl w-full text-center">
        <Image
          src={profile.avatar_url}
          alt="user avatar"
          width={96}
          height={96}
          className="rounded-full mx-auto shadow-lg border-2 border-white -mt-16"
        />
        <h1 className="text-3xl font-extrabold mt-6 tracking-tight">
          ようこそ、{profile.nickname || profile.username} さん！
        </h1>
        <p className="text-gray-500 mt-2 text-sm">
          最終ログイン:{" "}
          {profile.last_login_at
            ? format(new Date(profile.last_login_at), "yyyy/MM/dd HH:mm")
            : "未取得"}
        </p>

        <div className="mt-8 space-y-4">
          <Link
            href="/profile"
            className="w-full inline-flex justify-center items-center gap-2 bg-gray-600 text-white py-2 rounded-full hover:bg-gray-700 transition shadow"
          >
            <User size={18} /> プロフィールの確認
          </Link>

          <Link
            href="/news/page/1"
            className="w-full inline-flex justify-center items-center gap-2 bg-blue-600 text-white py-2 rounded-full hover:bg-blue-700 transition shadow"
          >
            <Newspaper size={18} /> 記事一覧へ
          </Link>
        </div>
      </div>
    </main>
  );
}
