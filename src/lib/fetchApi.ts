

export const serverFetch = async (endpoint: string, options: RequestInit) => {
  const { cookies } = await import("next/headers");
  const cookieStore = await cookies();
  const isFormData = options.body instanceof FormData;
  const res = await fetch(`${process.env.BACKEND_URL}/api/v1${endpoint}`, {
    ...options,
    headers: {
      ...(!isFormData && { "Content-Type": "application/json" }),
      cookie: cookieStore.toString(),
      ...options?.headers,
    }
  })
  if (!res.ok) {
    let errorMessage = `HTTP error! Status: ${res.status}`;
    try {
      const errorBody = await res.json();
      errorMessage = errorBody.message || errorBody.error || errorMessage;
    } catch (e) {
    }
    throw new Error(errorMessage);
  }
  return res.json();
}

export const clientFetch = async (endpoint: string, options: RequestInit) => {

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    credentials: "include",
  })
  if (!res.ok) {
    throw new Error(`HTTP error! Status: ${res.status}`)
  }
  return res.json();
}
