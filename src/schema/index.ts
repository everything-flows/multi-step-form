import * as z from "zod";
import { READING_STATUS } from "@/types";

const ERROR_MESSAGE = {
  BOOK_TITLE_REQUIRED: "도서 제목을 입력해주세요.",
  TOTAL_PAGE_REQUIRED: "페이지 수를 입력해주세요.",
  TOTAL_PAGE_MINIMUM: "책 페이지는 1페이지 이상으로 입력해주세요.",
  PUBLICATION_DATE_REQUIRED: "도서 출판일을 입력해주세요.",
  READING_STATUS_REQUIRED: "독서 상태를 입력해주세요.",
  READING_START_DATE_REQUIRED: "독서 시작일을 입력해주세요.",
  READING_END_DATE_REQUIRED: "독서 종료일을 입력해주세요.",
  PUBLICATION_DATE_AFTER_READING_START_DATE:
    "독서 시작일은 도서 출판일 이후로 입력해주세요.",
  PUBLICATION_DATE_AFTER_READING_END_DATE:
    "독서 종료일은 도서 출판일 이후로 입력해주세요.",
  READING_END_DATE_AFTER_READING_START_DATE:
    "독서 종료일은 독서 시작일 이후로 입력해주세요.",
};

export const schema = z
  .object({
    bookTitle: z.string().min(1, ERROR_MESSAGE.BOOK_TITLE_REQUIRED),
    totalPage: z
      .number(ERROR_MESSAGE.TOTAL_PAGE_REQUIRED)
      .min(1, ERROR_MESSAGE.TOTAL_PAGE_MINIMUM),
    publicationDate: z.date(ERROR_MESSAGE.PUBLICATION_DATE_REQUIRED),
    readingStatus: z.enum(
      Object.values(READING_STATUS),
      ERROR_MESSAGE.READING_STATUS_REQUIRED
    ),
    readingStartDate: z
      .date(ERROR_MESSAGE.READING_START_DATE_REQUIRED)
      .optional(),
    readingEndDate: z.date(ERROR_MESSAGE.READING_END_DATE_REQUIRED).optional(),
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
        message: ERROR_MESSAGE.PUBLICATION_DATE_AFTER_READING_START_DATE,
      });
      ctx.addIssue({
        code: "custom",
        path: ["readingStartDate"],
        message: ERROR_MESSAGE.PUBLICATION_DATE_AFTER_READING_START_DATE,
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
        message: ERROR_MESSAGE.PUBLICATION_DATE_AFTER_READING_END_DATE,
      });
      ctx.addIssue({
        code: "custom",
        path: ["readingEndDate"],
        message: ERROR_MESSAGE.PUBLICATION_DATE_AFTER_READING_END_DATE,
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
        message: ERROR_MESSAGE.READING_END_DATE_AFTER_READING_START_DATE,
      });
      ctx.addIssue({
        code: "custom",
        path: ["readingEndDate"],
        message: ERROR_MESSAGE.READING_END_DATE_AFTER_READING_START_DATE,
      });
    }
  });

export type Schema = z.infer<typeof schema>;
