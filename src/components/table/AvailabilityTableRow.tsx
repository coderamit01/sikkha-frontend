"use client";
import { TableCell, TableRow } from "@/components/ui/table";
import { IAvailability } from "@/types/availability.types";
import { localTime } from "@/utils/localTime";
import { SquarePen, Trash2 } from "lucide-react";
import { Badge } from "../ui/badge";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { deleteAvailability } from "@/actions/availability.action";
import { is } from "zod/v4/locales";
import UpdateAvailabilityModal from "@/components/modal/UpdateAvailabilityModal";

const AvailabilityTableRow = ({ available }: { available: IAvailability }) => {
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);
  const { id, startTime, endTime, isBooked } = available;

  const availableDay = new Date(startTime).toLocaleDateString("en-CA", {
    weekday: "long",
  });
  const start = localTime(startTime);
  const end = localTime(endTime);

  const diffMs = Number(new Date(endTime)) - Number(new Date(startTime));
  const diffMins = diffMs / 1000 / 60;
  const diffHours = diffMins / 60;

  const handleDeleteAvailability = () => {
    startTransition(async () => {
      try {
        const result = await deleteAvailability(id);
        if (result?.success) {
          toast.success("Availability deleted successfully", {
            position: "top-right",
          });
        }
      } catch (error: any) {
        toast.error(error.message || "Failed to delete availability", {
          position: "top-right",
        });
      }
    })
  }
  const handleOpen = () => {
    setIsOpen(true);
  }

  return (
    <TableRow>
      <TableCell>{availableDay}</TableCell>
      <TableCell>{start}</TableCell>
      <TableCell>{end}</TableCell>
      <TableCell>{diffHours} hours</TableCell>
      <TableCell>
        {isBooked ? (
          <Badge className="bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
            Booked
          </Badge>
        ) : (
          <Badge className="bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300">
            Available
          </Badge>
        )}
      </TableCell>
      <TableCell className="text-right flex items-center gap-2 justify-end">
        <SquarePen onClick={handleOpen} className="w-6 h-6 cursor-pointer bg-slate-200 p-1 rounded" />
        <Trash2 onClick={handleDeleteAvailability} className={`w-6 h-6 cursor-pointer bg-red-100 text-red-600 p-1 rounded ${isPending ? "opacity-50 pointer-events-none" : ""}`} />

        <UpdateAvailabilityModal isOpen={isOpen} setIsOpen={setIsOpen} available={available} />
      </TableCell>
    </TableRow>
  );
};

export default AvailabilityTableRow;
