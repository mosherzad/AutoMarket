import {
  getAllUsers,
  getAvailableCars,
  getBlockedUsersCount,
  getPostsCount,
  getSoldCars,
  getUsersCount,
} from "@/apiCalls/adimApiCall";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return (
    <section className="space-y-1">
      <h1 className="font-bold text-xl mb-3">Dashboard Overview</h1>
      <div className="grid gap-6 max-sm:grid-cols-2 lg:grid-cols-4">
        <Stat title="Total Users" value={usersCount.count} />
        <Stat
          title="Blocked Users"
          value={blockedUser.count}
          variant="danger"
        />
        <Stat title="Total Cars listed" value={count} />
        <Stat title="Available Cars" value={availableCars.count} />
        <Stat title="Sold Cars" value={soldCars.count} />
        <Stat title="Hidden Cars" value="—" />
        <Stat
          title="New Users (7 days)"
          value={sevenDaysUsersCount.usersSevenDaysAgoCount}
          variant="success"
        />
        <Stat
          title="New Cars (7 days)"
          value={carsSevenDaysAgoCount}
          variant="success"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Users</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground">
            List of recently registered users
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Cars</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground">
            List of recently added car posts
          </CardContent>
        </Card>
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
