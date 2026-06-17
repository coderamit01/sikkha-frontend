import { IBooking } from "@/types/booking.types";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Avatar } from "../ui/avatar";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { localTime } from "@/utils/localTime";
import { TimeDifference } from "@/utils/timeDifference";

const UpcommingSession = ({ bookings }: { bookings: IBooking[] }) => {
  if (!bookings || bookings.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Session</CardTitle>
        </CardHeader>

        <CardContent>
          <p className="text-sm text-muted-foreground">
            No upcoming sessions found.
          </p>
        </CardContent>
      </Card>
    );
  }
  const boking = bookings[0];
  const { student, availability, status } = boking;

  const timeDiff = TimeDifference(availability.startTime, availability.endTime)

  return (
    <Card className="relative">
      <CardHeader>
        <CardTitle>Upcomming Session</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-1">
          <Avatar className="h-10 w-10">
            <AvatarImage src={student.image} className="rounded-full" />
            <AvatarFallback className="bg-[#25a5a21c] text-brand font-bold h-10 w-10 flex items-center justify-center">
              {student.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <p>Name: {student.name}</p>
          <span>Day: {availability.day}</span>
          <span>Duration: {timeDiff} Hours</span>
        </div>
        <span className="absolute right-0 top-0 bg-brand text-white text-md p-2 rounded-tr-lg rounded-bl-lg capitalize">
          {status.charAt(0) + status.slice(1).toLowerCase()}
        </span>
      </CardContent>
    </Card>
  );
};

export default UpcommingSession;
