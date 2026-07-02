import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import Navbar from "@/components/navbar";

import { ArrowLeft, Mail, Save, Upload, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const USERS_KEY = "taskflow_users";
const CURRENT_USER_KEY = "taskflow_current_user";

export default function EditProfile() {
  const navigate = useNavigate();

  const [userId, setUserId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem(CURRENT_USER_KEY) || "{}");

    setUserId(user.id || "");
    setName(user.name || "");
    setEmail(user.email || "");
    setAvatar(user.avatar || "");
  }, []);

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setAvatar(reader.result as string);
    };

    reader.readAsDataURL(file);
  };

  const saveProfile = () => {
    if (!name.trim() || !email.trim()) {
      alert("Name and email are required.");
      return;
    }

    const currentUser = JSON.parse(
      localStorage.getItem(CURRENT_USER_KEY) || "{}"
    );

    const users = JSON.parse(localStorage.getItem(USERS_KEY) || "[]");

    const emailTaken = users.some(
      (user: any) => user.email === email && user.id !== userId
    );

    if (emailTaken) {
      alert("This email is already used by another account.");
      return;
    }

    const updatedUser = {
      ...currentUser,
      name,
      email,
      avatar,
    };

    const updatedUsers = users.map((user: any) =>
      user.id === userId ? updatedUser : user
    );

    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(updatedUser));
    localStorage.setItem(USERS_KEY, JSON.stringify(updatedUsers));

    alert("Profile updated successfully.");
    navigate("/profile");
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[radial-gradient(circle_at_top,#10153d,#050816_45%,#020617_100%)] px-4 py-10 text-white lg:pl-80">
        <div className="mx-auto max-w-6xl">
          <section className="relative mb-8 overflow-hidden rounded-[3rem] border border-cyan-400/50 bg-[#070b1f] p-10 shadow-2xl shadow-purple-950/50">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_70%,#06b6d455,transparent_20%),radial-gradient(circle_at_68%_38%,#9333ea66,transparent_14%),linear-gradient(135deg,#27115f88,#02061755,#08334488)]" />

            <div className="relative">
              <Button
                asChild
                variant="ghost"
                className="mb-6 rounded-2xl text-slate-300 hover:bg-slate-800 hover:text-white"
              >
                <Link to="/profile">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Link>
              </Button>

              <h1 className="text-5xl font-black">
                Edit{" "}
                <span className="bg-linear-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  Profile
                </span>
              </h1>

              <p className="mt-4 text-slate-300">
                Update your personal information.
              </p>
            </div>
          </section>

          <section className="rounded-[2.5rem] border border-cyan-500/30 bg-slate-900/60 p-8 shadow-xl backdrop-blur-xl">
            <div className="mb-8 flex flex-col items-center gap-5">
              <div className="flex h-36 w-36 items-center justify-center overflow-hidden rounded-full bg-linear-to-br from-purple-600 to-cyan-400 text-6xl font-black shadow-xl">
                {avatar ? (
                  <img
                    src={avatar}
                    alt="Avatar"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  name.charAt(0).toUpperCase() || "U"
                )}
              </div>

              <label className="cursor-pointer">
                <div className="flex items-center gap-2 rounded-2xl border border-cyan-500/30 bg-cyan-500/10 px-5 py-3 transition hover:bg-cyan-500/20">
                  <Upload className="h-5 w-5" />
                  Upload Photo
                </div>

                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleImage}
                />
              </label>
            </div>

            <div className="space-y-6">
              <div>
                <label className="mb-2 block font-semibold">Full Name</label>

                <div className="relative">
                  <User className="absolute left-4 top-4 h-5 w-5 text-slate-400" />

                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="h-14 rounded-2xl border-slate-700 bg-slate-950 pl-12 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block font-semibold">Email</label>

                <div className="relative">
                  <Mail className="absolute left-4 top-4 h-5 w-5 text-slate-400" />

                  <Input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-14 rounded-2xl border-slate-700 bg-slate-950 pl-12 text-white"
                  />
                </div>
              </div>

              <Button
                onClick={saveProfile}
                className="h-14 w-full rounded-2xl bg-linear-to-r from-purple-600 to-cyan-400 text-lg font-bold"
              >
                <Save className="mr-2 h-5 w-5" />
                Save Changes
              </Button>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}