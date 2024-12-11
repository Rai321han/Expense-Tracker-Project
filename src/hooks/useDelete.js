import { useMutation } from "react-query";
import deleteData from "../service/deleteData";
import { queryClient } from "../main";
import toast from "react-hot-toast";

export default function useDelete() {
  const { mutate: deleteRecord, isLoading: isDeleting } = useMutation({
    mutationFn: deleteData,
    onSuccess: (_, variable) => {
      const { type } = variable;
      if (type === "Expense") {
        queryClient.invalidateQueries(["expenses"]);

        toast.success("Expense data Deleted!");
      } else {
        queryClient.invalidateQueries(["incomes"]);
        toast.success("Income data Deleted!");
      }
      queryClient.invalidateQueries(["overview"]);
    },
    onError: () => {
      toast.error("An error occured while deleting data!");
    },
  });

  return { deleteRecord, isDeleting };
}
