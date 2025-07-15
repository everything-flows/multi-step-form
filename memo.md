## 입력 컴포넌트

- [ ] Text
  - 도서 제목
  - 페이지 수(number)
  - 인용구 페이지 번호(number)
  - 인용구(multiline)
  - 독후감(multiline)
- [ ] Date
  - 도서 출판일
  - 독서 시작일
  - 독서 종료일
- [ ] Radio
  - 독서 상태
  - 도서 추천 여부
  - 공개 여부
- [ ] Range
  - 별점

## form 데이터 구조

```tsx
{
  label: string;
  type:; // enum..? 뭐든지 컴포넌트 매핑 가능한걸로
  required: boolean;
  hidden: boolean;
}
```

- `required` -> 별점이 2~4점인 경우 독후감은 필수 아님
- `hidden` -> 도서 상태에 따라 시작/종료일 입력 X

## 해야할거

- 독후감 입력 기준 1점인지 0점인지 확인해야함
