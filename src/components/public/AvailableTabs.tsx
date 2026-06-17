import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IAvailability } from "@/types/availability.types";
import AvailabilityButton from "./AvailabilityButton";

export function AvailableTabs({
  availablity,
}: {
  availablity: IAvailability[];
}) {
  if (availablity.length < 0) {
    return (
      <div className="text-center py-8 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
        <p className="text-gray-500 text-sm">No available slots</p>
      </div>
    );
  }

  const groupedByDay = availablity.reduce((acc: any, av) => {
    if (!acc[av.day]) {
      acc[av.day] = [];
    }
    acc[av.day].push(av);
    return acc;
  }, {});
  const uniquedays = Object.keys(groupedByDay);
  const defaultDay = uniquedays[0];

  return (
    <Tabs defaultValue={defaultDay} orientation="horizontal">
      <TabsList className="flex-wrap h-auto! w-full">
        {uniquedays.map((day) => (
          <TabsTrigger key={day} value={day} className="grow">
            {day.slice(0, 3)}
          </TabsTrigger>
        ))}
      </TabsList>
      {uniquedays.map((day) => (
        <TabsContent key={day} value={day} className="shadow-none p-0">
          <Card className="shadow-none p-0 border-none">
            <CardContent className="text-sm text-muted-foreground shadow-none p-2">
              <div className="flex gap-1 flex-wrap">
                {groupedByDay[day].map((av: IAvailability) => (
                  <AvailabilityButton key={av.id} available={av} />
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      ))}
    </Tabs>
  );
}
