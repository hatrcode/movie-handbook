function parseDateLocal(dateStr: string): Date {
  const [year, month, day] = dateStr.split("-").map(Number);
  return new Date(year, month - 1, day);
}

export function dateConvert(time: string) {
  return parseDateLocal(time).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function getYear(dateStr: string): number {
  return parseDateLocal(dateStr).getFullYear();
}
