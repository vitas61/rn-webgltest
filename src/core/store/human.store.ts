import * as makehuman from 'makehuman-js';
import * as THREE     from 'three';


import { Human }            from "../types/human";
import { Targets }          from "./../models/targets"
import { BaseStore }        from './base-store';
import { HumanStoreState }  from './human.store.state';
import { ModifierStore }    from "./modifier/modifier.store";
import { PoseStore }        from "./pose/pose.store";
import { ProxyStore }       from "./proxy/proxy.store";

export class HumanStore extends BaseStore<HumanStoreState>  {

  public set modelingSliders(modelingSliders) {
    this._modelingSliders = modelingSliders;
    this.modifierStore.setModelingSliders(this._modelingSliders)
  }
  public human:         Human;
  public modifierStore: ModifierStore;
  public proxyStore:    ProxyStore;
  public poseStore:     PoseStore;

  private _modelingSliders;
  private _resources;

  constructor(resources, modelingSliders) {
    super(new HumanStoreState());

    this._resources = resources;
    this.human = new makehuman.Human(resources);

    this.human.targets  = new Targets(this.human);
    this.modifierStore  = new ModifierStore(this.human);
    this.proxyStore     = new ProxyStore(this.human);
    this.poseStore      = new PoseStore(this.human);

    this.modelingSliders = modelingSliders;
  }

  public async loadModel() {
    console.log("@@@@@@@@@@loadModelSTART")
    await this.human.loadModel();
    console.log("@@@@@@@@@@loadModelEND")
    return this.human.loadTargets(`${this._resources.baseUrl}targets/${this._resources.targets}`);
  }

  public setHumanDefaults() {
    this.proxyStore.toggleProxy('female_sportsuit01', true);
    this.proxyStore.toggleProxy('eyebrow010', true);
    this.proxyStore.toggleProxy('blondwithheadband', true);
    this.proxyStore.toggleProxy('Braid01', true);
  };

  public setPose(pose: string) {
    this.poseStore.setPose(pose);
  }

  public setColor() {
    this.human.mesh.material.materials[0].color = new THREE.Color(0.6451834425332652, 0.541358126188251, 0.46583313890034395);
  }

  public setModifierValue(name: string, value: string) {
    this.modifierStore.setModifierValue(name, value);
  }

  public setProxy(name: string, value: boolean) {
    this.proxyStore.toggleProxy(name, value);
  }

  public setMod(json) {
    const arr = []
    for(let i = 0;i<1257;i++) {
      // @ts-ignore
      arr.push(0)
    }

    // @ts-ignore
    // this.human.morphTargetInfluences = arr;
    json.forEach(item => {
      // @ts-ignore
      this.human.morphTargetInfluences[item.index] = item.value
    })
    // CODE
  }

  private updateDependencyLoadedState(dependencyLoaded) {
    this.setState({
      ...this.state,
      dependencyLoaded,
    });
  }
}
