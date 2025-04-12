"use client";

import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-200 p-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">ログイン</h1>
        <div className="flex justify-center">
          <SignIn />
        </div>
        <p className="text-sm text-gray-500 mt-6">
          アカウントをお持ちでない方は、新規作成してください。
        </p>
      </div>
    </main>
  );
}
