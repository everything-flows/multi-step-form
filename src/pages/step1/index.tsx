import { useFormContext } from "react-hook-form";
import { useRouter } from "next/router";

export default function Step1Page() {
  const { register, handleSubmit } = useFormContext();
  const router = useRouter();

  const onNext = handleSubmit(() => {
    router.push("/step2");
  });

  return (
    <div>
      <form onSubmit={onNext}>
        <input {...register("test")} placeholder="test" />
        <button type="submit">다음</button>
      </form>
    </div>
  );
}
