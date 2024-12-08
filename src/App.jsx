/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import ExpenseForm from "./components/ExpenseForm";
import History from "./components/History";
import Overview from "./components/Overview";
import { useQueries } from "react-query";
import { getExpenses, getIncomes } from "./service/getData";
import useAddExpenseData from "./hooks/useAddExpenseData";
import useAddIncomeData from "./hooks/useAddIncomeData";
import toast, { Toaster } from "react-hot-toast";
import useDelete from "./hooks/useDelete";
import useUpdateData from "./hooks/useUpdateData";
import { ImSpinner9 } from "react-icons/im";
function App() {
  const [incomeSort, setIncomeSort] = useState({
    sortType: "desc",
    sortField: "date",
  });
  const [expenseSort, setExpenseSort] = useState({
    sortType: "desc",
    sortField: "date",
  });

  const [formData, setFormData] = useState({
    id: "",
    category: "",
    amount: "",
    date: "",
    type: "",
  });
  const { addExpenseData, isAddingExpense } = useAddExpenseData();
  const { addIncomeData, isAddingIncome } = useAddIncomeData();
  const { deleteRecord, isDeleting } = useDelete();
  const { updateRecord, isUpdating } = useUpdateData();

  const data = useQueries([
    {
      queryKey: ["expenses", expenseSort],
      queryFn: () => getExpenses(expenseSort.sortType, expenseSort.sortField),
    },
    {
      queryKey: ["incomes", incomeSort],
      queryFn: () => getIncomes(incomeSort.sortType, incomeSort.sortField),
    },
  ]);

  const expenseQuery = data[0];
  const incomeQuery = data[1];
  // On chaning form input
  function handleChange(e) {
    let { name, value } = e.target;

    if (name === "amount") value = parseFloat(value);

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  //adding new item
  function handleAddSubmit(data, type) {
    if (data.amount === "") return;

    const categoryDefaultValue = type === "Expense" ? "Education" : "Salary";

    const dataObj = {
      amount: data.amount,
      category: data.category ? data.category : categoryDefaultValue,
      date: new Date(data.date),
      email: "uddinraihan797@gmail.com",
      type: type,
      id: crypto.randomUUID(),
    };

    if (type === "Expense") addExpenseData(dataObj);
    else addIncomeData(dataObj);

    resetForm();
  }

  function handleDelete(id, type) {
    deleteRecord({ id, type });
  }

  function handlePopulateEditData(data) {
    setFormData(data);
  }

  function handleEditData(data, type) {
    const dataObj = {
      ...data,
      date: new Date(data.date),
    };
    updateRecord({ data: dataObj, type });
    resetForm();
  }

  // form input reset
  function resetForm() {
    setFormData({
      id: "",
      category: "",
      amount: "",
      date: "",
      type: "",
    });
  }

  const expenseData = data[0].data;
  const incomeData = data[1].data;

  if (expenseQuery.isLoading || incomeQuery.isLoading)
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <ImSpinner9 className="animate-spin w-20 h-20 fill-teal-500 " />
      </div>
    );
  if (expenseQuery.error || incomeQuery.error)
    return (
      <p>Error: {expenseQuery.error?.message || incomeQuery.error?.message}</p>
    );

  return (
    <>
      <Toaster />
      <main className="relative mx-auto my-10 w-full max-w-7xl">
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="p-6 py-8 bg-[#F9FAFB] border rounded-md">
            <h2 className="text-3xl font-semibold leading-7 text-gray-800 text-center">
              Expense Tracker
            </h2>

            <ExpenseForm
              onChange={handleChange}
              onAddSubmit={handleAddSubmit}
              formData={formData}
              onEdit={handleEditData}
            />
          </div>

          <div className="lg:col-span-2">
            <Overview income={incomeData} expense={expenseData} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-8">
              <History
                income
                data={incomeData}
                onPopulateForm={handlePopulateEditData}
                resetForm={resetForm}
                onDelete={handleDelete}
                onSort={(sortType, sortField) => {
                  setIncomeSort({
                    sortType,
                    sortField,
                  });
                }}
              />
              <History
                expense
                data={expenseData}
                onPopulateForm={handlePopulateEditData}
                resetForm={resetForm}
                onDelete={handleDelete}
                onSort={(sortType, sortField) => {
                  setExpenseSort({
                    sortType,
                    sortField,
                  });
                }}
              />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default App;
