export default function useMonthFirstAndLastDay() {
  const today = new Date();
  const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
  const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);

  // Format date as YYYY-MM-DD using toISOString
  const formatDate = (date) => date.toISOString().split("T")[0];

  return {
    firstDay: formatDate(firstDay),
    lastDay: formatDate(lastDay),
  };
}
