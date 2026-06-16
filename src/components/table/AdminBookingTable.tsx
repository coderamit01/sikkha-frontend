"use client";
import { BookingStatus, IBooking } from "@/types/booking.types";
import { Badge } from "@/components/ui/badge";
import { TableCell, TableRow } from "@/components/ui/table";
import { useState } from "react";
import { SquarePen } from "lucide-react";
import { Role } from "@/types/user.types";
import { BookingStatusModal } from "../modal/BookingStatusModal";

const AdminBookingTable = ({ book }: { book: IBooking }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { availability, id, status, totalPrice, tutor, student, scheduleAt } =
    book;
  const scheduleDate = new Date(scheduleAt);
  const handleOpen = () => {
    setIsOpen(true);
  };

  return (
    <TableRow>
      <TableCell>{tutor.name}</TableCell>
      <TableCell>{student.name}</TableCell>
      <TableCell>{scheduleDate.toLocaleDateString()}</TableCell>
      <TableCell>
        {new Date(availability.startTime).toLocaleTimeString()}
      </TableCell>
      <TableCell>
        {new Date(availability.endTime).toLocaleTimeString()}
      </TableCell>
      <TableCell>৳{totalPrice}</TableCell>
      <TableCell className="lowercase">
        {status === BookingStatus.CONFIRMED && (
          <Badge className="bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
            {status}
          </Badge>
        )}
        {status === BookingStatus.COMPLETED && (
          <Badge className="bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300">
            {status}
          </Badge>
        )}
        {status === BookingStatus.CANCELLED && (
          <Badge className="bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300">
            {status}
          </Badge>
        )}
      </TableCell>
      <TableCell>
        <SquarePen
          onClick={handleOpen}
          className="w-6 h-6 bg-slate-200 p-1 rounded cursor-pointer"
        />
        <BookingStatusModal
          id={id}
          status={status}
          open={isOpen}
          setOpen={setIsOpen}
          role={Role.ADMIN}
        />
      </TableCell>
    </TableRow>
  );
};

export default AdminBookingTable;
