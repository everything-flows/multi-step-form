import { useRouter } from "next/router";
import { useFormContext } from "react-hook-form";

import { step1 } from "@/constants/step";
import RHFFieldRenderer from "@/components/RHFFieldRenderer";

export default function Step1Page() {
  const { handleSubmit } = useFormContext();
  const router = useRouter();
  const { fieldList } = step1;

  const onNext = handleSubmit(() => {
    router.push("/step2");
  });

  return (
    <form onSubmit={onNext}>
      {fieldList.map((field) => (
        <RHFFieldRenderer key={field.name} field={field} />
      ))}
      <button type="submit">다음</button>
    </form>
  );
}
