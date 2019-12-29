"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../../constants");
const object_helpers_1 = require("../../helpers/object.helpers");
const base_store_1 = require("../base-store");
const modifier_store_state_1 = require("./modifier.store.state");
class ModifierStore extends base_store_1.BaseStore {
    constructor(human) {
        super(new modifier_store_state_1.ModifierStoreState());
        this._human = human;
    }
    setModelingSliders(modelingSliders) {
        this._modelingSliders = modelingSliders;
    }
    setModifierDefaults() {
        this.setModifierValue('macrodetails/Gender', 0);
        this.setModifierValue('macrodetails-proportions/BodyProportions', 1);
        this.setModifierValue('macrodetails-height/Height', 0.5);
    }
    setModifierValue(modifier, value) {
        const humanModifier = this._human.modifiers.children[modifier];
        humanModifier.setValue(value);
        humanModifier.updateValue();
    }
    setUpModifiers() {
        const modifiersGroups = [];
        object_helpers_1.objectForEach(this._modelingSliders, (modifierGroup, groupKey) => {
            const modifiersSubgroups = [];
            object_helpers_1.objectForEach(modifierGroup.modifiers, (modifierSubgroup, subgroupKey) => {
                const modifiers = [];
                for (const modifier of modifierSubgroup) {
                    const humanModifier = this._human.modifiers.children[modifier.mod];
                    const label = modifier.label || humanModifier.name;
                    const min = humanModifier.min;
                    const max = humanModifier.max;
                    const step = (max - min) / 100;
                    modifiers.push({
                        name: modifier.mod,
                        label: constants_1.labels[label],
                        min,
                        max,
                        step,
                        default: humanModifier.defaultValue
                    });
                }
                modifiersSubgroups.push({
                    name: subgroupKey,
                    label: constants_1.groups[subgroupKey],
                    modifiers
                });
            });
            modifiersGroups.push({
                modifierSubgroups: modifiersSubgroups,
                name: groupKey,
                label: constants_1.groups[groupKey],
            });
        });
        this.updateModifiers(modifiersGroups);
    }
    updateModifiers(modifiers) {
        this.setState({
            ...this.state,
            modifiers,
        });
    }
}
exports.ModifierStore = ModifierStore;
//# sourceMappingURL=modifier.store.js.map