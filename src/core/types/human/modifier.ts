export interface Modifier {
  name;
  min;
  max;
  defaultValue;
  setValue(value: number);
  updateValue();
}
