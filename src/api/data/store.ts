import { configureStore } from "@reduxjs/toolkit";
import { api } from "../base";
import ongoingTasksReducer from '@/src/api/slices/ongoingTaskSlice';
import taskReducer from '@/src/api/slices/taskSlice';


const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
        task: taskReducer,
        ongoingTasks: ongoingTasksReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
