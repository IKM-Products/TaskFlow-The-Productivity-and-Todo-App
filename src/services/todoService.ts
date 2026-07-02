import type { Todo } from "@/types/todo";
import {
  getStorageItem,
  setStorageItem,
} from "@/services/localStorage";

import { getTodoStorageKey } from "@/lib/storageKeys";

const STORAGE_KEY = getTodoStorageKey();

export function getTodos(): Todo[] {
  return getStorageItem<Todo[]>(STORAGE_KEY, []);
}

export function saveTodos(todos: Todo[]): void {
  setStorageItem(STORAGE_KEY, todos);
}

export function addTodo(todo: Todo): void {
  const todos = getTodos();
  saveTodos([todo, ...todos]);
}

export function updateTodo(id: string, data: Partial<Todo>): void {
  const todos = getTodos();

  const updatedTodos = todos.map((todo) =>
    todo.id === id ? { ...todo, ...data } : todo
  );

  saveTodos(updatedTodos);
}

export function deleteTodo(id: string): void {
  const todos = getTodos();
  saveTodos(todos.filter((todo) => todo.id !== id));
}

export function toggleTodo(id: string): void {
  const todos = getTodos();

  const updatedTodos = todos.map((todo) =>
    todo.id === id ? { ...todo, completed: !todo.completed } : todo
  );

  saveTodos(updatedTodos);
}

export function clearTodos(): void {
  saveTodos([]);
}