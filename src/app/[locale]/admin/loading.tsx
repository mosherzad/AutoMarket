import OverviewCardSkeleton from "@/components/OverviewCardSkeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const loading = () => {
  return (
    <section className="space-y-6">
      <Skeleton className="w-40 h-3" />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <OverviewCardSkeleton />
        <OverviewCardSkeleton />
        <OverviewCardSkeleton />
        <OverviewCardSkeleton />
        <OverviewCardSkeleton />
        <OverviewCardSkeleton />
        <OverviewCardSkeleton />
        <OverviewCardSkeleton />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <Skeleton className="w-10 h-2" />
          </CardHeader>
          <CardContent className="text-muted-foreground">
            <Skeleton className="w-25 h-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Skeleton className="w-10 h-2" />
          </CardHeader>
          <CardContent className="text-muted-foreground">
            <Skeleton className="w-25 h-2" />
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default loading;
