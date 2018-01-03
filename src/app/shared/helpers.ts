import {Observable} from 'rxjs/Observable';

export function loadingPipe<T>(observable: Observable<T>): Observable<T> {
  return observable
    .do(() => this.loading++)
    .finally(() => this.loading--);
}
