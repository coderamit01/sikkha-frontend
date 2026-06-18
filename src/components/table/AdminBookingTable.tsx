"use client";
import { BookingStatus, IBooking } from "@/types/booking.types";
import { Badge } from "@/components/ui/badge";
import { TableCell, TableRow } from "@/components/ui/table";
import { useState } from "react";
import { SquarePen } from "lucide-react";
import { Role } from "@/types/user.types";
import { BookingStatusModal } from "../modal/BookingStatusModal";
import { localTime } from "@/utils/localTime";

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
      <TableCell>{tutor?.user?.name}</TableCell>
      <TableCell>{student.name}</TableCell>
      <TableCell className="capitalize">{availability.day.toLocaleLowerCase()}</TableCell>
      <TableCell>
        {localTime(availability.startTime)}
      </TableCell>
      <TableCell>
        {localTime(availability.endTime)}
      </TableCell>
      <TableCell>৳{totalPrice}</TableCell>
      <TableCell className="lowercase">
        {status === BookingStatus.PENDING && (
          <Badge className="bg-orange-50 text-orange-700 dark:bg-orange-950 dark:text-orange-300">
            {status}
          </Badge>
        )}
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
