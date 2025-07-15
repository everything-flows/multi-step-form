import { Step } from "@/types";

export const step1: Step = {
  title: "도서 정보",
  fieldList: [
    {
      label: "도서 제목",
      type: "text",
      required: true,
    },
    {
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
      label: "저런 입력",
      type: "text",
      required: true,
    },
  ],
};

export const step3: Step = {
  title: "마지막 스텝",
  fieldList: [
    {
      label: "다른 입력",
      type: "text",
      required: true,
    },
  ],
};
