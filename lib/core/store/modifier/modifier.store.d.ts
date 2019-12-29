import { BaseStore } from "../base-store";
import { ModifierStoreState } from "./modifier.store.state";
export declare class ModifierStore extends BaseStore<ModifierStoreState> {
    private readonly _human;
    private _modelingSliders;
    constructor(human: any);
    setModelingSliders(modelingSliders: any): void;
    setModifierDefaults(): void;
    setModifierValue(modifier: any, value: any): void;
    setUpModifiers(): void;
    private updateModifiers;
}
