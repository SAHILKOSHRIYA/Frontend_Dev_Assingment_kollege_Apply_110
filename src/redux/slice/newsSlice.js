// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { fetchNews } from "../service/newsService";

// // Create asyncThunk

// // Create slice
// const newsSlice = createSlice({
//   name: "news",
//   initialState: {
//     articles: [],
//     status: "idle",
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchNewsData.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(fetchNewsData.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         state.articles = action.payload;
//       })
//       .addCase(fetchNewsData.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.error.message;
//       });
//   },
// });
// export default newsSlice.reducer;

// // export const fetchNewsData = createAsyncThunk("NEWS/GET", async () => {
// //   try {
// //     return await fetchNews();
// //   } catch (error) {
// //     console.error("Error fetching news:", error);
// //     throw error; // Propagate the error to the rejected case
// //   }
// // });

// // export default newsSlice.reducer;
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchNews } from "../service/newsService";  // ✅ You already wrote this

// ✅ Create the thunk BEFORE the slice
export const fetchNewsData = createAsyncThunk("NEWS/GET", async () => {
  try {
    return await fetchNews();  // Call your API
  } catch (error) {
    console.error("Error fetching news:", error);
    throw error;
  }
});
