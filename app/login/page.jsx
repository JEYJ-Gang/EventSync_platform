"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {

    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleLogin(e) {

        e.preventDefault();

        try {

            const res = await fetch("/api/auth/login", {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                },

                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                alert(data.message);
                return;
            }

            localStorage.setItem(
                "token",
                data.access_token
            );

            router.push("/dashboard");

        } catch (error) {

            console.log(error);

        }
    }

    return (

        <div className="h-screen bg-[#F7F6F0] flex items-center justify-center p-4 lg:p-6 overflow-hidden">

            {/* MAIN CONTAINER */}
            <div className="
                w-full
                max-w-5xl
                h-full
                max-h-[920px]
                bg-[#FEFEFE]
                rounded-[32px]
                border
                border-[#E0DED4]
                shadow-sm
                overflow-hidden
                flex
            ">

                {/* LEFT SIDE */}
                <div className="
                    w-full
                    lg:w-1/2
                    flex
                    items-center
                    justify-center
                    p-10
                    lg:p-10
                ">

                    <div className="w-full max-w-md">

                        {/* LOGO */}
                        <div className="mb-8 mt-6">

                            <h1 className="
                                text-3xl
                                font-bold
                                text-[#2B2B2B]
                            ">
                                EventSync
                            </h1>

                            <p className="
                                text-[#908F83]
                                mt-1
                                text-sm
                            ">
                                Smart event management platform
                            </p>

                        </div>

                        {/* TITLE */}
                        <div>

                            <h2 className="
                                text-4xl
                                font-semibold
                                text-[#2B2B2B]
                                leading-tight
                            ">
                                Welcome back
                            </h2>

                            <p className="
                                text-[#5C5B57]
                                mb-1
                                text-base
                            ">
                                Sign in to access your dashboard
                            </p>

                        </div>

                        {/* FORM */}
                        <form
                            onSubmit={handleLogin}
                            className="space-y-5"
                        >

                            {/* EMAIL */}
                            <div>

                                <label className="
                                    block
                                    text-sm
                                    font-medium
                                    text-[#2B2B2B]
                                    mt-3
                                    mb-2
                                ">
                                    Email Address
                                </label>

                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) =>
                                        setEmail(e.target.value)
                                    }
                                    className="
                                        w-full
                                        px-4
                                        py-3
                                        rounded-2xl
                                        border
                                        border-[#E0DED4]
                                        bg-white
                                        text-[#2B2B2B]
                                        placeholder:text-[#908F83]
                                        focus:outline-none
                                        focus:ring-2
                                        focus:ring-[#C3C9BC]
                                        transition
                                    "
                                />

                            </div>

                            {/* PASSWORD */}
                            <div>

                                <label className="
                                    block
                                    text-sm
                                    font-medium
                                    text-[#2B2B2B]
                                    mb-2
                                ">
                                    Password
                                </label>

                                <input
                                    type="password"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    className="
                                        w-full
                                        px-4
                                        py-3
                                        rounded-2xl
                                        border
                                        border-[#E0DED4]
                                        bg-white
                                        text-[#2B2B2B]
                                        placeholder:text-[#908F83]
                                        focus:outline-none
                                        focus:ring-2
                                        focus:ring-[#C3C9BC]
                                        transition
                                    "
                                />

                            </div>

                            {/* BUTTON */}
                            <button
                                type="submit"
                                className="
                                    w-full
                                    py-3
                                    rounded-2xl
                                    bg-[#A0A4F7]
                                    hover:bg-[#8F94F0]
                                    text-white
                                    font-semibold
                                    transition
                                    duration-200
                                    shadow-sm
                                    cursor-pointer
                                "
                            >
                                Sign In
                            </button>

                        </form>

                        {/* FOOTER */}
                        <p className="
                            text-xs
                            text-[#908F83]
                            mt-8
                            mb-8
                            text-center
                        ">
                            © Jeyj Gang Team — All rights reserved
                        </p>

                    </div>

                </div>

                {/* RIGHT SIDE */}
                <div className="
                    hidden
                    lg:flex
                    w-1/2
                    relative
                    items-center
                    justify-center
                    overflow-hidden
                    bg-[#2B2B2B]
                ">

                    {/* BACKGROUND */}
                    <div className="
                        absolute
                        inset-0
                        bg-gradient-to-br
                        from-[#3E427F]
                        via-[#2B2B2B]
                        to-[#1F1F1F]
                    " />

                    {/* DECORATION */}
                    <div className="
                        absolute
                        w-[500px]
                        h-[500px]
                        rounded-full
                        bg-[#A0A4F7]/20
                        blur-3xl
                        top-[-120px]
                        right-[-100px]
                    " />

                    {/* CONTENT */}
                    <div className="
                        relative
                        z-10
                        px-10
                        text-center
                    ">

                        {/* ICON */}
                        <div className="
                            w-20
                            h-20
                            rounded-3xl
                            bg-[#A0A4F7]
                            flex
                            items-center
                            justify-center
                            mx-auto
                            shadow-2xl
                            mb-8
                        ">

                            <span className="
                                text-white
                                text-3xl
                                font-bold
                            ">
                                E
                            </span>

                        </div>

                        {/* TITLE */}
                        <h2 className="
                            text-4xl
                            font-bold
                            text-white
                            leading-tight
                        ">
                            Smart Event
                            <br />
                            Management
                        </h2>

                        {/* DESCRIPTION */}
                        <p className="
                            text-[#D7D7D7]
                            text-base
                            leading-relaxed
                            mt-6
                            max-w-sm
                            mx-auto
                        ">
                            Organize sessions, speakers,
                            schedules and live engagement
                            in one elegant platform.
                        </p>

                    </div>

                </div>

            </div>

        </div>
    );
}