import type { AppProps } from "next/app";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { css, Global } from "@emotion/react";
import emotionReset from "emotion-reset";
import { READING_STATUS } from "@/types";

export const schema = z
  .object({
    bookTitle: z.string().min(1, "도서 제목을 입력해주세요."),
    totalPage: z
      .number("페이지 수를 입력해주세요.")
      .min(1, "책 페이지는 1페이지 이상으로 입력해주세요."),
    publicationDate: z.date("도서 출판일을 입력해주세요."),
    readingStatus: z.enum(
      Object.values(READING_STATUS),
      "독서 상태를 입력해주세요."
    ),
    readingStartDate: z.date("독서 시작일을 입력해주세요.").optional(),
    readingEndDate: z.date("독서 종료일을 입력해주세요.").optional(),
  })
  .superRefine((data, ctx) => {
    const { publicationDate, readingStartDate, readingEndDate } = data;

    // 독서 시작일은 출판일 이후여야 한다.
    if (
      readingStartDate != null &&
      publicationDate != null &&
      publicationDate > readingStartDate
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["publicationDate"],
        message: "독서 시작일은 도서 출판일 이후로 입력해주세요.",
      });
      ctx.addIssue({
        code: "custom",
        path: ["readingStartDate"],
        message: "독서 시작일은 도서 출판일 이후로 입력해주세요.",
      });
    }

    // 독서 종료일은 출판일 이후여야 한다.
    if (
      readingEndDate != null &&
      publicationDate != null &&
      publicationDate > readingEndDate
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["publicationDate"],
        message: "독서 종료일은 도서 출판일 이후로 입력해주세요.",
      });
      ctx.addIssue({
        code: "custom",
        path: ["readingEndDate"],
        message: "독서 종료일은 도서 출판일 이후로 입력해주세요.",
      });
    }

    // 독서 종료일은 시작일 이후여야 한다.
    if (
      readingEndDate != null &&
      readingStartDate != null &&
      readingStartDate > readingEndDate
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["readingStartDate"],
        message: "독서 시작일은 독서 종료일 이후로 입력해주세요.",
      });
      ctx.addIssue({
        code: "custom",
        path: ["readingEndDate"],
        message: "독서 종료일은 독서 시작일 이후로 입력해주세요.",
      });
    }
  });

type Schema = z.infer<typeof schema>;

export default function App({ Component, pageProps }: AppProps) {
  const methods = useForm<Schema>({
    resolver: zodResolver(schema),
  });

  return (
    <FormProvider {...methods}>
      <Global
        styles={css`
          ${emotionReset}
        `}
      />
      <Component {...pageProps} />
    </FormProvider>
  );
}
