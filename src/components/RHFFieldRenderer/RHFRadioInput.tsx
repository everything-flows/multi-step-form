import { useFormContext } from "react-hook-form";

import { Field } from "@/types";

export default function RHFRadioInput({ field }: { field: Field }) {
  const { register } = useFormContext();
  const { label, name, options = [], required } = field;

  return (
    <div>
      <p>{label}</p>
      <div>
        {options.map((option) => (
          <label key={option}>
            <input
              type="radio"
              value={option}
              required={required}
              {...register(name)}
            />
            {option}
          </label>
        ))}
      </div>
    </div>
  );
}
