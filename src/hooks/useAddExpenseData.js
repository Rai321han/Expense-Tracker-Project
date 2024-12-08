import { useMutation } from "react-query";
import toast from "react-hot-toast";
import { queryClient } from "../main";
import addData from "../service/addData";

export default function useAddExpenseData() {
  const { mutate: addExpenseData, isLoading: isAddingExpense } = useMutation({
    mutationFn: addData,
    onSuccess: () => {
      toast.success("Saved successfully!", {
        duration: 2000,
      });
      queryClient.invalidateQueries({
        queryKey: ["expenses"],
      });
    },
    onError: () => {
      toast.error("Error saving data!");
    },
  });

  return { addExpenseData, isAddingExpense };
}
