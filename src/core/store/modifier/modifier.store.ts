import { groups, labels } from "../../constants";
import { objectForEach } from "../../helpers/object.helpers";
import { Modifier, ModifierGroup, ModifierSubgroup } from "../../models/modifier";
import { BaseStore } from "../base-store";
import { ModifierStoreState } from "./modifier.store.state";

export class ModifierStore extends BaseStore<ModifierStoreState>  {
  private readonly _human;
  private _modelingSliders;

  constructor(human) {
    super(new ModifierStoreState());

    this._human = human;
  }

  public setModelingSliders(modelingSliders) {
    this._modelingSliders = modelingSliders;
  }

  public setModifierDefaults() {
    this.setModifierValue('macrodetails/Gender', 0);
    this.setModifierValue('macrodetails-proportions/BodyProportions', 1);
    this.setModifierValue('macrodetails-height/Height', 0.5);
  }

  public setModifierValue(modifier, value) {
    const humanModifier = this._human.modifiers.children[modifier];
    humanModifier.setValue(value);
    humanModifier.updateValue();
  }

  public setUpModifiers() {
    const modifiersGroups: ModifierGroup[] = [];
    objectForEach(this._modelingSliders, (modifierGroup, groupKey) => {
      const modifiersSubgroups: ModifierSubgroup[] = [];
      objectForEach(modifierGroup.modifiers, (modifierSubgroup, subgroupKey) => {
        const modifiers: Modifier[] = [];
        for (const modifier of modifierSubgroup) {
          const humanModifier = this._human.modifiers.children[modifier.mod];
          const label = modifier.label || humanModifier.name;
          const min = humanModifier.min;
          const max = humanModifier.max;
          const step = (max - min) / 100;
          modifiers.push({
            name: modifier.mod,
            label: labels[label],
            min,
            max,
            step,
            default: humanModifier.defaultValue
          });
        }
        modifiersSubgroups.push({
          name: subgroupKey,
          label: groups[subgroupKey],
          modifiers
        });
      });
      modifiersGroups.push({
        modifierSubgroups: modifiersSubgroups,
        name: groupKey,
        label: groups[groupKey],
      });
    });
    this.updateModifiers(modifiersGroups);
  }

  private updateModifiers(modifiers) {
    this.setState({
      ...this.state,
      modifiers,
    });
  }
}
