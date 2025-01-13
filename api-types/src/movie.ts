export const defaultPerPage = 25;

export interface Movie {
  readonly id: string;
  readonly title: string;
  readonly year: number;
  readonly cast: string[];
  readonly genres: string[];
  readonly summary: string | null;
}

export interface MovieFilter {
  readonly query?: string;
  readonly yearFrom?: number;
  readonly yearTo?: number;
  readonly cast?: string[];
  readonly genres?: string[];
  readonly page?: number;
  readonly perPage?: number;
}
