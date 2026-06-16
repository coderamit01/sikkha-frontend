import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IBooking } from "@/types/booking.types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getBookings } from "@/services/bookings.service";
import TutorBookingTable from "@/components/table/TutorBookingTable";

const TutorBooking = async () => {
  const data = await getBookings();
  const booking: IBooking[] = data?.data ?? [];

  return (
    <Card className="gap-4">
      <CardHeader>
        <CardTitle>All Bookings</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student Name</TableHead>
              <TableHead>Session Date</TableHead>
              <TableHead>Start</TableHead>
              <TableHead>End</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {booking.map((book) => (
              <TutorBookingTable key={book.id} book={book} />
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default TutorBooking;
