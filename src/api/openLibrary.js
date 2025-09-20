import axios from "axios";

const API_BASE = "https://openlibrary.org";

const DEFAULT_RETRIES = 3;

const fetchWithRetry = async (url, retries = DEFAULT_RETRIES) => {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 500) {
        console.warn(`Attempt ${attempt} failed with 500. Retrying...`);
        await new Promise((resolve) => setTimeout(resolve, 500 * attempt));
      } else {
        console.error(
          "OpenLibrary API error:",
          error.response?.status,
          error.message
        );
        return null;
      }
    }
  }
  console.error(`All ${retries} attempts failed for URL: ${url}`);
  return null;
};

const api = {
  getTrending: async () => {
    return await fetchWithRetry(`${API_BASE}/trending/daily.json`);
  },

  searchBooks: async (query) => {
    const url = `${API_BASE}/search.json?q=${encodeURIComponent(
      query
    )}&limit=24`;
    return await fetchWithRetry(url);
  },

  searchBySubject: async (subject, limit = 12) => {
    const url = `${API_BASE}/search.json?subject=${encodeURIComponent(
      subject
    )}&limit=${limit}`;
    return await fetchWithRetry(url);
  },

  getBookDetails: async (key) => {
    const url = `${API_BASE}${key}.json`;
    return await fetchWithRetry(url);
  },

  getCoverUrl: (coverId, size = "L") => {
    return coverId
      ? `https://covers.openlibrary.org/b/id/${coverId}-${size}.jpg`
      : null;
  },
};

export default api;
