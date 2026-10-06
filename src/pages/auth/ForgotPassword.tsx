import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Loader2 } from "lucide-react";

import AuthLayout from "@/components/AuthLayout";
import {
  forgotPasswordSchema,
  type ForgotPasswordFormData,
} from "@/schemas/forgotPasswordSchema";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const USERS_KEY = "taskflow_users";
const RESET_TOKENS_KEY = "taskflow_reset_tokens";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = (data: ForgotPasswordFormData) => {
    setIsSubmitting(true);

    const users = JSON.parse(localStorage.getItem(USERS_KEY) || "[]");

    const user = users.find((item: any) => item.email === data.email);

    if (!user) {
      alert("No account found with this email address.");
      setIsSubmitting(false);
      return;
    }

    const token = crypto.randomUUID();
    const expiresAt = Date.now() + 60 * 60 * 1000; // 1 hour expiration

    const resetTokens = JSON.parse(
      localStorage.getItem(RESET_TOKENS_KEY) || "[]"
    );

    const updatedTokens = [
      ...resetTokens.filter((item: any) => item.email !== data.email),
      { email: data.email, token, expiresAt },
    ];

    localStorage.setItem(RESET_TOKENS_KEY, JSON.stringify(updatedTokens));

    // Redirect to reset password page using react-router navigation
    navigate(`/reset-password?token=${token}`, { replace: true });
  };

  return (
    <AuthLayout
      title="Forgot Password"
      subtitle="Enter your email to reset your password."
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-300">
            Email
          </label>

          <div className="relative">
            <Mail className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
            <Input
              {...register("email")}
              placeholder="Enter your email"
              className="h-12 rounded-2xl border-slate-600 bg-slate-950/70 pl-12 text-white"
            />
          </div>

          {errors.email && (
            <p className="mt-2 text-sm text-pink-300">
              {errors.email.message}
            </p>
          )}
        </div>

        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="h-12 w-full rounded-2xl bg-linear-to-r from-purple-600 to-cyan-400 font-bold"
        >
          {isSubmitting ? (
            <Loader2 className="h-5 w-5 animate-spin text-white" />
          ) : (
            "Reset Password"
          )}
        </Button>

        <p className="text-center text-sm text-slate-400">
          Remembered password?{" "}
          <Link to="/login" className="font-semibold text-cyan-300 transition hover:text-cyan-200">
            Back to login
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}