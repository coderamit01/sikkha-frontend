export const localTime = (time: string) => {
  const [hours, minute] = time.split(":")
  const date = new Date();
  date.setHours(Number(hours), Number(minute), 0);
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  })
}

export const toLocalTimeInput = (isoString: Date) => {
  const date = new Date(isoString);
  const hour = String(date.getHours()).padStart(2,"0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${hour}:${minutes}`;
}