import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Ticket } from "../types/types";


interface OngoingTasksState {
  ongoingTasks: Ticket[];
}

const initialState: OngoingTasksState = {
  ongoingTasks: [],
};

const ongoingTasksSlice = createSlice({
  name: "ongoingTasks",
  initialState,
  reducers: {
    startTask: (state, action: PayloadAction<Ticket>) => {
      state.ongoingTasks.push(action.payload);
    },
  },
});

export const { startTask } = ongoingTasksSlice.actions;
export default ongoingTasksSlice.reducer;
