import { DOMAIN } from "@/lib/constants";
import { cookies } from "next/headers";

export const getUserProfile = async (userId: string) => {
  const cookieStore = await cookies();
  const response = await fetch(`${DOMAIN}/api/users/profile/${userId}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
    cache: "no-store",
  });

  if (!response.ok) throw Error("faild to fetch data");

  return response.json();
};
