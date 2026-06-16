"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { BookingStatus } from "@/types/booking.types";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useState, useTransition } from "react";
import { updateBookingStatus } from "@/actions/booking.action";
import { Role } from "@/types/user.types";

export const BookingStatusModal = ({
  id,
  status,
  open,
  setOpen,
  role,
}: {
  id: string;
  status: BookingStatus;
  open: boolean;
  setOpen: (open: boolean) => void;
  role: Role;
}) => {
  const [selectedStatus, setSelectedStatus] = useState<BookingStatus>(status);
  const [isPending, startTransition] = useTransition();
  const bookStatus = Object.keys(BookingStatus).filter((k) => {
    switch (role) {
      case Role.STUDENT:
        return k !== BookingStatus.COMPLETED;
      case Role.TUTOR:
        return k !== BookingStatus.CANCELLED;
      case Role.ADMIN:
        return k;
    }
  });

  const handleUpdate = () => {
    startTransition(async () => {
      try {
        const result = await updateBookingStatus(id, selectedStatus);
        if (result?.success) {
          toast.success("Status updated successfully", {
            position: "top-right",
          });
          setOpen(false);
        } else {
          toast.error("Failed to update status", { position: "top-right" });
        }
      } catch (error: any) {
        toast.error("Failed to update status", { position: "top-right" });
      }
    });
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-sm" aria-describedby="">
        <DialogHeader>
          <DialogTitle>Update Booking Status</DialogTitle>
        </DialogHeader>
        <div className="py-3 w-full">
          <Select
            value={selectedStatus}
            onValueChange={(v) => setSelectedStatus(v as BookingStatus)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={status} />
            </SelectTrigger>
            <SelectContent className="w-full">
              <SelectGroup>
                <SelectLabel>Status</SelectLabel>
                {bookStatus.map((k) => (
                  <SelectItem key={k} value={k}>
                    {k}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" className="cursor-pointer">
              Cancel
            </Button>
          </DialogClose>
          <Button
            onClick={handleUpdate}
            disabled={isPending}
            className="bg-brand hover:bg-brand-dark cursor-pointer text-white"
          >
            {isPending ? "Updating..." : "Update"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
