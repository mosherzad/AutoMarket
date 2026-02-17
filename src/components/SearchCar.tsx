"use client";

import { useState } from "react";
import { MdSearch } from "react-icons/md";
import { toast } from "react-toastify";
import { useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
const SearchCar = () => {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const t = useTranslations("searchInput");
  const handleSeach = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!query.trim()) return;

      router.push(`/search?q=${encodeURIComponent(query)}`);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.response.data.error || "Something went wrong!");
    }
  };
  return (
    <form
      onSubmit={handleSeach}
      className="flex items-center justify-center my-7"
    >
      <div className="relative flex items-center">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t("seachPlaceholder")}
          className="px-6 py-3 rounded-lg bg-white border w-70 lg:w-xl"
        />
        <MdSearch className="absolute top-3 inset-inline-end-4 text-xl" />
      </div>
    </form>
  );
};
export default SearchCar;
