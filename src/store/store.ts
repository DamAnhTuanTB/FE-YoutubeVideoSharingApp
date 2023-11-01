import { configureStore } from "@reduxjs/toolkit";

// Import các reducers của bạn ở đây
import appReducer from "./appSlice";

const store = configureStore({
  reducer: {
    // Đăng ký các reducers vào store ở đây
    app: appReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
