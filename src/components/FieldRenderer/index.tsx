import { Field } from "@/types";
import TextInput from "./TextInput";
import DateInput from "./DateInput";
import RadioInput from "./RadioInput";

const componentMap: Record<
  Field["type"],
  React.ComponentType<{ field: Field }>
> = {
  text: TextInput,
  date: DateInput,
  radio: RadioInput,
};

export default function FieldRenderer({ field }: { field: Field }) {
  const Component = componentMap[field.type];

  if (!Component) {
    throw new Error("[지원되지 않는 입력 타입] " + field.type);
  }

  return <Component field={field} />;
}
