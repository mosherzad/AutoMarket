import {
  getAllUsers,
  getAvailableCars,
  getBlockedUsersCount,
  getPostsCount,
  getSoldCars,
  getUsersCount,
} from "@/apiCalls/adimApiCall";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getTranslations } from "next-intl/server";

export default async function AdminOverviewUI() {
  const [
    postsCount,
    blockedUser,
    usersCount,
    availableCars,
    soldCars,
    sevenDaysUsersCount,
  ] = await Promise.all([
    getPostsCount(),
    getBlockedUsersCount(),
    getUsersCount(),
    getAvailableCars(),
    getSoldCars(),
    getAllUsers(),
  ]);
  const { count, carsSevenDaysAgoCount } = postsCount;
  const t = await getTranslations("adminPage");
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return (
    <section className="space-y-1">
      <h1 className="font-bold text-xl mb-3">{t("dashboardOverview")}</h1>
      <div className="grid gap-6 max-sm:grid-cols-2 lg:grid-cols-3">
        <Stat title={t("totalUsers")} value={usersCount.count} />
        <Stat
          title={t("blockedUsers")}
          value={blockedUser.count}
          variant="danger"
        />
        <Stat title={t("totalCarsListed")} value={count} />
        <Stat title={t("availableCars")} value={availableCars.count} />
        <Stat title={t("soldCars")} value={soldCars.count} />
        <Stat
          title={t("newUsers7Days")}
          value={sevenDaysUsersCount.usersSevenDaysAgoCount}
          variant="success"
        />
        <Stat
          title={t("newCars7Days")}
          value={carsSevenDaysAgoCount}
          variant="success"
        />
      </div>
    </section>
  );
}

function Stat({
  title,
  value,
  variant,
}: {
  title: string;
  value: string | number;
  variant?: "danger" | "success";
}) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm text-muted-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent
        className={`text-3xl font-bold ${
          variant === "danger"
            ? "text-red-600"
            : variant === "success"
              ? "text-green-600"
              : ""
        }`}
      >
        {value}
      </CardContent>
    </Card>
  );
}
