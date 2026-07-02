import { Link } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail } from "lucide-react";

import AuthLayout from "@/components/AuthLayout";
import {
  forgotPasswordSchema,
  type ForgotPasswordFormData,
} from "@/schemas/forgotPasswordSchema";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = (data: ForgotPasswordFormData) => {
    alert(`Password reset link sent to ${data.email}`);
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

        <Button className="h-12 w-full rounded-2xl bg-linear-to-r from-purple-600 to-cyan-400 font-bold">
          Send Reset Link
        </Button>

        <p className="text-center text-sm text-slate-400">
          Remembered password?{" "}
          <Link to="/login" className="text-cyan-300">
            Back to login
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}