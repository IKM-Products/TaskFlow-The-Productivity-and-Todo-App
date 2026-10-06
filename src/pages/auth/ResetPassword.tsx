import { useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Lock } from "lucide-react";
import { toast } from "sonner";

import AuthLayout from "@/components/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  resetPasswordSchema,
  type ResetPasswordFormData,
} from "@/schemas/resetPasswordSchema";

const USERS_KEY = "taskflow_users";
const RESET_TOKENS_KEY = "taskflow_reset_tokens";

interface ResetTokenEntry {
  email: string;
  token: string;
  expiresAt: number;
}

interface UserEntry {
  email: string;
  password: string;
  [key: string]: unknown;
}

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = (data: ResetPasswordFormData) => {
    if (!token) {
      toast.error("Invalid or missing reset token.");
      return;
    }

    try {
      const resetTokens: ResetTokenEntry[] = JSON.parse(
        localStorage.getItem(RESET_TOKENS_KEY) || "[]"
      );

      const resetEntry = resetTokens.find((t) => t.token === token);

      if (!resetEntry || resetEntry.expiresAt < Date.now()) {
        toast.error("Invalid or expired password reset token.");
        return;
      }

      const users: UserEntry[] = JSON.parse(
        localStorage.getItem(USERS_KEY) || "[]"
      );

      const updatedUsers = users.map((u) =>
        u.email.toLowerCase() === resetEntry.email.toLowerCase()
          ? { ...u, password: data.password }
          : u
      );

      localStorage.setItem(USERS_KEY, JSON.stringify(updatedUsers));
      localStorage.setItem(
        RESET_TOKENS_KEY,
        JSON.stringify(resetTokens.filter((t) => t.token !== token))
      );

      toast.success("Password updated successfully! Please login.");
      navigate("/login", { replace: true });
    } catch (error) {
      toast.error("Failed to reset password. Please try again.");
    }
  };

  return (
    <AuthLayout
      title="Reset Password"
      subtitle="Enter your new password to update your account."
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-300">
            New Password
          </label>
          <div className="relative">
            <Lock className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
            <Input
              type={showPassword ? "text" : "password"}
              {...register("password")}
              placeholder="Enter new password"
              className="h-12 rounded-2xl border-slate-600 bg-slate-950/70 pl-12 pr-12 text-white"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-4 top-3.5 text-slate-400 hover:text-slate-200"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="mt-2 text-sm text-pink-300">
              {errors.password.message}
            </p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-300">
            Confirm Password
          </label>
          <div className="relative">
            <Lock className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
            <Input
              type={showConfirmPassword ? "text" : "password"}
              {...register("confirmPassword")}
              placeholder="Confirm new password"
              className="h-12 rounded-2xl border-slate-600 bg-slate-950/70 pl-12 pr-12 text-white"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute right-4 top-3.5 text-slate-400 hover:text-slate-200"
            >
              {showConfirmPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="mt-2 text-sm text-pink-300">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          className="h-12 w-full rounded-2xl bg-linear-to-r from-purple-600 to-cyan-400 font-bold"
        >
          Update Password
        </Button>

        <p className="text-center text-sm text-slate-400">
          <Link
            to="/login"
            className="font-semibold text-cyan-300 transition hover:text-cyan-200"
          >
            Back to login
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}