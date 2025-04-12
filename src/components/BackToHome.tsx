"use client";

import Link from "next/link";
import { Home } from "lucide-react";

export default function BackToHome() {
  return (
    <div className="mt-8 text-center">
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gray-200 text-gray-800 hover:bg-gray-300 transition"
      >
        <Home size={18} />
        ホームに戻る
      </Link>
    </div>
  );
}
