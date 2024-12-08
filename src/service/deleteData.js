import { doc, deleteDoc } from "firebase/firestore";
import { db } from "./firebase";
export default async function deleteData({ id }) {
  try {
    await deleteDoc(doc(db, "expenseTracker", id));
  } catch (error) {
    console.log(error);
  }
}
