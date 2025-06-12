import axios from "axios";

export const fetchBlog = async () => {
  const URL = `https://dev.to/api/articles?per_page=30`;

  try {
    const response = await axios.get(URL);
    console.log("API Response:", response.data); // Log the full response

    // Check if the response contains the expected data
    if (response.data && Array.isArray(response.data)) {
      return response.data;
    } else {
      throw new Error("Invalid API response");
    }
  } catch (error) {
    console.error("Error fetching news from NewsData.io:", error.message);
    throw error;
  }
};
