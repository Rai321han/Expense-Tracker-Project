import { doc, setDoc } from "firebase/firestore";
import { db } from "./firebase";
export default async function updateData({ data }) {
  // Add a new document in collection "cities"
  try {
    await setDoc(doc(db, "expenseTracker", data.id), data);
  } catch (error) {
    console.log(error);
  }
}
