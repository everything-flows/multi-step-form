export interface Field {
  label: string;
  type: "text";
  required?: boolean;
  hidden?: boolean;
}

export interface Step {
  title: string;
  fieldList: Field[];
}
