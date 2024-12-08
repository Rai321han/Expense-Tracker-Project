import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { db } from "./firebase";
import toast from "react-hot-toast";
export async function getExpenses(sortType = "desc", sortField = "date") {
  const q = query(
    collection(db, "expenseTracker"),
    where("email", "==", "uddinraihan797@gmail.com"),
    where("type", "==", "Expense"),
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

export async function getIncomes(sortType = "desc", sortField = "date") {
  const q = query(
    collection(db, "expenseTracker"),
    where("email", "==", "uddinraihan797@gmail.com"),
    where("type", "==", "Income"),
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
