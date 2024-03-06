import { configureStore } from "@reduxjs/toolkit";
import listReducer from "./listSlice";
import inputReducer from "./inputSlice";
import selectionReducer from "./selectionSlice";

const store = configureStore({
  reducer: {
    input: inputReducer,
    list: listReducer,
    selection: selectionReducer,
  },
});

export default store;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
