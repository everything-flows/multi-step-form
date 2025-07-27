// import { useRouter } from "next/router";
import { css } from "@emotion/react";
import { useFormContext } from "react-hook-form";
import { FIELD_NAME, Form, READING_STATUS } from "@/types";

const formStyle = css`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const inputStyle = css`
  display: flex;
  flex-direction: column;
`;

export default function Step1Page() {
  // const router = useRouter();
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useFormContext<Form>();

  const formData = watch();

  const needReadingStartDate =
    formData.readingStatus === READING_STATUS.읽는_중 ||
    formData.readingStatus === READING_STATUS.읽음 ||
    formData.readingStatus === READING_STATUS.보류_중;
  const needReadingEndDate = formData.readingStatus === READING_STATUS.읽음;

  const onNext = handleSubmit((data) => {
    console.log("[handleSubmit]", data);
    // router.push("/step2");
  });

  return (
    <form onSubmit={onNext} css={formStyle}>
      <div css={inputStyle}>
        <label>도서 제목</label>
        <input {...register(FIELD_NAME.bookTitle)} />
        {errors.bookTitle && <p>{errors.bookTitle?.message}</p>}
      </div>

      <div css={inputStyle}>
        <label>페이지 수</label>
        <input
          type="number"
          {...(register(FIELD_NAME.totalPage), { valueAsNumber: true })}
        />
      </div>

      <div css={inputStyle}>
        <label>도서 출판일</label>
        <input
          type="date"
          {...register(FIELD_NAME.publicationDate, { valueAsDate: true })}
        />
      </div>

      <div css={inputStyle}>
        <label>독서 상태</label>
        {Object.values(READING_STATUS).map((status) => (
          <div key={status}>
            <label>
              <input
                type="radio"
                value={status}
                {...register(FIELD_NAME.readingStatus)}
              />
              {status}
            </label>
          </div>
        ))}
      </div>

      {needReadingStartDate && (
        <div css={inputStyle}>
          <label>독서 시작일</label>
          <input
            type="date"
            {...register(FIELD_NAME.readingStartDate, { valueAsDate: true })}
          />
        </div>
      )}

      {needReadingEndDate && (
        <div css={inputStyle}>
          <label>독서 종료일</label>
          <input
            type="date"
            {...register(FIELD_NAME.readingEndDate, { valueAsDate: true })}
          />
        </div>
      )}

      <button type="submit">다음</button>
    </form>
  );
}
