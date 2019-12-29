export interface Modifier {
    name: string;
    label: string;
    min: number;
    max: number;
    default: number;
    step: number;
    value?: number;
}
