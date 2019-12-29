export declare class BaseStore<T> {
    private _state$;
    protected constructor(initialState: T);
    readonly state: T;
    setState(nextState: T): void;
}
