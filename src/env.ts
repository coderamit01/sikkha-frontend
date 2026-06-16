import * as z from "zod";

export const Env = {
  server: {
    BACKEND_URL: z.url(),
    FRONTEND_URL: z.url(),
    NEXT_PUBLIC_API_URL: z.url(),
  },
  runtimeEnv: {
    BACKEND_URL: process.env.BACKEND_URL,
    FRONTEND_URL: process.env.FRONTEND_URL,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
};
