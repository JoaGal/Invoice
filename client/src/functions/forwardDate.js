export default function forwardDate(isoDateString) {
  const date = new Date(isoDateString);
  // Format date as YYYY-MM-DD
  return date.toISOString().split("T")[0];
}
