import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, User, Lock } from "lucide-react";

import AuthLayout from "@/components/AuthLayout";
import {
  signupSchema,
  type SignupFormData,
} from "@/schemas/signupSchema";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const USERS_KEY = "taskflow_users";

export default function Signup() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = (data: SignupFormData) => {
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || "[]");

    const userExists = users.some(
      (user: any) => user.email === data.email
    );

    if (userExists) {
      alert("Account already exists with this email.");
      return;
    }

    const newUser = {
      id: crypto.randomUUID(),
      name: data.name,
      email: data.email,
      password: data.password,
      joinedAt: new Date().toISOString(),
      avatar: "",
    };

    localStorage.setItem(
      USERS_KEY,
      JSON.stringify([...users, newUser])
    );

    alert("Account created successfully.");
    navigate("/login");
  };

  return (
    <AuthLayout title="Create Account" subtitle="Start organizing your tasks.">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <AuthInput
          icon={<User />}
          label="Full Name"
          placeholder="Enter your name"
          register={register("name")}
          error={errors.name?.message}
        />

        <AuthInput
          icon={<Mail />}
          label="Email"
          placeholder="Enter your email"
          register={register("email")}
          error={errors.email?.message}
        />

        <AuthInput
          icon={<Lock />}
          label="Password"
          type="password"
          placeholder="Enter password"
          register={register("password")}
          error={errors.password?.message}
        />

        <AuthInput
          icon={<Lock />}
          label="Confirm Password"
          type="password"
          placeholder="Confirm password"
          register={register("confirmPassword")}
          error={errors.confirmPassword?.message}
        />

        <Button
          type="submit"
          className="h-12 w-full rounded-2xl bg-linear-to-r from-purple-600 to-cyan-400 font-bold"
        >
          Create Account
        </Button>

        <p className="text-center text-sm text-slate-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-cyan-400 transition hover:text-cyan-300"
          >
            Login
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}

function AuthInput({
  icon,
  label,
  placeholder,
  type = "text",
  register,
  error,
}: any) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-slate-300">
        {label}
      </label>

      <div className="relative">
        <span className="absolute left-4 top-3.5 h-5 w-5 text-slate-400">
          {icon}
        </span>

        <Input
          type={type}
          placeholder={placeholder}
          {...register}
          className="h-12 rounded-2xl border-slate-600 bg-slate-950/70 pl-12 text-white"
        />
      </div>

      {error && <p className="mt-2 text-sm text-pink-300">{error}</p>}
    </div>
  );
}