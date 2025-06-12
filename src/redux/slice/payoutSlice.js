import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalPayout: 0,
  blogPrice: 0,
  newsPrice: 0,
};

const payoutSlice = createSlice({
  name: "payout",
  initialState,
  reducers: {
    updatePayout: (state, action) => {
      const { blogPrice, newsPrice, blogCount, newsCount } = action.payload;
      state.blogPrice = blogPrice;
      state.newsPrice = newsPrice;
      state.totalPayout =
        (blogCount * blogPrice || 0) + (newsCount * newsPrice || 0);
    },
  },
});

export const { updatePayout } = payoutSlice.actions;
export default payoutSlice.reducer;
