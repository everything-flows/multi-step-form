import type { AppProps } from "next/app";
import { FormProvider, useForm } from "react-hook-form";

export default function App({ Component, pageProps }: AppProps) {
  const methods = useForm();

  return (
    <FormProvider {...methods}>
      <Component {...pageProps} />
    </FormProvider>
  );
}
