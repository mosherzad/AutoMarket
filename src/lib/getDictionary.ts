import "server-only";

const dictionaries = {
  en: () => import("@/messages/en.json").then((m) => m.default),
  //   ar: () => import("@/messages/ar.json").then((m) => m.default),
  ku: () => import("@/messages/ku.json").then((m) => m.default),
};

export async function getDictionary(locale: "en" | "ku") {
  return dictionaries[locale]();
}
