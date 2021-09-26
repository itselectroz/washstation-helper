import { configureStore } from "@reduxjs/toolkit";
import { washstationApi } from "../services/washstation-service";
import userReducer from "../features/user/user-slice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        [washstationApi.reducerPath]: washstationApi.reducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(washstationApi.middleware);
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;