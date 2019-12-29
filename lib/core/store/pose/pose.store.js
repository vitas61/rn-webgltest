"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_store_1 = require("../base-store");
const pose_store_state_1 = require("./pose.store.state");
class PoseStore extends base_store_1.BaseStore {
    constructor(human) {
        super(new pose_store_state_1.PoseStoreState());
        this._human = human;
    }
    setPose(pose) {
        this._human.setPose(pose);
        this.updatePose(pose);
    }
    updatePose(pose) {
        this.setState({
            ...this.state,
            pose,
        });
    }
}
exports.PoseStore = PoseStore;
//# sourceMappingURL=pose.store.js.map