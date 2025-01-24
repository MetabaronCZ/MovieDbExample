export const perPages = [25, 50, 100] as const;
export const defaultPerPage = perPages[0];

export interface Movie {
  readonly id: string;
  readonly titleCs: string;
  readonly titleOriginal: string;
  readonly year: number | null;
  readonly genres: string[];
  readonly directors: string[];
  readonly writers: string[];
  readonly stars: string[];
  readonly plot: string;
  readonly score: number | null;
}

export const movieSorts = ['title', 'year', 'score'] as const;
export const movieSortDirections = ['ascending', 'descending'] as const;
export type MovieSort = (typeof movieSorts)[number];
export type MovieSortDirection = (typeof movieSortDirections)[number];

export interface MovieFilter {
  readonly query?: string;
  readonly yearFrom?: number;
  readonly yearTo?: number;
  readonly directors?: string[];
  readonly writers?: string[];
  readonly stars?: string[];
  readonly genres?: string[];
  readonly scoreFrom?: number;
  readonly scoreTo?: number;
  readonly page?: number;
  readonly perPage?: number;
  readonly sort?: MovieSort;
  readonly sortDirection?: MovieSortDirection;
}

export interface MoviesFiltered {
  readonly items: Movie[];
  readonly total: number;
}
export type FetchMovieResponse = Movie;
export type FetchMoviesResponse = MoviesFiltered;
