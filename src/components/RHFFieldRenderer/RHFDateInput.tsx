import { useFormContext } from "react-hook-form";

import { Field } from "@/types";

export default function RHFDateInput({ field }: { field: Field }) {
  const { register } = useFormContext();
  const { label, name, required } = field;

  return (
    <div>
      <p>{label}</p>
      <input type="date" required={required} {...register(name)} />
    </div>
  );
}
