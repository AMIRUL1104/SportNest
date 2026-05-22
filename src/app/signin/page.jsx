"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Form, Fieldset } from "@heroui/react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { BiEnvelope, BiLock } from "react-icons/bi";
import LogoMark from "@/components/ui/LogoMark";
import { Bounce, toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";
import { useRouter, useSearchParams } from "next/navigation";

/* ═══════════════════════════════════════
   LOGIN PAGE
═══════════════════════════════════════ */
export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ mode: "onTouched" });

  const onSubmit = async (userData) => {
    const { email, password } = userData;

    const { data, error } = await authClient.signIn.email({
      email,
      password,
      rememberMe: true,
      callbackURL: callbackUrl,
    });

    if (error) {
      toast.error(`Error: ${error.message}`);
      return;
    }

    if (data) {
      router.push(callbackUrl);
      toast.success(
        `Welcome Back, ${data.user.name}. You Are SignIn Successfully!`,
      );

      return;
    }
  };

  const handleGoogleLogin = async () => {
    const data = await authClient.signIn.social({
      provider: "google",
       callbackURL: callbackUrl,
    });
    if (data) {
      toast.success(
        `Welcome Back, ${data.user.name}. You Are SignIn Successfully!`,
      );

      return;
    }
  };

  return (
    <main className="min-h-screen bg-[#EBF4DD] flex items-center justify-center px-4 py-12">
      {/* ── subtle background blobs ── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute -top-32 -left-32 w-[420px] h-[420px] rounded-full bg-[#90AB8B] opacity-[0.07] blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-[360px] h-[360px] rounded-full bg-[#5A7863] opacity-[0.08] blur-3xl" />
      </div>

      {/* ════ CARD ════ */}
      <div className="w-full max-w-md">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-[rgba(144,171,139,0.25)] shadow-[0_8px_40px_rgba(59,73,83,0.1)]">
          {/* ── card header ── */}
          <div className="px-8 pt-8 pb-6 border-b border-[rgba(144,171,139,0.15)]">
            <LogoMark />

            <h1 className="text-[22px] font-semibold text-[#3B4953] tracking-tight leading-snug">
              Welcome back
            </h1>
            <p className="text-[13.5px] text-[rgba(59,73,83,0.55)] mt-1">
              Sign in to continue to your account
            </p>
          </div>

          {/* ── form body ── */}
          <div className="px-8 py-7">
            {/* root / server error */}
            {errors.root && (
              <div className="mb-5 px-4 py-3 rounded-xl bg-red-50 border border-red-200 flex items-start gap-2.5">
                <span className="text-red-400 text-[15px] mt-[1px]">⚠</span>
                <p className="text-[12.5px] text-red-600 leading-snug">
                  {errors.root.message}
                </p>
              </div>
            )}

            <Form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-0"
            >
              <Fieldset
                className="flex flex-col gap-4 border-none p-0 m-0"
                legend=""
              >
                {/* ── Email ── */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[12.5px] font-medium text-[#3B4953] tracking-wide">
                    Email Address
                  </label>
                  <div
                    className={`
                    flex items-center gap-2.5 px-3.5 h-11 rounded-xl
                    border transition-all duration-200 bg-[#EBF4DD]/60
                    ${
                      errors.email
                        ? "border-red-400 bg-red-50/40"
                        : "border-[rgba(144,171,139,0.4)] focus-within:border-[#5A7863] focus-within:bg-white focus-within:shadow-[0_0_0_3px_rgba(90,120,99,0.1)]"
                    }
                  `}
                  >
                    <BiEnvelope className="text-[16px] text-[#90AB8B] shrink-0" />
                    <input
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: "Enter a valid email address",
                        },
                      })}
                      type="email"
                      placeholder="you@example.com"
                      className="flex-1 bg-transparent text-[13.5px] text-[#3B4953] placeholder:text-[rgba(59,73,83,0.35)] outline-none"
                    />
                  </div>
                  {errors.email && (
                    <p className="text-[11.5px] text-red-500 flex items-center gap-1">
                      <span className="text-[10px]">●</span>{" "}
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* ── Password ── */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-[12.5px] font-medium text-[#3B4953] tracking-wide">
                      Password
                    </label>
                    <Link
                      href="/forgot-password"
                      className="text-[11.5px] text-[#5A7863] hover:text-[#3B4953] no-underline transition-colors duration-150 font-medium"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <div
                    className={`
                    flex items-center gap-2.5 px-3.5 h-11 rounded-xl
                    border transition-all duration-200 bg-[#EBF4DD]/60
                    ${
                      errors.password
                        ? "border-red-400 bg-red-50/40"
                        : "border-[rgba(144,171,139,0.4)] focus-within:border-[#5A7863] focus-within:bg-white focus-within:shadow-[0_0_0_3px_rgba(90,120,99,0.1)]"
                    }
                  `}
                  >
                    <BiLock className="text-[16px] text-[#90AB8B] shrink-0" />
                    <input
                      {...register("password", {
                        required: "Password is required",
                        minLength: {
                          value: 6,
                          message: "Password must be at least 6 characters",
                        },
                      })}
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      className="flex-1 bg-transparent text-[13.5px] text-[#3B4953] placeholder:text-[rgba(59,73,83,0.35)] outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((p) => !p)}
                      className="text-[#90AB8B] hover:text-[#5A7863] transition-colors duration-150 shrink-0"
                      tabIndex={-1}
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? (
                        <FiEyeOff className="text-[15px]" />
                      ) : (
                        <FiEye className="text-[15px]" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-[11.5px] text-red-500 flex items-center gap-1">
                      <span className="text-[10px]">●</span>{" "}
                      {errors.password.message}
                    </p>
                  )}
                </div>

                {/* ── Login button ── */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="
                    mt-2 w-full h-11 rounded-xl
                    bg-[#5A7863] hover:bg-[#4d6b56] active:scale-[0.98]
                    text-[#EBF4DD] text-[13.5px] font-semibold tracking-wide
                    transition-all duration-200
                    shadow-[0_2px_12px_rgba(90,120,99,0.3)]
                    disabled:opacity-60 disabled:cursor-not-allowed
                    flex items-center justify-center gap-2
                  "
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-4 h-4 rounded-full border-2 border-[#EBF4DD]/30 border-t-[#EBF4DD] animate-spin" />
                      Signing in…
                    </>
                  ) : (
                    "Sign In"
                  )}
                </button>
              </Fieldset>
            </Form>

            {/* ── Divider ── */}
            <div className="flex items-center gap-3 my-5">
              <div className="flex-1 h-px bg-[rgba(144,171,139,0.25)]" />
              <span className="text-[11.5px] text-[rgba(59,73,83,0.4)] font-medium tracking-wide uppercase">
                or
              </span>
              <div className="flex-1 h-px bg-[rgba(144,171,139,0.25)]" />
            </div>

            {/* ── Google login ── */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="
                w-full h-11 rounded-xl
                flex items-center justify-center gap-2.5
                bg-white border border-[rgba(144,171,139,0.35)]
                hover:bg-[#EBF4DD]/70 hover:border-[rgba(90,120,99,0.5)]
                active:scale-[0.98]
                text-[#3B4953] text-[13.5px] font-medium
                transition-all duration-200
                shadow-[0_1px_4px_rgba(59,73,83,0.08)]
              "
            >
              <FcGoogle className="text-[18px]" />
              Continue with Google
            </button>

            {/* ── Register link ── */}
            <p className="text-center text-[12.5px] text-[rgba(59,73,83,0.5)] mt-5">
              Don&apos;t have an account?{" "}
              <Link
                href="/signup"
                className="text-[#5A7863] font-semibold hover:text-[#3B4953] transition-colors duration-150 no-underline"
              >
                Create one
              </Link>
            </p>
          </div>
        </div>

        {/* ── footnote ── */}
        <p className="text-center text-[11px] text-[rgba(59,73,83,0.35)] mt-5 px-4">
          Protected by SportNest security.{" "}
          <Link href="/privacy" className="underline hover:text-[#5A7863]">
            Privacy Policy
          </Link>
        </p>
      </div>
    </main>
  );
}
