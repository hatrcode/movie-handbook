export function dateConvert(time: string) {
  return new Date(time).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
