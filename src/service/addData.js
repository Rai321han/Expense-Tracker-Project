import { setDoc, doc } from "firebase/firestore";
import { db } from "./firebase";

export default async function addData(data) {
  try {
    const docRef = doc(db, "expenseTracker", data.id);
    await setDoc(docRef, data);
  } catch (error) {
    console.log(error);
  }
}
