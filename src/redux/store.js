// redux/store.js
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // default: localStorage
import newsReducer from "./slice/newsSlice";
import blogReducer from "./slice/blogSlice";
import payoutReducer from "./slice/payoutSlice";
import themeReducer from "./slice/themeSlice";

// Combine all reducers
const rootReducer = combineReducers({
  news: newsReducer,
  blogs: blogReducer,
  payout: payoutReducer,
  theme: themeReducer,
});

// Persist config
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["news", "blogs", "payout"], // Persist only these slices
};

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
export default store;
