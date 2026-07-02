import { useEffect, useState } from "react";
import type { Todo } from "@/types/todo";
import {
  addTodo,
  clearTodos,
  deleteTodo,
  getTodos,
  saveTodos,
  toggleTodo,
  updateTodo,
} from "@/services/todoService";

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    setTodos(getTodos());
  }, []);

  const refreshTodos = () => {
    setTodos(getTodos());
  };

  const createTodo = (todo: Todo) => {
    addTodo(todo);
    refreshTodos();
  };

  const editTodo = (id: string, data: Partial<Todo>) => {
    updateTodo(id, data);
    refreshTodos();
  };

  const removeTodo = (id: string) => {
    deleteTodo(id);
    refreshTodos();
  };

  const toggleComplete = (id: string) => {
    toggleTodo(id);
    refreshTodos();
  };

  const removeAllTodos = () => {
    clearTodos();
    refreshTodos();
  };

  const replaceTodos = (updatedTodos: Todo[]) => {
    saveTodos(updatedTodos);
    setTodos(updatedTodos);
  };

  return {
    todos,
    createTodo,
    editTodo,
    removeTodo,
    toggleComplete,
    removeAllTodos,
    replaceTodos,
    refreshTodos,
  };
}