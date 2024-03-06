import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InputState = {
  text: string;
  isEmpty: boolean;
};

const initialState: InputState = {
  text: "",
  isEmpty: false,
};

export const inputSlice = createSlice({
  name: "input",
  initialState,
  reducers: {
    setInputText: (state, action: PayloadAction<string>) => {
      state.text = action.payload;
    },
    setIsEmpty: (state, action: PayloadAction<boolean>) => {
      state.isEmpty = action.payload;
    },
  },
});

export const { setInputText, setIsEmpty } = inputSlice.actions;

export default inputSlice.reducer;
