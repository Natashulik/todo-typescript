import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Task } from "../types/taskTypes";

type ListState = {
  tasks: Task[];
};

const initialState: ListState = {
  tasks: [
    {
      id: 1,
      title: "shopping",
      completed: false,
      editMode: false,
    },
    {
      id: 2,
      title: "shopping",
      completed: false,
      editMode: false,
    },
    {
      id: 3,
      title: "more shopping",
      completed: false,
      editMode: false,
    },
  ],
};

export const listSlice = createSlice({
  name: "list",
  initialState,
  reducers: {
    setNewTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
    },
    changeTaskTitle: (state, action) => {
      const { id, newTitle } = action.payload;
      state.tasks = state.tasks.map((item) =>
        item.id !== action.payload.id
          ? item
          : { ...item, title: action.payload.newTitle }
      );
    },
    deleteTask: (state, action: PayloadAction<number>) => {
      state.tasks = state.tasks.filter((item) => item.id !== action.payload);
    },
    editTask: (state, action: PayloadAction<number>) => {
      state.tasks = state.tasks.map((item) =>
        item.id === action.payload
          ? { ...item, editMode: !item.editMode }
          : item
      );
    },
    setIsCompleted: (
      state,
      action: PayloadAction<{ id: number; completed: boolean }>
    ) => {
      state.tasks = state.tasks.map((item) =>
        item.id === action.payload.id
          ? { ...item, completed: !item.completed }
          : item
      );
    },
  },
});

export const {
  setNewTask,
  changeTaskTitle,
  deleteTask,
  editTask,
  setIsCompleted,
} = listSlice.actions;
export default listSlice.reducer;
