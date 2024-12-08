import toast from "react-hot-toast";
import { useMutation } from "react-query";
import { queryClient } from "../main";
import updateData from "../service/updateData";
export default function useUpdateData() {
  const { mutate: updateRecord, isLoading: isUpdating } = useMutation({
    mutationFn: updateData,
    onSuccess: (_, variable) => {
      const { type } = variable;
      if (type === "Expense") {
        queryClient.invalidateQueries(["expenses"]);
      } else queryClient.invalidateQueries(["incomes"]);
      toast.success("Updated successfully!");
    },
    onError: () => {
      toast.error("An error encountered while updating record!");
    },
  });

  return { updateRecord, isUpdating };
}
