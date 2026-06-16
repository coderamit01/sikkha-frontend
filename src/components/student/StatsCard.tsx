import { Card, CardContent } from "@/components/ui/card";

export const StatsCard = ({
  icon,
  title,
  count,
}: {
  icon: React.ReactNode;
  title: string;
  count: number | string;
}) => {
  return (
    <Card className="card">
      <CardContent className="flex flex-col lg:flex-row gap-4 px-3 lg:px-6">
        <div className="pb-3">{icon}</div>
        <div className="flex flex-col">
          <h4 className="text-xl font-semibold">{count}</h4>
          <p className="text-base">{title}</p>
        </div>
      </CardContent>
    </Card>
  );
};
