"use client";

import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-200 p-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">新規登録</h1>
        <div className="flex justify-center">
          <SignUp />
        </div>
        <p className="text-sm text-gray-500 mt-6">
          すでにアカウントをお持ちの方は、サインインしてください。
        </p>
      </div>
    </main>
  );
}
