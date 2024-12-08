import { format } from "date-fns";

function formatTimestampToString(timestamp, dateFormat = "yyyy-MM-dd") {
  const date = timestamp.toDate();

  return format(date, dateFormat);
}

function formatDate(date) {
  const event = date.toDate();

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return event.toLocaleDateString("en-GB", options);
}

export { formatTimestampToString, formatDate };
