import { Route, Navigate } from "react-router";

import ProtectedRoute from "@/routes/ProtectedRoute";
import PublicRoute from "@/routes/PublicRoute";

import Login from "@/pages/auth/Login";
import Signup from "@/pages/auth/Signup";
import ForgotPassword from "@/pages/auth/ForgotPassword";

import TodoList from "@/pages/dashboard/TodoList";
import AllTasks from "@/pages/tasks/AllTasks";
import AddTodo from "@/pages/tasks/AddTodo";
import EditTodo from "@/pages/tasks/EditTodo";

import CalendarPage from "@/pages/calendar/CalendarPage";
import StatsPage from "@/pages/stats/StatsPage";
import SettingsPage from "@/pages/settings/SettingsPage";

import ProfilePage from "@/pages/profile/ProfilePage";
import EditProfile from "@/pages/profile/EditProfile";

export const appRoutes = (
  <>
    <Route path="/" element={<Navigate to="/login" replace />} />

    <Route element={<PublicRoute />}>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
    </Route>

    <Route element={<ProtectedRoute />}>
      <Route path="/dashboard" element={<TodoList />} />
      <Route path="/tasks" element={<AllTasks />} />
      <Route path="/add" element={<AddTodo />} />
      <Route path="/edit/:id" element={<EditTodo />} />
      <Route path="/calendar" element={<CalendarPage />} />
      <Route path="/stats" element={<StatsPage />} />
      <Route path="/settings" element={<SettingsPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/profile/edit" element={<EditProfile />} />
    </Route>

    <Route path="*" element={<Navigate to="/login" replace />} />
  </>
);