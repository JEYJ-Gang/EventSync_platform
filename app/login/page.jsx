"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleLogin(e) {
        e.preventDefault();

        const res = await fetch("/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await res.json();

        if (!res.ok) {
            alert(data.message);
            return;
        }

        localStorage.setItem("token", data.access_token);
        router.push("/dashboard");
    }

    return (
        <div className="min-h-screen flex bg-[#F7F6F0]">

            {/* LEFT SIDE - FORM */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-10">

                <div className="w-full max-w-md bg-[#FEFEFE] border border-[#E0DED4] rounded-2xl p-10 shadow-sm">

                    <div className="mb-8 text-center">
                        <h1 className="text-2xl font-semibold text-[#2B2B2B]">
                            Welcome to EventSync
                        </h1>
                        <p className="text-sm text-[#5C5B57] mt-2">
                            Sign in to access your dashboard
                        </p>
                    </div>

                    {/* FORM */}
                    <form onSubmit={handleLogin} className="space-y-5">

                        <div>
                            <label className="text-sm text-[#2B2B2B]">
                                Email Address
                            </label>
                            <input
                                type="email"
                                className="w-full mt-2 px-4 py-3 rounded-xl border border-[#E0DED4] focus:outline-none focus:ring-2 focus:ring-[#C3C9BC]"
                                placeholder="Enter your email"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="text-sm text-[#2B2B2B]">
                                Password
                            </label>
                            <input
                                type="password"
                                className="w-full mt-2 px-4 py-3 rounded-xl border border-[#E0DED4] focus:outline-none focus:ring-2 focus:ring-[#C3C9BC]"
                                placeholder="Enter your password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full py-3 rounded-xl bg-[#A04F7] text-white font-medium hover:bg-[#8F94F0] transition"
                        >
                            Sign In
                        </button>

                    </form>

                    <p className="text-xs text-center text-[#908F83] mt-6">
                        © EventSync — All rights reserved
                    </p>

                </div>
            </div>
        </div>
    );
}