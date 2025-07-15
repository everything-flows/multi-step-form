import { useFormContext } from "react-hook-form";

export default function Step2Page() {
  const { register, handleSubmit } = useFormContext();

  const onSubmit = handleSubmit((data) => {
    // some action
    console.log("[submit]", data);
  });

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input {...register("test2")} placeholder="test2" />
        <button type="submit">다음</button>
      </form>
    </div>
  );
}
