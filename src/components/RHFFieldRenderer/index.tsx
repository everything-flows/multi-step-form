import { Field } from "@/types";
import RHFTextInput from "./RHFTextInput";
import RHFDateInput from "./RHFDateInput";
import RHFRadioInput from "./RHFRadioInput";
import { useFormContext } from "react-hook-form";

const componentMap: Record<
  Field["type"],
  React.ComponentType<{ field: Field }>
> = {
  text: RHFTextInput,
  date: RHFDateInput,
  radio: RHFRadioInput,
};

export default function FieldRenderer({ field }: { field: Field }) {
  const { watch } = useFormContext();
  const formValues = watch();

  const { type, hidden } = field;
  const Component = componentMap[type];

  if (!Component) {
    throw new Error("[지원되지 않는 입력 타입] " + type);
  }

  const isHidden = typeof hidden === "function" && hidden(formValues);
  if (isHidden) {
    return null;
  }
  return <Component field={field} />;
}
