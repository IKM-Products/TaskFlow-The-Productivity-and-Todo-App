const CURRENT_USER_KEY = "taskflow_current_user";

export function getTodoStorageKey() {
  const user = JSON.parse(localStorage.getItem(CURRENT_USER_KEY) || "{}");

  if (!user.id) {
    return "advanced_todos_guest";
  }

  return `advanced_todos_${user.id}`;
}