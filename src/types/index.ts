export interface Field {
  name: string; // form 내에서 unique한 이름
  label: string;
  type: "text";
  required?: boolean;
  hidden?: boolean;
}

export interface Step {
  title: string;
  fieldList: Field[];
}
