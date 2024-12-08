export default function calculateOverview(expenses, incomes) {
  const totalIncome = incomes.reduce(
    (acc, cur) => parseFloat(cur.amount) + acc,
    0
  );

  const totalExpense = expenses.reduce(
    (acc, cur) => parseFloat(cur.amount) + acc,
    0
  );

  const balance = totalIncome - totalExpense;

  return { totalExpense, totalIncome, balance };
}
