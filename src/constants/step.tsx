import { Step } from "@/types";
import type { FieldValues } from "react-hook-form";

export const step1: Step = {
  title: "도서 정보",
  fieldList: [
    {
      name: "bookTitle",
      label: "도서 제목",
      type: "text",
      required: true,
    },
    {
      name: "totalPage",
      label: "페이지 수",
      type: "text", // FIXME: number로 변경
      required: true,
    },
    {
      name: "publicationDate",
      label: "도서 출판일",
      type: "date",
      required: true,
    },
    {
      name: "readingStatus",
      label: "독서 상태",
      type: "radio",
      options: ["읽고 싶은 책", "읽는 중", "읽음", "보류 중"],
      required: true,
    },
    {
      name: "readingStartDate",
      label: "독서 시작일",
      type: "date",
      hidden(props: FieldValues) {
        const { readingStatus } = props;
        if (
          readingStatus === "읽는 중" ||
          readingStatus === "읽음" ||
          readingStatus === "보류 중"
        ) {
          return false;
        }
        return true;
      },
    },
    {
      name: "readingEndDate",
      label: "독서 종료일",
      type: "date",
      hidden(props: FieldValues) {
        const { readingStatus } = props;
        if (readingStatus === "읽음") {
          return false;
        }
        return true;
      },
    },
  ],
};

export const step2: Step = {
  title: "다음 스텝",
  fieldList: [
    {
      name: "test2",
      label: "저런 입력",
      type: "text",
      required: true,
    },
    {
      name: "test3",
      label: "마지막 입력",
      type: "text",
      required: true,
    },
  ],
};
