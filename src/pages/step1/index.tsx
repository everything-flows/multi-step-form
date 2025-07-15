import { useFormContext } from "react-hook-form";
import { useRouter } from "next/router";
import { step1 } from "@/constants/step";

export default function Step1Page() {
  const { register, handleSubmit } = useFormContext();
  const router = useRouter();
  const { fieldList } = step1;

  const onNext = handleSubmit(() => {
    router.push("/step2");
  });

  return (
    <div>
      <form onSubmit={onNext}>
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
