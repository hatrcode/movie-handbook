export const dateConvert = (time) => {
  // Request a long date
  let options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const date = new Date(time).toLocaleDateString("en-US", options);
  return date;
};
