import axios from "axios";

const API_BASE = "https://openlibrary.org";

const api = {
  getTrending: async () => {
    const response = await axios.get(`${API_BASE}/trending/daily.json`);
    return response.data;
  },

  searchBooks: async (query) => {
    const response = await axios.get(
      `${API_BASE}/search.json?q=${encodeURIComponent(query)}&limit=24`
    );
    return response.data;
  },

  searchBySubject: async (subject, limit = 12) => {
    const response = await axios.get(
      `${API_BASE}/search.json?subject=${subject}&limit=${limit}`
    );
    return response.data;
  },

  getBookDetails: async (key) => {
    const response = await axios.get(`${API_BASE}${key}.json`);
    return response.data;
  },

  getCoverUrl: (coverId, size = "L") => {
    return coverId
      ? `https://covers.openlibrary.org/b/id/${coverId}-${size}.jpg`
      : null;
  },
};

export default api;
