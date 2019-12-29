import { BaseStore } from "../base-store";
import { ProxyStoreState } from "./proxy.store.state";
export declare class ProxyStore extends BaseStore<ProxyStoreState> {
    private readonly _human;
    constructor(human: any);
    toggleProxy(proxy: any, value: any): void;
    setUpProxies(): void;
    private updateProxies;
    private toggleProxyClothesType;
}
