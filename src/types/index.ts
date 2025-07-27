export const FIELD_NAME = {
  bookTitle: "bookTitle",
  totalPage: "totalPage",
  publicationDate: "publicationDate",
  readingStatus: "readingStatus",
  readingStartDate: "readingStartDate",
  readingEndDate: "readingEndDate",
} as const;

export const READING_STATUS = {
  읽고_싶은_책: "읽고 싶은 책",
  읽는_중: "읽는 중",
  읽음: "읽음",
  보류_중: "보류 중",
};

export type ReadingStatusType =
  (typeof READING_STATUS)[keyof typeof READING_STATUS];

export interface Form {
  bookTitle: string;
  totalPage: number;
  publicationDate: Date;
  readingStatus: ReadingStatusType;
  readingStartDate?: Date;
  readingEndDate?: Date;
}
