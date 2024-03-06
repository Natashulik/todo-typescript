import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type SelectionState = {
  selectedButton: string;
};

const initialState: SelectionState = {
  selectedButton: "all",
};

export const selectionSlice = createSlice({
  name: "selection",
  initialState,
  reducers: {
    pressButton: (state, action: PayloadAction<string>) => {
      state.selectedButton = action.payload;
    },
  },
});

export const { pressButton } = selectionSlice.actions;
export default selectionSlice.reducer;
