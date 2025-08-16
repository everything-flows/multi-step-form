import type { AppProps } from "next/app";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { css, Global } from "@emotion/react";
import emotionReset from "emotion-reset";
import { Schema, schema } from "@/schema";

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
