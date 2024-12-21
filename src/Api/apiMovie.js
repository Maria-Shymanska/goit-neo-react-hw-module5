import axios from "axios";

const API_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMTQ2Yzc3N2Q3YWMxNmEyNDY0NDk5MTVjZjAwYjI4NSIsIm5iZiI6MTY4NDQwODI1NS4zNTksInN1YiI6IjY0NjYwN2JmMmJjZjY3MDE1NTgxNzRkZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.vEPee7gpb9vsINVjqjubsHxTwSrgW-HsKIlEljQ2Szo";

axios.defaults.baseURL = "https://api.themoviedb.org/3";

const options = {
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_TOKEN}`,
  },
};

//  Get to the popular films
export const getMoviesList = async () => {
  try {
    const response = await axios.get("/trending/movie/day", options);
    return response.data;
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
};

// Query to search for movies by keywords
export const searchMovie = async (query) => {
  try {
    const response = await axios.get("/search/movie", {
      ...options,
      params: { query }, // add parameter query
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
};

// Request for details
export const getMovieDetails = async (id) => {
  try {
    const response = await axios.get(`/movie/${id}`, {
      ...options,
      params: {
        language: "en-US",
        include_adult: false,
      },
    });
    console.log("get movie", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    throw error;
  }
};

//get the cast
export const getCastActor = async (id) => {
  try {
    const response = await axios.get(`/movie/${id}/credits`, {
      ...options,
      params: {
        language: "en-US",
        include_adult: false,
      },
    });
    console.log("get cast", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    throw error;
  }
};

//
export const getReviews = async (id) => {
  try {
    const response = await axios.get(`/movie/${id}/reviews`, {
      ...options,
      params: {
        language: "en-US",
        include_adult: false,
      },
    });
    console.log("get reviews", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    throw error;
  }
};

// Video
export const getVideo = async (id) => {
  try {
    const response = await axios.get(`/movie/${id}/videos`, {
      ...options,
      params: {
        language: "en-US",
        include_adult: false,
      },
    });
    console.log("get video", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching movie videos:", error);
    throw error;
  }
};
