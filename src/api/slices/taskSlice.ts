import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Task = {
  id: string;
  title: string;
  time: string;
  description?: string;
  severity: string;
};

type TaskState = {
  ongoingTasks: Task[];
  pendingTasks: Task[];
  selectedTask: Task | null;  // Add selectedTask to the state
};

const initialState: TaskState = {
  ongoingTasks: [],
  pendingTasks: [],
  selectedTask: null,  // Initialize it as null
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    setSelectedTask: (state, action: PayloadAction<Task>) => {
      state.selectedTask = action.payload;  // Update selectedTask in state
    },
    clearSelectedTask: (state) => {
      state.selectedTask = null;  // Clear selected task
    },
  },
});

export const { setSelectedTask, clearSelectedTask } = taskSlice.actions;

export default taskSlice.reducer;
