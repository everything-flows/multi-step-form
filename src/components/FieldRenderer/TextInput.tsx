import { useFormContext } from "react-hook-form";

import { Field } from "@/types";

export default function TextInput({ field }: { field: Field }) {
  const { register } = useFormContext();
  const { label, name } = field;

  return (
    <div>
      <p>{label}</p>
      <input {...register(name)} />
    </div>
  );
}
