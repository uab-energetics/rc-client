export interface PaginatedResult<T> {
  data: T[],
  current_page: number,
  first_page_url: string,
  from: number,
  last_page: number,
  per_page: number,
  to: number,
  total: number
}
