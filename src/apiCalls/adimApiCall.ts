import { DOMAIN } from "@/lib/constants";
import { cookies } from "next/headers";

const cookieStore = await cookies();

export const getPostsCount = async () => {
  const response = await fetch(`${DOMAIN}/api/admin/cars/count`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
    cache: "no-cache",
  });

  if (!response.ok) throw Error("faild to fetch data");

  return response.json();
};

export const getBlockedUsersCount = async () => {
  const response = await fetch(`${DOMAIN}/api/admin/users/blocked`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
    cache: "no-cache",
  });

  if (!response.ok) throw Error("faild to fetch data");

  return response.json();
};

export const getUsersCount = async () => {
  const response = await fetch(`${DOMAIN}/api/users/count`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
    cache: "no-cache",
  });

  if (!response.ok) throw Error("faild to fetch data");

  return response.json();
};

export const getAllUsers = async () => {
  const response = await fetch(`${DOMAIN}/api/admin/users`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
    cache: "no-cache",
  });

  if (!response.ok) throw Error("faild to fetch data");

  return response.json();
};

export const getAllCars = async (pageNumber: string) => {
  const response = await fetch(
    `${DOMAIN}/api/admin/cars?pageNumber=${pageNumber}`,
    {
      headers: {
        Cookie: cookieStore.toString(),
      },
      cache: "no-cache",
    }
  );

  if (!response.ok) throw Error("faild to fetch data");

  return response.json();
};

export const getAvailableCars = async () => {
  const response = await fetch(`${DOMAIN}/api/admin/cars/available`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
    cache: "no-cache",
  });

  if (!response.ok) throw Error();

  return response.json();
};

export const getSoldCars = async () => {
  const response = await fetch(`${DOMAIN}/api/admin/cars/sold`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
    cache: "no-cache",
  });

  if (!response.ok) throw Error();

  return response.json();
};
