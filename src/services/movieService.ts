import axios from "axios";
import toast from "react-hot-toast";
import type { Movie } from "../types/movie";

interface ResponseData {
  results: Movie[];
  total_pages: number;
}

const tmdbToken = import.meta.env.VITE_TMDB_TOKEN;

const options = {
  method: "GET",

  headers: {
    accept: "application/json",
    Authorization: `Bearer ${tmdbToken}`,
  },
};

const url = `https://api.themoviedb.org/3/search/movie`;

export default async function fetchMovies(userRequest: string, page: number) {
  const response = await axios.get<ResponseData>(
    `${url}?query=${userRequest}&page=${page}`,
    options
  );
  if (response.data.results.length === 0) {
    toast.error("No movies found for your request.");
    return { results: [], total_pages: 0 };
  }
  return response.data;
}
