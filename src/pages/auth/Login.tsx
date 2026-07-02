import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Lock, Mail } from "lucide-react";

import AuthLayout from "@/components/AuthLayout";
import { loginSchema, type LoginFormData } from "@/schemas/loginSchema";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const OLD_USER_KEY = "taskflow_user";
const USERS_KEY = "taskflow_users";
const CURRENT_USER_KEY = "taskflow_current_user";
const AUTH_KEY = "taskflow_auth";

export default function Login() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormData) => {
    let users = JSON.parse(localStorage.getItem(USERS_KEY) || "[]");

    const oldUser = localStorage.getItem(OLD_USER_KEY);

    if (oldUser && users.length === 0) {
      const parsedOldUser = JSON.parse(oldUser);

      users = [
        {
          id: parsedOldUser.id || crypto.randomUUID(),
          name: parsedOldUser.name,
          email: parsedOldUser.email,
          password: parsedOldUser.password,
          joinedAt: parsedOldUser.joinedAt || new Date().toISOString(),
          avatar: parsedOldUser.avatar || "",
        },
      ];

      localStorage.setItem(USERS_KEY, JSON.stringify(users));
      localStorage.removeItem(OLD_USER_KEY);
    }

    const user = users.find(
      (item: any) =>
        item.email === data.email && item.password === data.password
    );

    if (!user) {
      alert("Invalid email or password.");
      return;
    }

    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));

    localStorage.setItem(
      AUTH_KEY,
      JSON.stringify({
        isLoggedIn: true,
        userId: user.id,
      })
    );

    navigate("/dashboard", { replace: true });
  };

  return (
    <AuthLayout title="Welcome Back" subtitle="Login to continue to TaskFlow.">
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

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-300">
            Password
          </label>

          <div className="relative">
            <Lock className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
            <Input
              type="password"
              {...register("password")}
              placeholder="Enter your password"
              className="h-12 rounded-2xl border-slate-600 bg-slate-950/70 pl-12 text-white"
            />
          </div>

          {errors.password && (
            <p className="mt-2 text-sm text-pink-300">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="flex justify-end">
          <Link to="/forgot-password" className="text-sm text-cyan-300">
            Forgot password?
          </Link>
        </div>

        <Button
          type="submit"
          className="h-12 w-full rounded-2xl bg-linear-to-r from-purple-600 to-cyan-400 font-bold"
        >
          Login
        </Button>

        <p className="text-center text-sm text-slate-400">
          Don&apos;t have an account?{" "}
          <Link to="/signup" className="text-cyan-300">
            Sign up
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}