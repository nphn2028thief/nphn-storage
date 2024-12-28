import { getRequestConfig } from "next-intl/server";
import { headers } from "next/headers";

export default getRequestConfig(async () => {
  // Provide a static locale, fetch a user setting,
  // read from `cookies()`, `headers()`, etc.
  const acceptLanguage = (await headers()).get("accept-language");
  const locale =
    acceptLanguage && acceptLanguage.split(",")[0] !== "vi-VN"
      ? acceptLanguage.split(",")[0]
      : "en-US";

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
