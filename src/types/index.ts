export interface Field {
  name: string; // form 내에서 unique한 이름
  label: string;
  type: "text" | "date" | "radio";
  options?: string[]; // type이 radio일 때만 사용
  required?: boolean;
  hidden?: boolean;
}

export interface Step {
  title: string;
  fieldList: Field[];
}
