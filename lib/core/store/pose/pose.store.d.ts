import { BaseStore } from "../base-store";
import { PoseStoreState } from "./pose.store.state";
export declare class PoseStore extends BaseStore<PoseStoreState> {
    private readonly _human;
    constructor(human: any);
    setPose(pose: any): void;
    private updatePose;
}
