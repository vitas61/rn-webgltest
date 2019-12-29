import { ModifierSubgroup } from './modifier-subgroup';
export interface ModifierGroup {
    name: string;
    label: string;
    modifierSubgroups: ModifierSubgroup[];
}
