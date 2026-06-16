import { IBooking } from "@/types/booking.types";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Avatar } from "../ui/avatar";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

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

  const start = new Date(availability.startTime);
  const end = new Date(availability.endTime);

  const date =
    start.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    }) +
    " · " +
    start.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

  const diffMs =
    Number(new Date(availability.endTime)) -
    Number(new Date(availability.startTime));
  const diffMins = diffMs / 1000 / 60;
  const diffHours = diffMins / 60;

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
          <span>Date: {date}</span>
          <span>Duration: {diffHours} Hours</span>
        </div>
        <span className="absolute right-0 top-0 bg-brand text-white text-md p-2 rounded-tr-lg rounded-bl-lg capitalize">
          {status.charAt(0) + status.slice(1).toLowerCase()}
        </span>
      </CardContent>
    </Card>
  );
};

export default UpcommingSession;
