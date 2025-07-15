import { step2 } from "@/constants/step";
import { useFormContext } from "react-hook-form";

export default function Step2Page() {
  const { register, handleSubmit } = useFormContext();
  const { fieldList } = step2;

  const onSubmit = handleSubmit((data) => {
    // some action
    console.log("[submit]", data);
  });

  return (
    <div>
      <form onSubmit={onSubmit}>
        {fieldList.map((field) => (
          <div key={field.name}>
            <p>{field.label}</p>
            <input {...register(field.name)} />
          </div>
        ))}
        <button type="submit">다음</button>
      </form>
    </div>
  );
}
