import { Link } from "react-router";
import { CalendarDays, Clock3, Edit, Trash2 } from "lucide-react";

import type { Todo } from "@/types/todo";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";

type TodoCardProps = {
  todo: Todo;
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
  showCheckbox?: boolean;
  showEdit?: boolean;
  showStatus?: boolean;
};

export default function TodoCard({
  todo,
  onDelete,
  onToggle,
  showCheckbox = true,
  showEdit = true,
  showStatus = true,
}: TodoCardProps) {
  const priorityClass =
    todo.priority === "high"
      ? "border-pink-500/40 bg-pink-500/10 text-pink-300"
      : todo.priority === "medium"
      ? "border-amber-500/40 bg-amber-500/10 text-amber-300"
      : "border-emerald-500/40 bg-emerald-500/10 text-emerald-300";

  return (
    <Card className="group overflow-hidden rounded-2rem border border-purple-500/40 bg-slate-900/60 text-white shadow-xl shadow-black/30 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/60 hover:shadow-cyan-950/30">
      <CardContent className="p-7">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-start">
          <div className="flex gap-5">
            {showCheckbox && (
              <Checkbox
                checked={todo.completed}
                onCheckedChange={() => onToggle(todo.id)}
                className="mt-1 h-6 w-6 rounded-md border-slate-500 data-[state=checked]:border-cyan-400 data-[state=checked]:bg-cyan-500"
              />
            )}

            <div>
              <h2
                className={`text-3xl font-bold ${
                  todo.completed ? "text-slate-500 line-through" : "text-white"
                }`}
              >
                {todo.title}
              </h2>

              {todo.description && (
                <p className="mt-3 max-w-2xl text-base leading-7 text-slate-400">
                  {todo.description}
                </p>
              )}

              <div className="mt-6 flex flex-wrap gap-3">
                <Badge
                  variant="outline"
                  className={`rounded-full px-4 py-1.5 text-sm capitalize ${priorityClass}`}
                >
                  {todo.priority} Priority
                </Badge>

                <Badge
                  variant="outline"
                  className="gap-1 rounded-full border-cyan-500/40 bg-cyan-500/10 px-4 py-1.5 text-sm text-cyan-300"
                >
                  <CalendarDays className="h-4 w-4" />
                  {todo.dueDate}
                </Badge>

                {todo.dueTime && (
                  <Badge
                    variant="outline"
                    className="gap-1 rounded-full border-purple-500/40 bg-purple-500/10 px-4 py-1.5 text-sm text-purple-300"
                  >
                    <Clock3 className="h-4 w-4" />
                    {todo.dueTime}
                  </Badge>
                )}
                {showStatus && (
                <Badge
                  variant="outline"
                  className={`rounded-full px-4 py-1.5 text-sm ${
                    todo.completed
                      ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-300"
                      : "border-slate-500/40 bg-slate-500/10 text-slate-300"
                  }`}
                >
                  {todo.completed ? "Completed" : "Active"}
                </Badge>
                )}
              </div>
            </div>
          </div>

          <div className="flex gap-3 md:opacity-80 md:transition md:group-hover:opacity-100">
            {showEdit && (
              <Button
                size="icon"
                variant="outline"
                asChild
                className="h-12 w-12 rounded-full border-cyan-500/30 bg-cyan-500/10 text-cyan-300 hover:bg-cyan-500/20"
              >
                <Link to={`/edit/${todo.id}`}>
                  <Edit className="h-5 w-5" />
                </Link>
              </Button>
            )}

            <Button
              size="icon"
              variant="outline"
              onClick={() => onDelete(todo.id)}
              className="h-12 w-12 rounded-full border-pink-500/30 bg-pink-500/10 text-pink-300 hover:bg-pink-500/20"
            >
              <Trash2 className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}