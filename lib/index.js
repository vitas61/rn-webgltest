"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const THREE = require("three");
const human_store_1 = require("./core/store/human.store");
const scene_1 = require("./service/scene");
class Human {
    constructor(resources, modelingSliders, baseUrl) {
        this.store = null;
        this.scene = null;
        this.urlResources = null;
        this.urlModelingSliders = null;
        this.baseUrl = null;
        this.urlResources = resources;
        this.urlModelingSliders = modelingSliders;
        this.baseUrl = baseUrl;
    }
    async createHuman() {
        const loader = new THREE.XHRLoader();
        THREE.Cache.enabled = true;
        const resources = await this.loadResources(loader);
        const modelingSliders = await this.loadModelingSliders(loader);
        // @ts-ignore
        resources.baseUrl = this.baseUrl;
        this.store = new human_store_1.HumanStore(resources, modelingSliders);
        await this.store.loadModel();
        return true;
    }
    createScene(container) {
        // @ts-ignore
        this.scene = new scene_1.Scene(container, this.store.human);
        this.scene.setScene();
        this.scene.animate();
    }
    addHumanToScene() {
        // @ts-ignore
        this.scene.addHuman(this.store.human);
    }
    setPose(pose) {
        // @ts-ignore
        this.store.setPose(pose);
    }
    setProxy(name, value) {
        // @ts-ignore
        this.store.setProxy(name, value);
    }
    setColor() {
        // @ts-ignore
        this.store.setColor();
    }
    setCameraPosition(horizon, vertical, zoom) {
        // @ts-ignore
        this.scene.setCameraPosition(horizon, vertical, zoom);
    }
    onResize() {
        // @ts-ignore
        this.scene.onResize();
    }
    setModifierValue(name, value) {
        // @ts-ignore
        this.store.setModifierValue(name, value);
    }
    setMod(json) {
        // @ts-ignore
        this.store.setMod(json);
    }
    async loadResources(loader) {
        return new Promise((resolve, reject) => loader.load(this.urlResources, 
        // tslint:disable-next-line:no-shadowed-variable
        (data) => resolve(JSON.parse(data))));
    }
    async loadModelingSliders(loader) {
        return new Promise((resolve, reject) => loader.load(this.urlModelingSliders, 
        // tslint:disable-next-line:no-shadowed-variable
        (data) => resolve(JSON.parse(data))));
    }
}
exports.Human = Human;
//# sourceMappingURL=index.js.map