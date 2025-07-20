import { useFormContext } from "react-hook-form";

import { Field } from "@/types";

export default function RadioInput({ field }: { field: Field }) {
  const { register } = useFormContext();
  const { label, name, options = [] } = field;

  return (
    <div>
      <p>{label}</p>
      <div>
        {options.map((option) => (
          <label key={option}>
            <input type="radio" value={option} {...register(name)} />
            {option}
          </label>
        ))}
      </div>
    </div>
  );
}
