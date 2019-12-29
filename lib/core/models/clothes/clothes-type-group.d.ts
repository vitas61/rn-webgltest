import { Clothes } from './clothes';
export interface ClothesTypeGroup {
    name: string;
    active?: boolean;
    clothes: Clothes[];
}
