// src/redux/slice/blogSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchBlog } from "../service/blogService";

export const fetchBlogData = createAsyncThunk("BLOG/GET", async () => {
  try {
    return await fetchBlog(); // This will return the blog data array
  } catch (error) {
    console.error("Error fetching news:", error);
    throw error; // Propagate the error
  }
});

const blogSlice = createSlice({
  name: "blog",
  initialState: {
    blogArticles: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBlogData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.blogArticles = action.payload;
      })
      .addCase(fetchBlogData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default blogSlice.reducer;
