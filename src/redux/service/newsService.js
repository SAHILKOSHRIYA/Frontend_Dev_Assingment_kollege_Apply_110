// // src/service/newsService.js
// import axios from "axios";

// export const fetchNews = async () => {
//   const API_KEY = "pub_072d3e5d2ddc4ab897a9b2eda8c73c74"; // your NewsData.io key
//   const URL = `https://newsdata.io/api/1/news?country=in&language=en&apikey=${API_KEY}`;

//   try {
//     const response = await axios.get(URL);

//     // Check if response is OK and contains data
//     if (response.data && response.data.results) {
//       return response.data.results;
//     } else {
//       throw new Error("Invalid API response");
//     }
//   } catch (error) {
//     console.error("Error fetching news from NewsData.io:", error.message);
//     throw error;
//   }
// };

// export const fetchNews = async () => {
//   const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
//   const URL = `https://newsdata.io/api/1/news?country=in&language=en&apikey=${API_KEY}`;

//   try {
//     const response = await axios.get(URL);
//     if (response.data && response.data.results) {
//       return response.data.results;
//     } else {
//       throw new Error("Invalid API response");
//     }
//   } catch (error) {
//     console.error("Error fetching news from NewsData.io:", error.message);
//     throw error;
//   }
// };
//resolving problem
// src/service/newsService.js
import axios from "axios";

export const fetchNews = async () => {
  // ← Move your key into your .env (locally) and into Vercel/Firebase env-vars
  const API_KEY = import.meta.env.VITE_NEWSDATA_API_KEY;  
  const URL     = `https://newsdata.io/api/1/news?country=in&language=en&apikey=${API_KEY}`;

  const response = await axios.get(URL);
  console.log("raw NewsData.io response:", response.data);  // debug

  // Validate and return the array of articles
  if (Array.isArray(response.data.results)) {
    return response.data.results;
  } else {
    throw new Error("Invalid API response structure: “results” is missing");
  }
};


