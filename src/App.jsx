/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import ExpenseForm from "./components/ExpenseForm";
import History from "./components/History";
import Overview from "./components/Overview";
import { useQueries, useQuery } from "react-query";
import { getExpenses, getIncomes, getOverViewData } from "./service/getData";
import useAddExpenseData from "./hooks/useAddExpenseData";
import useAddIncomeData from "./hooks/useAddIncomeData";
import toast, { Toaster } from "react-hot-toast";
import useDelete from "./hooks/useDelete";
import useUpdateData from "./hooks/useUpdateData";
import { ImSpinner9 } from "react-icons/im";
import GoogleSignIn from "./components/GoogleSignIn";
import { useGoogleLogin, googleLogout as logout } from "@react-oauth/google";
import getUserInfo from "./utils/getUserInfo";
import NavBar from "./components/NavBar";
import useUser from "./hooks/useUser";
import { queryClient } from "./main";

//
function App() {
  const [openDiaglog, setOpenDialog] = useState(false);
  const [categories, setCategories] = useState({
    expense: [],
    income: [],
  });
  // const [user, setUser] = useState(null);
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
  const { user, setUser } = useUser();
  const { addExpenseData, isAddingExpense } = useAddExpenseData();
  const { addIncomeData, isAddingIncome } = useAddIncomeData();
  const { deleteRecord, isDeleting } = useDelete();
  const { updateRecord, isUpdating } = useUpdateData();

  const data = useQueries(
    user
      ? [
          {
            queryKey: ["expenses", expenseSort, user, categories.expense],
            queryFn: () =>
              getExpenses(
                expenseSort.sortType,
                expenseSort.sortField,
                user.email,
                categories.expense
              ),
          },
          {
            queryKey: ["incomes", incomeSort, user, categories.income],
            queryFn: () =>
              getIncomes(
                incomeSort.sortType,
                incomeSort.sortField,
                user.email,
                categories.income
              ),
          },
        ]
      : []
  );

  const overviewData = useQuery(
    user
      ? {
          queryKey: ["overview"],
          queryFn: () => getOverViewData(),
        }
      : [0, 0]
  );

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const userData = await getUserInfo(tokenResponse);
      queryClient.invalidateQueries(["expenses"]);
      queryClient.invalidateQueries(["incomes"]);
      setUser(userData);
      setOpenDialog(false);
    },
    onError: () => toast.error("Error while login!"),
  });

  const expenseQuery = user ? data[0] : null;
  const incomeQuery = user ? data[1] : null;
  const expenseData = user ? data[0].data : null;
  const incomeData = user ? data[1].data : null;
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
    if (!user) {
      setOpenDialog(true);
      return;
    }

    if (data.amount === "") return;

    const categoryDefaultValue = type === "Expense" ? "Education" : "Salary";

    const dataObj = {
      amount: data.amount,
      category: data.category ? data.category : categoryDefaultValue,
      date: new Date(data.date),
      email: user.email,
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
  // if (expenseQuery && (expenseQuery.isLoading || incomeQuery.isLoading))
  //   return (
  //     <div className="w-screen h-screen flex justify-center items-center">
  //       <ImSpinner9 className="animate-spin w-20 h-20 fill-teal-500 " />
  //     </div>
  //   );
  // if (expenseQuery && (expenseQuery.error || incomeQuery.error))
  //   return (
  //     <p>Error: {expenseQuery.error?.message || incomeQuery.error?.message}</p>
  //   );

  return (
    <>
      <Toaster />
      <GoogleSignIn open={openDiaglog} setOpen={setOpenDialog} login={login} />
      <NavBar />
      <main className="relative mx-auto my-5 w-full max-w-7xl">
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
            {overviewData.isLoading ? (
              <Overview overviewData={[0, 0]} />
            ) : (
              <Overview overviewData={overviewData.data} />
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 mt-2">
              <History
                isLoading={incomeQuery.isLoading}
                income
                onFilterChange={(values) => {
                  setCategories({
                    ...categories,
                    income: values,
                  });
                }}
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
                isLoading={expenseQuery.isLoading}
                expense
                onFilterChange={(values) => {
                  setCategories({
                    ...categories,
                    expense: values,
                  });
                }}
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
