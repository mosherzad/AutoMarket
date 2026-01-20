import { Card, CardContent, CardHeader } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

const OverviewCardSkeleton = () => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <Skeleton className="w-9 h-2" />
      </CardHeader>
      <CardContent>
        <Skeleton className="w-6 h-2" />
      </CardContent>
    </Card>
  );
};

export default OverviewCardSkeleton;
