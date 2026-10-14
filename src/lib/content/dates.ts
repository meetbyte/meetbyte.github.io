/**
 * @file Date-only validation and display shared by legacy posts and editorial entries.
 * @author meetbyte
 */
/** Rejects impossible calendar dates rather than silently normalizing them. @author meetbyte */
export function isValidContentDate(value: unknown): value is string {
  return (
    typeof value === "string" &&
    /^\d{4}-\d{2}-\d{2}$/.test(value) &&
    Number.isFinite(Date.parse(value)) &&
    new Date(value).toISOString().slice(0, 10) === value
  );
}
/** Uses UTC so a visitor's timezone cannot move an authored date to the previous day. @author meetbyte */
export function formatContentDate(date: string): string {
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}
