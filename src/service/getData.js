import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
  getAggregateFromServer,
  sum,
} from "firebase/firestore";
import { db } from "./firebase";
import toast from "react-hot-toast";

export async function getExpenses(
  sortType = "desc",
  sortField = "date",
  email,
  categories = []
) {
  if (!email) throw new Error("Not authenticated!");
  let baseQuery = [
    // collection(db, "expenseTracker"),
    where("email", "==", email),
    where("type", "==", "Expense"),
    // orderBy(sortField, sortType || "desc")
  ];

  if (categories.length > 0) {
    baseQuery.push(where("category", "in", categories));
  }

  const q = query(
    collection(db, "expenseTracker"),
    ...baseQuery,
    orderBy(sortField, sortType || "desc")
  );

  try {
    const querySnapshot = await getDocs(q);

    const expenses = querySnapshot.docs.map(
      (doc) => doc.data() // Document data
    );
    return expenses;
  } catch (error) {
    toast.error("Cannot load data!", {
      duration: 2000,
    });
    console.log(error);
  }
}

export async function getIncomes(
  sortType = "desc",
  sortField = "date",
  email,
  categories = []
) {
  if (!email) throw new Error("Not authenticated!");
  let baseQuery = [
    // collection(db, "expenseTracker"),
    where("email", "==", email),
    where("type", "==", "Income"),
    // orderBy(sortField, sortType || "desc")
  ];

  if (categories.length > 0) {
    baseQuery.push(where("category", "in", categories));
  }

  const q = query(
    collection(db, "expenseTracker"),
    ...baseQuery,
    orderBy(sortField, sortType || "desc")
  );

  try {
    const querySnapshot = await getDocs(q);

    const incomes = querySnapshot.docs.map(
      (doc) => doc.data() // Document data
    );
    return incomes;
  } catch (error) {
    toast.error("Cannot load data!", {
      duration: 2000,
    });
    console.log(error);
  }
}

export async function getOverViewData() {
  const coll = collection(db, "expenseTracker");

  // Queries for expense and income
  const expenseQuery = query(coll, where("type", "==", "Expense"));
  const incomeQuery = query(coll, where("type", "==", "Income"));

  try {
    // Fetch aggregated data for expenses
    const expenseSnapshot = await getAggregateFromServer(expenseQuery, {
      totalExpense: sum("amount"),
    });

    // Fetch aggregated data for income
    const incomeSnapshot = await getAggregateFromServer(incomeQuery, {
      totalIncome: sum("amount"),
    });

    // Extract values from snapshots
    const totalExpenseAmount = expenseSnapshot.data().totalExpense || 0;
    const totalIncomeAmount = incomeSnapshot.data().totalIncome || 0;

    return [totalExpenseAmount, totalIncomeAmount];
  } catch (error) {
    toast.error("Error fetching data!");
    console.error("Error in fetching aggregate data:", error);
  }
}
