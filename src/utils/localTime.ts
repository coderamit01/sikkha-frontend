export const localTime = (time: Date) => {
  const date = new Date(time);
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  })
}

export const toLocalTimeInput = (isoString: Date) => {
  const date = new Date(isoString);
  const hour = String(date.getHours()).padStart(2,"0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${hour}:${minutes}`;
}