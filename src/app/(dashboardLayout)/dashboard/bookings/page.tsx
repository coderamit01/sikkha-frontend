import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UserBookTable } from "@/components/table/UserBookTable";
import { IBooking } from "@/types/booking.types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getBookings } from "@/services/bookings.service";

const UserBookingsPage = async () => {
  const data = await getBookings();
  const booking: IBooking[] = data?.data ?? [];

  return (
    <Card className="gap-4">
      <CardHeader>
        <CardTitle>My Bookings</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tutor Name</TableHead>
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
              <UserBookTable key={book.id} book={book} />
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default UserBookingsPage;
