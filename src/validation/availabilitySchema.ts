
import * as z from "zod";

export const availabilitySchema = z
  .object({
    date: z.string().min(1, "Date is required"),
    startTime: z.string().min(1, "Start time is required"),
    endTime: z.string().min(1, "End time is required"),
  })
  .refine(
    (data) => {
      const startDateTime = new Date(`${data.date}T${data.startTime}`);
      return startDateTime > new Date();
    },
    { message: "Availability cannot be in the past", path: ["startTime"] },
  )
  .refine(
    (data) => {
      const start = new Date(`${data.date}T${data.startTime}`);
      const end = new Date(`${data.date}T${data.endTime}`);
      return start < end;
    },
    {
      message: "End time must be after start time",
      path: ["endTime"]
    },
  );


  export const updateAvailabilitySchema = z
  .object({
    startTime: z.string().min(1, "Start time is required"),
    endTime: z.string().min(1, "End time is required"),
  })
  .refine(
    (data) => {
      const start = new Date(`1970-01-01T${data.startTime}`);
      const end = new Date(`1970-01-01T${data.endTime}`);
      return start < end;
    },
    {
      message: "End time must be after start time",
      path: ["endTime"],
    }
  );