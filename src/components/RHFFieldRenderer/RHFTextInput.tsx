import { useFormContext } from "react-hook-form";

import { Field } from "@/types";

export default function RHFTextInput({ field }: { field: Field }) {
  const { register } = useFormContext();
  const { label, name, required } = field;

  return (
    <div>
      <p>{label}</p>
      <input required={required} {...register(name)} />
    </div>
  );
}
