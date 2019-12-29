import { Human } from "../types/human";
import { BaseStore } from './base-store';
import { HumanStoreState } from './human.store.state';
import { ModifierStore } from "./modifier/modifier.store";
import { PoseStore } from "./pose/pose.store";
import { ProxyStore } from "./proxy/proxy.store";
export declare class HumanStore extends BaseStore<HumanStoreState> {
    modelingSliders: any;
    human: Human;
    modifierStore: ModifierStore;
    proxyStore: ProxyStore;
    poseStore: PoseStore;
    private _modelingSliders;
    private _resources;
    constructor(resources: any, modelingSliders: any);
    loadModel(): Promise<any>;
    setHumanDefaults(): void;
    setPose(pose: string): void;
    setColor(): void;
    setModifierValue(name: string, value: string): void;
    setProxy(name: string, value: boolean): void;
    setMod(json: any): void;
    private updateDependencyLoadedState;
}
