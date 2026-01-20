import { DOMAIN } from "@/lib/constants";
import { cookies } from "next/headers";

export const getAllCars = async (pageNumber: string) => {
  const response = await fetch(`${DOMAIN}/api/cars?pageNumber=${pageNumber}`);

  if (!response.ok) throw Error("failed to fetch cars");

  return response.json();
};

export const getSingleCar = async (carid: string) => {
  const response = await fetch(`${DOMAIN}/api/cars/${carid}`);

  if (!response.ok) throw Error("faild to fetch data");

  return response.json();
};

export const getMyCars = async () => {
  const cookieStore = await cookies();

  const response = await fetch(`${DOMAIN}/api/cars/my-cars`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
    cache: "no-store",
  });

  if (!response.ok) throw new Error("Failed to fetch my cars");

  return response.json();
};

export const getLatestCars = async () => {
  const response = await fetch(`${DOMAIN}/api/cars/latest-cars`);

  if (!response.ok) throw Error("faild to fetch data");

  return response.json();
};

export const getSearchCars = async (query: string) => {
  const response = await fetch(
    `${DOMAIN}/api/cars/search?q=${encodeURIComponent(query)}`,
  );

  if (!response.ok) throw Error("faild to fetch data");

  return response.json();
};
