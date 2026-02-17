"use client";

import { MdClose } from "react-icons/md";
import { useSearchParams } from "next/navigation";
import { useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
type Props = {
  open: boolean;
  onClose: () => void;
};

const FilterBox = ({ open, onClose }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const t = useTranslations("filterBox");
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const params = new URLSearchParams(searchParams.toString());

    params.set("pageNumber", "1");

    for (const [key, value] of formData.entries()) {
      if (value) {
        params.set(key, value.toString());
      } else {
        params.delete(key);
      }
    }

    router.push(`/explore?${params.toString()}`);
    onClose();
  };

  return (
    <div
      className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-59 transition-all duration-200 ${
        open ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        className={`fixed left-0 top-0 h-full w-full md:w-lg bg-white p-5 overflow-y-auto transition-all duration-200 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between text-md md:text-xl font-semibold">
          <h1>{t("title")}</h1>
          <MdClose
            onClick={onClose}
            className="cursor-pointer text-2xl hover:bg-gray-100 rounded-full"
          />
        </div>

        <hr className="my-3" />

        <form onSubmit={onSubmit} className="flex flex-col gap-9">
          <div className="flex flex-col">
            {" "}
            <label className="font-semibold">{t("brand")}</label>{" "}
            <input
              type="text"
              name="brand"
              placeholder="Brand"
              className="p-3 border border-gray-300 rounded-lg"
            />{" "}
          </div>{" "}
          <div className="flex flex-col">
            {" "}
            <label className="font-semibold">{t("minPrice")}</label>{" "}
            <input
              type="number"
              name="minPrice"
              placeholder="Minimam Price"
              className="p-3 border border-gray-300 rounded-lg"
            />{" "}
          </div>{" "}
          <div className="flex flex-col">
            {" "}
            <label className="font-semibold">{t("maxPrice")}</label>{" "}
            <input
              type="number"
              name="maxPrice"
              placeholder="Maximam Price"
              className="p-3 border border-gray-300 rounded-lg"
            />{" "}
          </div>{" "}
          <div className="flex flex-col gap-1">
            {" "}
            <label className="font-semibold">{t("carType")}</label>{" "}
            <select
              name="carType"
              className="border rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {" "}
              <option value="">{t("allTypes")}</option>{" "}
              <option value="SEDAN">Sedan</option>{" "}
              <option value="SUV">SUV</option>{" "}
              <option value="HATCHBACK">Hatchback</option>{" "}
              <option value="COUPE">Coupe</option>{" "}
              <option value="PICKUP">Pickup</option>{" "}
              <option value="SPORT">Sport</option>{" "}
              <option value="VAN">Van</option>{" "}
              <option value="CROSSOVER">Crossover</option>
              <option value="WAGON">Wagon</option>
              <option value="MINIVAN">Minivan</option>
              <option value="CONVERTIBLE">Convertible</option>
            </select>{" "}
          </div>{" "}
          <div className="flex flex-col gap-1">
            {" "}
            <label className="font-semibold">{t("fuelType")}</label>{" "}
            <select
              name="fuel"
              className="border rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {" "}
              <option value="">{t(`fuel.${`all`}`)}</option>{" "}
              <option value="PETROL">{t(`fuel.${`PETROL`}`)}</option>{" "}
              <option value="DIESEL">{t(`fuel.${`DIESEL`}`)}</option>{" "}
              <option value="HYBRID">{t(`fuel.${`HYBRID`}`)}</option>{" "}
              <option value="ELECTRIC">{t(`fuel.${`ELECTRIC`}`)}</option>{" "}
            </select>{" "}
          </div>{" "}
          <div className="flex flex-col gap-1">
            {" "}
            <label className="font-semibold">{t("cylinder")}</label>{" "}
            <select
              name="cylinder"
              className="border rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {" "}
              <option value="">{t("allCylinders")}</option>{" "}
              <option value="3">3</option> <option value="4">4</option>{" "}
              <option value="6">6</option> <option value="8">8</option>{" "}
              <option value="12">12</option> <option value="16">16</option>{" "}
            </select>{" "}
          </div>{" "}
          <div className="flex flex-col gap-1">
            {" "}
            <label className="font-semibold">{t("status")}</label>{" "}
            <select
              name="status"
              className="border rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {" "}
              <option value="">{t(`carStatus.${"all"}`)}</option>{" "}
              <option value="AVAILABLE">{t(`carStatus.${"AVAILABLE"}`)}</option>{" "}
              <option value="SOLD">{t(`carStatus.${"SOLD"}`)}</option>{" "}
            </select>{" "}
          </div>
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-100 px-5 py-2 rounded-md cursor-pointer hover:bg-gray-300 transition-all duration-200"
            >
              {t("cancel")}
            </button>
            <button
              type="submit"
              className="bg-red-600 text-white px-5 py-2 rounded-md transition-all cursor-pointer duration-200 hover:bg-red-500"
            >
              {t("apply")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FilterBox;
