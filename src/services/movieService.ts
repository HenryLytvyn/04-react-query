import axios from "axios";
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

export default async function fetchMovies(
  userRequest: string,
  page: number
): Promise<ResponseData> {
  const response = await axios.get<ResponseData>(
    `${url}?query=${userRequest}&page=${page}`,
    options
  );
  return response.data;
}
