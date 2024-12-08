import { useMutation } from "react-query";
import toast from "react-hot-toast";
import { queryClient } from "../main";
import addData from "../service/addData";

export default function useAddIncomeData() {
  const { mutate: addIncomeData, isLoading: isAddingIncome } = useMutation({
    mutationFn: addData,
    onSuccess: () => {
      toast.success("Saved successfully!", {
        duration: 2000,
      });
      queryClient.invalidateQueries({
        queryKey: ["incomes"],
      });
    },
    onError: () => {
      toast.error("Error saving data!");
    },
  });

  return { addIncomeData, isAddingIncome };
}
