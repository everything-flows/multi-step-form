import type { AppProps } from "next/app";
import { FormProvider, useForm } from "react-hook-form";
import { css, Global } from "@emotion/react";
import emotionReset from "emotion-reset";

export default function App({ Component, pageProps }: AppProps) {
  const methods = useForm();

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
