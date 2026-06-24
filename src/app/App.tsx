import { BrowserRouter, Routes, Route } from "react-router";
import TodoList from "@/pages/TodoList";
import AddTodo from "@/pages/AddTodo";
import EditTodo from "@/pages/EditTodo";
import AllTasks from "@/pages/AllTasks";
import CalendarPage from "@/pages/CalendarPage";
import StatsPage from "@/pages/StatsPage";
import SettingsPage from "@/pages/SettingsPage";
import "@/App.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TodoList />} />
        <Route path="/tasks" element={<AllTasks />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/stats" element={<StatsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/add" element={<AddTodo />} />
        <Route path="/edit/:id" element={<EditTodo />} />
      </Routes>
    </BrowserRouter>
  );
}