"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Form, Fieldset } from "@heroui/react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { BiUser, BiEnvelope, BiLink, BiLock } from "react-icons/bi";
import { authClient } from "@/lib/auth-client";
import { Bounce, toast } from "react-toastify";
import { redirect } from "next/navigation";

/* ═══════════════════════════════════════
   REGISTER PAGE
═══════════════════════════════════════ */
export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ mode: "onTouched" });

  const onSubmit = async (userData) => {
    const { name, email, password, photoURL } = userData;

    const { data, error } = await authClient.signUp.email({
      name: name, // required
      email: email, // required
      password: password, // required
      image: photoURL,
    });

    if (error) {
      toast.error(`Error: ${error.message}`);
      return;
    }

    if (data) {
      toast.success(
        `Welcome ${data.user.name}. Your Are SignUp Successfully!`,
        {
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        },
      );
      redirect("/");
      return;
    }
  };

  const handleGoogleLogin = async () => {
    console.log("google sign-in");
  };

  return (
    <main className="min-h-screen bg-[#EBF4DD] flex items-center justify-center px-4 py-12">
      {/* ── subtle background texture ── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute -top-32 -right-32 w-[480px] h-[480px] rounded-full bg-[#90AB8B] opacity-[0.07] blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-[360px] h-[360px] rounded-full bg-[#5A7863] opacity-[0.08] blur-3xl" />
      </div>

      {/* ════ CARD ════ */}
      <div className="w-full max-w-md">
        {/* ── card shell ── */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-[rgba(144,171,139,0.25)] shadow-[0_8px_40px_rgba(59,73,83,0.1)]">
          {/* ── card header ── */}
          <div className="px-8 pt-8 pb-6 border-b border-[rgba(144,171,139,0.15)]">
            {/* logo */}
            <Link
              href="/"
              className="flex items-center gap-1.5 no-underline w-fit mb-6"
            >
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <circle cx="11" cy="11" r="10" fill="#5A7863" opacity="0.9" />
                <path
                  d="M7 11.5C7 9.015 8.79 7 11 7s4 2.015 4 4.5S13.21 16 11 16"
                  stroke="#EBF4DD"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
                <circle cx="11" cy="11.5" r="1.5" fill="#EBF4DD" />
              </svg>
              <span className="font-serif text-[18px] text-[#3B4953] tracking-[-0.01em]">
                Sport<span className="text-[#5A7863] italic">Nest</span>
              </span>
            </Link>

            <h1 className="text-[22px] font-semibold text-[#3B4953] tracking-tight leading-snug">
              Create your account
            </h1>
            <p className="text-[13.5px] text-[rgba(59,73,83,0.55)] mt-1">
              Join SportNest and start booking today
            </p>
          </div>

          {/* ── form body ── */}
          <div className="px-8 py-7">
            <Form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-0"
            >
              <Fieldset
                className="flex flex-col gap-4 border-none p-0 m-0"
                legend=""
              >
                {/* ── Name ── */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[12.5px] font-medium text-[#3B4953] tracking-wide">
                    Full Name
                  </label>
                  <div
                    className={`
                    flex items-center gap-2.5 px-3.5 h-11 rounded-xl
                    border transition-all duration-200 bg-[#EBF4DD]/60
                    ${
                      errors.name
                        ? "border-red-400 bg-red-50/40"
                        : "border-[rgba(144,171,139,0.4)] focus-within:border-[#5A7863] focus-within:bg-white focus-within:shadow-[0_0_0_3px_rgba(90,120,99,0.1)]"
                    }
                  `}
                  >
                    <BiUser className="text-[16px] text-[#90AB8B] shrink-0" />
                    <input
                      {...register("name", { required: "Name is required" })}
                      placeholder="John Doe"
                      className="flex-1 bg-transparent text-[13.5px] text-[#3B4953] placeholder:text-[rgba(59,73,83,0.35)] outline-none"
                    />
                  </div>
                  {errors.name && (
                    <p className="text-[11.5px] text-red-500 flex items-center gap-1">
                      <span className="text-[10px]">●</span>{" "}
                      {errors.name.message}
                    </p>
                  )}
                </div>

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
                          message: "Enter a valid email",
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

                {/* ── Photo URL ── */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[12.5px] font-medium text-[#3B4953] tracking-wide">
                    Photo URL
                    <span className="ml-1.5 text-[rgba(59,73,83,0.4)] font-normal">
                      (optional)
                    </span>
                  </label>
                  <div
                    className={`
                    flex items-center gap-2.5 px-3.5 h-11 rounded-xl
                    border transition-all duration-200 bg-[#EBF4DD]/60
                    ${
                      errors.photoURL
                        ? "border-red-400 bg-red-50/40"
                        : "border-[rgba(144,171,139,0.4)] focus-within:border-[#5A7863] focus-within:bg-white focus-within:shadow-[0_0_0_3px_rgba(90,120,99,0.1)]"
                    }
                  `}
                  >
                    <BiLink className="text-[16px] text-[#90AB8B] shrink-0" />
                    <input
                      {...register("photoURL", {
                        pattern: {
                          value: /^https?:\/\/.+/,
                          message: "Must be a valid URL (http/https)",
                        },
                      })}
                      type="url"
                      placeholder="https://example.com/photo.jpg"
                      className="flex-1 bg-transparent text-[13.5px] text-[#3B4953] placeholder:text-[rgba(59,73,83,0.35)] outline-none"
                    />
                  </div>
                  {errors.photoURL && (
                    <p className="text-[11.5px] text-red-500 flex items-center gap-1">
                      <span className="text-[10px]">●</span>{" "}
                      {errors.photoURL.message}
                    </p>
                  )}
                </div>

                {/* ── Password ── */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[12.5px] font-medium text-[#3B4953] tracking-wide">
                    Password
                  </label>
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
                          message: "Must be at least 6 characters",
                        },
                        validate: {
                          hasUpper: (v) =>
                            /[A-Z]/.test(v) ||
                            "Must contain an uppercase letter",
                          hasLower: (v) =>
                            /[a-z]/.test(v) ||
                            "Must contain a lowercase letter",
                        },
                      })}
                      type={showPassword ? "text" : "password"}
                      placeholder="Min 6 chars, A–Z and a–z"
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

                  {/* password error */}
                  {errors.password && (
                    <p className="text-[11.5px] text-red-500 flex items-center gap-1">
                      <span className="text-[10px]">●</span>{" "}
                      {errors.password.message}
                    </p>
                  )}

                  {/* password hint pills */}
                  <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                    {[
                      "6+ characters",
                      "Uppercase (A–Z)",
                      "Lowercase (a–z)",
                    ].map((hint) => (
                      <span
                        key={hint}
                        className="text-[10.5px] px-2 py-0.5 rounded-full bg-[rgba(144,171,139,0.15)] text-[rgba(59,73,83,0.55)] border border-[rgba(144,171,139,0.25)]"
                      >
                        {hint}
                      </span>
                    ))}
                  </div>
                </div>

                {/* ── Register button ── */}
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
                      Creating account…
                    </>
                  ) : (
                    "Create Account"
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

            {/* ── Login link ── */}
            <p className="text-center text-[12.5px] text-[rgba(59,73,83,0.5)] mt-5">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-[#5A7863] font-semibold hover:text-[#3B4953] transition-colors duration-150 no-underline"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>

        {/* ── footnote ── */}
        <p className="text-center text-[11px] text-[rgba(59,73,83,0.35)] mt-5 px-4">
          By registering you agree to our{" "}
          <Link href="/terms" className="underline hover:text-[#5A7863]">
            Terms
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="underline hover:text-[#5A7863]">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </main>
  );
}
