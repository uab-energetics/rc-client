export interface PaginatedResult<T> {
  data: T[],
  first_page_url: string,
  from: number,
  last_page: number,
  per_page: number,
  to: number,
  total: number
}
