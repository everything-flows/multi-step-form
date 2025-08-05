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

const isValidDateResponse = (date?: Date): date is Date => {
  if (!date || !(date instanceof Date) || isNaN(date.valueOf())) {
    return false;
  }
  return true;
};

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
        <input
          {...register(FIELD_NAME.BOOK_TITLE, {
            required: "도서 제목을 입력해주세요.",
          })}
        />
        {errors[FIELD_NAME.BOOK_TITLE] && (
          <p>{errors[FIELD_NAME.BOOK_TITLE]?.message}</p>
        )}
      </div>

      <div css={inputStyle}>
        <label>페이지 수</label>
        <input
          type="number"
          {...register(FIELD_NAME.TOTAL_PAGE, {
            valueAsNumber: true,
            required: "페이지 수를 입력해주세요.",
            min: {
              value: 1,
              message: "책 페이지는 1페이지 이상으로 입력해주세요.",
            },
          })}
        />
        {errors[FIELD_NAME.TOTAL_PAGE] && (
          <p>{errors[FIELD_NAME.TOTAL_PAGE]?.message}</p>
        )}
      </div>

      <div css={inputStyle}>
        <label>도서 출판일</label>
        <input
          type="date"
          {...register(FIELD_NAME.PUBLICATION_DATE, {
            valueAsDate: true,
            required: "도서 출판일을 입력해주세요.",
          })}
        />
        {errors[FIELD_NAME.PUBLICATION_DATE] && (
          <p>{errors[FIELD_NAME.PUBLICATION_DATE]?.message}</p>
        )}
      </div>

      <div css={inputStyle}>
        <label>독서 상태</label>
        {Object.values(READING_STATUS).map((status) => (
          <label key={status}>
            <input
              type="radio"
              value={status}
              {...register(FIELD_NAME.READING_STATUS, {
                required: "독서 상태를 입력해주세요.",
              })}
            />
            {status}
          </label>
        ))}
        {errors[FIELD_NAME.READING_STATUS] && (
          <p>{errors[FIELD_NAME.READING_STATUS]?.message}</p>
        )}
      </div>

      {needReadingStartDate && (
        <div css={inputStyle}>
          <label>독서 시작일</label>
          <input
            type="date"
            {...register(FIELD_NAME.READING_START_DATE, {
              valueAsDate: true,
              validate: (value) => {
                if (!isValidDateResponse(value)) {
                  return "독서 시작일을 입력해주세요.";
                }

                const publicationDate = formData[FIELD_NAME.PUBLICATION_DATE];
                if (
                  !isValidDateResponse(publicationDate) ||
                  publicationDate > value
                ) {
                  return "독서 시작일은 도서 출판일 이후로 입력해주세요.";
                }

                return true;
              },
            })}
          />
          {errors[FIELD_NAME.READING_START_DATE] && (
            <p>{errors[FIELD_NAME.READING_START_DATE]?.message}</p>
          )}
        </div>
      )}

      {needReadingEndDate && (
        <div css={inputStyle}>
          <label>독서 종료일</label>
          <input
            type="date"
            {...register(FIELD_NAME.READING_END_DATE, {
              valueAsDate: true,
              validate: (value) => {
                if (!isValidDateResponse(value)) {
                  return "독서 종료일을 입력해주세요.";
                }

                const publicationDate = formData[FIELD_NAME.PUBLICATION_DATE];
                if (
                  !isValidDateResponse(publicationDate) ||
                  publicationDate > value
                ) {
                  return "독서 종료일은 도서 출판일 이후로 입력해주세요.";
                }

                const startDate = formData[FIELD_NAME.READING_START_DATE];
                if (!isValidDateResponse(startDate) || startDate > value) {
                  return "독서 종료일은 독서 시작일 이후로 입력해주세요.";
                }

                return true;
              },
            })}
          />
          {errors[FIELD_NAME.READING_END_DATE] && (
            <p>{errors[FIELD_NAME.READING_END_DATE]?.message}</p>
          )}
        </div>
      )}

      <button type="submit">다음</button>
    </form>
  );
}
