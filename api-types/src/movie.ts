import { SortDirection } from './common';

export const movieGenres = [
  'Western',
  'Horror',
  'Adventure',
  'Fantasy',
  'Romance',
  'Sci-Fi',
  'Thriller',
  'Drama',
  'Comedy',
  'Crime',
  'Action',
  'Musical',
  'Mystery',
  'Music',
  'Sport',
  'Family',
  'War',
  'Film-Noir',
  'Biography',
  'History',
  'Documentary',
  'Animation',
] as const;
export type MovieGenre = (typeof movieGenres)[number];

export interface MoviePersonData {
  readonly id: string;
  readonly name: string;
}

export interface Movie {
  readonly id: string;
  readonly titleCs: string;
  readonly titleOriginal: string;
  readonly year: number | null;
  readonly genres: MovieGenre[];
  readonly directors: MoviePersonData[];
  readonly writers: MoviePersonData[];
  readonly stars: MoviePersonData[];
  readonly plot: string;
  readonly score: number | null;
}

export interface MovieData {
  readonly titleCs?: string;
  readonly titleOriginal?: string;
  readonly year?: number | null;
  readonly genres?: MovieGenre[];
  readonly directors?: string[]; // person ID
  readonly writers?: string[]; // person ID
  readonly stars?: string[]; // person ID
  readonly plot?: string;
  readonly score?: number | null;
}

export const movieSorts = ['title', 'year', 'score'] as const;
export type MovieSort = (typeof movieSorts)[number];
export const defaultMovieSort = movieSorts[1];

export interface MovieFilter {
  readonly query?: string;
  readonly yearFrom?: number;
  readonly yearTo?: number;
  readonly directors?: string[]; // person IDs
  readonly writers?: string[]; // person IDs
  readonly stars?: string[]; // person IDs
  readonly genres?: MovieGenre[];
  readonly scoreFrom?: number;
  readonly scoreTo?: number;
  readonly page?: number;
  readonly perPage?: number;
  readonly sort?: MovieSort;
  readonly sortDirection?: SortDirection;
}

export interface MoviesFiltered {
  readonly items: Movie[];
  readonly total: number;
}

export interface EditMoviePayload {
  readonly id: string;
  readonly data: MovieData;
}

export type FetchMovieResponse = Movie;
export type FetchMoviesResponse = MoviesFiltered;
