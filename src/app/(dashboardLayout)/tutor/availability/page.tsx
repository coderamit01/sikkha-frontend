import AvailabilityForm from "@/components/forms/AvailabilityForm";
import TutorAvailabilityTable from "@/components/table/TutorAvailabilityTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAvailability } from "@/services/availability.service";
import { Suspense } from "react";

export default async function Availability() {
  const { data: availability } = await getAvailability();

  return (
    <div className="grid grid-cols-12 gap-5 md:gap-10">
      <div className="col-span-12 md:col-span-7">
        <Card>
          <CardHeader>
            <CardTitle>My Availability</CardTitle>
          </CardHeader>
          <CardContent>
            <Suspense fallback="Loading...">
              <TutorAvailabilityTable availability={availability} />
            </Suspense>
          </CardContent>
        </Card>
      </div>
      <div className="col-span-12 md:col-span-5">
        <Card>
          <CardHeader>
            <CardTitle>Create Availability</CardTitle>
          </CardHeader>
          <CardContent>
            <AvailabilityForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
