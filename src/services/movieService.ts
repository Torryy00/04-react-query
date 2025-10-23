import axios from "axios";
import type { Movie } from "../types/movie";

const BASE_URL = "https://api.themoviedb.org/3";
const ACCESS_TOKEN = import.meta.env.VITE_TMDB_TOKEN as string;

interface FetchMoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export async function fetchMovies(query: string, page: number = 1): Promise<FetchMoviesResponse> {
  const { data } = await axios.get<FetchMoviesResponse>(`${BASE_URL}/search/movie`, {
    params: {
      query,
      page,
    },
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
  });

  return data;
}