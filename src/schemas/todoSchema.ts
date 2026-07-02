import { z } from "zod";

export const todoSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().optional(),
  priority: z.enum(["low", "medium", "high"]),
  dueDate: z.string().min(1, "Due date is required"),
  dueTime: z.string().min(1, "Time is required"),
});

export type TodoFormData = z.infer<typeof todoSchema>;