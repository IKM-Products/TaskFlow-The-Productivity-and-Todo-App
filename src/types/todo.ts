export type Priority = "low" | "medium" | "high";

export type Todo = {
  id: string;
  title: string;
  description?: string;
  priority: Priority;
  dueDate: string;
  dueTime: string;
  completed: boolean;
  createdAt: string;
};