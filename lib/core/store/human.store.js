"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const makehuman = require("makehuman-js");
const THREE = require("three");
const targets_1 = require("./../models/targets");
const base_store_1 = require("./base-store");
const human_store_state_1 = require("./human.store.state");
const modifier_store_1 = require("./modifier/modifier.store");
const pose_store_1 = require("./pose/pose.store");
const proxy_store_1 = require("./proxy/proxy.store");
class HumanStore extends base_store_1.BaseStore {
    set modelingSliders(modelingSliders) {
        this._modelingSliders = modelingSliders;
        this.modifierStore.setModelingSliders(this._modelingSliders);
    }
    constructor(resources, modelingSliders) {
        super(new human_store_state_1.HumanStoreState());
        this._resources = resources;
        this.human = new makehuman.Human(resources);
        this.human.targets = new targets_1.Targets(this.human);
        this.modifierStore = new modifier_store_1.ModifierStore(this.human);
        this.proxyStore = new proxy_store_1.ProxyStore(this.human);
        this.poseStore = new pose_store_1.PoseStore(this.human);
        this.modelingSliders = modelingSliders;
    }
    async loadModel() {
        await this.human.loadModel();
        return this.human.loadTargets(`${this._resources.baseUrl}targets/${this._resources.targets}`);
    }
    setHumanDefaults() {
        this.proxyStore.toggleProxy('female_sportsuit01', true);
        this.proxyStore.toggleProxy('eyebrow010', true);
        this.proxyStore.toggleProxy('blondwithheadband', true);
        this.proxyStore.toggleProxy('Braid01', true);
    }
    ;
    setPose(pose) {
        this.poseStore.setPose(pose);
    }
    setColor() {
        this.human.mesh.material.materials[0].color = new THREE.Color(0.6451834425332652, 0.541358126188251, 0.46583313890034395);
    }
    setModifierValue(name, value) {
        this.modifierStore.setModifierValue(name, value);
    }
    setProxy(name, value) {
        this.proxyStore.toggleProxy(name, value);
    }
    setMod(json) {
        const arr = [];
        for (let i = 0; i < 1257; i++) {
            // @ts-ignore
            arr.push(0);
        }
        // @ts-ignore
        // this.human.morphTargetInfluences = arr;
        json.forEach(item => {
            // @ts-ignore
            this.human.morphTargetInfluences[item.index] = item.value;
        });
        // CODE
    }
    updateDependencyLoadedState(dependencyLoaded) {
        this.setState({
            ...this.state,
            dependencyLoaded,
        });
    }
}
exports.HumanStore = HumanStore;
//# sourceMappingURL=human.store.js.map