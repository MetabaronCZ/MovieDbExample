export const perPages = [25, 50, 100] as const;
export const defaultPerPage = perPages[0];

export const sortDirections = ['ascending', 'descending'] as const;
export type SortDirection = (typeof sortDirections)[number];
