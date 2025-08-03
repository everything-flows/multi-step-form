import { Step } from "@/types";

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
      name: "test1",
      label: "이런 입력",
      type: "text",
      required: true,
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
