import { clothes, groups, labels } from "../../constants";
import { groupBy } from "../../helpers/group.helpers";
import { objectForEach } from "../../helpers/object.helpers";
import { Clothes, ClothesTypeGroup, SexGroup } from "../../models/clothes";
import { Modifier, ModifierGroup, ModifierSubgroup } from "../../models/modifier";
import { BaseStore } from "../base-store";
import { PoseStoreState } from "./pose.store.state";

export class PoseStore extends BaseStore<PoseStoreState>  {
  private readonly _human;

  constructor(human) {
    super(new PoseStoreState());

    this._human = human;
  }

  public setPose(pose) {
    this._human.setPose(pose);
    this.updatePose(pose);
  }

  private updatePose(pose) {
    this.setState({
      ...this.state,
      pose,
    });
  }


}
