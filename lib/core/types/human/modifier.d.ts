export interface Modifier {
    name: any;
    min: any;
    max: any;
    defaultValue: any;
    setValue(value: number): any;
    updateValue(): any;
}
