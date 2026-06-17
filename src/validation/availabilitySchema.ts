
import { DayOfWeek } from "@/types/availability.types";
import * as z from "zod";

const toMinutes = (time: string) => {
  const [h, m] = time.split(":").map(Number);
  return h! * 60 + m!;
};

export const availabilitySchema = z
  .object({
    day: z.enum(Object.values(DayOfWeek) as [string, ...string[]]),
    startTime: z.string().min(1, "Start time is required"),
    endTime: z.string().min(1, "End time is required"),
  })
  .refine(
    (data) => {
      return toMinutes(data.startTime) < toMinutes(data.endTime);
    },
    {
      message: "Start time must be before end time",
      path: ["endTime"],
    }
  );


export const updateAvailabilitySchema = z
  .object({
    day: z.enum(Object.values(DayOfWeek) as [string, ...string[]]),
    startTime: z.string().min(1, "Start time is required"),
    endTime: z.string().min(1, "End time is required"),
  })
  .refine(
    (data) => {
      return toMinutes(data.startTime) < toMinutes(data.endTime);
    },
    {
      message: "Start time must be before end time",
      path: ["endTime"],
    }
  );