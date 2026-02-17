import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";

import en from "@/messages/en.json";
import ckb from "@/messages/ckb.json";
import ar from "@/messages/ar.json";
const messagesMap = {
  en,
  ckb,
  ar,
};
export default getRequestConfig(async ({ requestLocale }) => {
  // Typically corresponds to the `[locale]` segment
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  return {
    locale,
    messages: messagesMap[locale],
  };
});
