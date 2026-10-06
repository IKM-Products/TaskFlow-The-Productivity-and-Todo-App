import { useState, type ReactNode } from "react";
import { Link, useNavigate } from "react-router";
import { useForm, type UseFormRegisterReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Mail, User, Lock } from "lucide-react";
import { toast } from "sonner";

import AuthLayout from "@/components/AuthLayout";
import {
  signupSchema,
  type SignupFormData,
} from "@/schemas/signupSchema";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const USERS_KEY = "taskflow_users";

interface UserRecord {
  id: string;
  name: string;
  email: string;
  password?: string;
  joinedAt: string;
  avatar: string;
}

export default function Signup() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = (data: SignupFormData) => {
    try {
      const users: UserRecord[] = JSON.parse(
        localStorage.getItem(USERS_KEY) || "[]"
      );

      const userExists = users.some(
        (user) => user.email.toLowerCase() === data.email.toLowerCase()
      );

      if (userExists) {
        toast.error("Account already exists with this email.");
        return;
      }

      const newUser: UserRecord = {
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

      toast.success("Account created successfully!");
      navigate("/login");
    } catch (error) {
      toast.error("Failed to create account. Please try again.");
    }
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
          type={showPassword ? "text" : "password"}
          placeholder="Enter password"
          register={register("password")}
          error={errors.password?.message}
          isPassword
          showPassword={showPassword}
          onTogglePassword={() => setShowPassword((prev) => !prev)}
        />

        <AuthInput
          icon={<Lock />}
          label="Confirm Password"
          type={showConfirmPassword ? "text" : "password"}
          placeholder="Confirm password"
          register={register("confirmPassword")}
          error={errors.confirmPassword?.message}
          isPassword
          showPassword={showConfirmPassword}
          onTogglePassword={() => setShowConfirmPassword((prev) => !prev)}
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

interface AuthInputProps {
  icon: ReactNode;
  label: string;
  placeholder?: string;
  type?: string;
  register: UseFormRegisterReturn;
  error?: string;
  isPassword?: boolean;
  showPassword?: boolean;
  onTogglePassword?: () => void;
}

function AuthInput({
  icon,
  label,
  placeholder,
  type = "text",
  register,
  error,
  isPassword = false,
  showPassword = false,
  onTogglePassword,
}: AuthInputProps) {
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
          className={`h-12 rounded-2xl border-slate-600 bg-slate-950/70 pl-12 text-white ${
            isPassword ? "pr-12" : ""
          }`}
        />

        {isPassword && (
          <button
            type="button"
            onClick={onTogglePassword}
            className="absolute right-4 top-3.5 text-slate-400 hover:text-slate-200"
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        )}
      </div>

      {error && <p className="mt-2 text-sm text-pink-300">{error}</p>}
    </div>
  );
}