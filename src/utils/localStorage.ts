import { Task } from "../types/taskTypes";

export const saveTasks = (tasks: Task[]) => {
  const serializedTasks = JSON.stringify(tasks);
  localStorage.setItem("tasks", serializedTasks);
};

export const loadTasks = () => {
  const serializedTasks = localStorage.getItem("tasks");
  if (serializedTasks == null) {
    return [];
  }
  return JSON.parse(serializedTasks);
};

export const saveSelectedButton = (selectedButton: string) => {
  const serializedSelectedButton = JSON.stringify(selectedButton);
  localStorage.setItem("selectedButton", serializedSelectedButton);
};

export const loadSelectedButton = () => {
  const serializedSelectedButton = localStorage.getItem("selectedButton");
  if (serializedSelectedButton == null) {
    return "all";
  }
  return JSON.parse(serializedSelectedButton);
};
