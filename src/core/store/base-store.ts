import {BehaviorSubject} from 'rxjs';

export class BaseStore<T> {
  private _state$: BehaviorSubject<T>;

  protected constructor (initialState: T) {
    this._state$ = new BehaviorSubject(initialState);
  }

  get state (): T {
    return this._state$.getValue();
  }

  public setState (nextState: T): void {
    this._state$.next(nextState);
  }
}
