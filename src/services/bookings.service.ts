import { serverFetch } from "@/lib/fetchApi";


export const getBookings = async () => {
  try {
    const data = await serverFetch("/bookings",{
      cache: "no-cache",
    })
    return data;
  } catch (error:any) {
    console.log("getBookings failed:", error.message);
  }
}

