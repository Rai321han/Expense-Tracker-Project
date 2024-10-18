import { useState } from "react";
import Navbar from "./components//Navbar";
import ExpenseForm from "./components/ExpenseForm";
import History from "./components/History";
import Overview from "./components/Overview";

function App() {
  const [expense, setExpense] = useState([]);
  const [income, setIncome] = useState([]);

  const [filters, setFilters] = useState({
    incomeFilter: [],
    expenseFilter: [],
  });

  const [filteredData, setFilteredData] = useState({
    expense: filterData(expense, filters.expenseFilter),
    income: filterData(income, filters.incomeFilter),
  });
  const [formData, setFormData] = useState({
    id: "",
    category: "",
    amount: "",
    date: "",
    type: "",
  });

  // On chaning form input
  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  //adding new item
  function handleAddSubmit(data, type) {
    if (data.amount === "") return;

    const categoryDefaultValue = type === "Expense" ? "Education" : "Salary";

    const totalData = {
      ...data,
      id: crypto.randomUUID(),
      category: data.category ? data.category : categoryDefaultValue,
      type: type,
    };

    if (totalData.type === "Expense") {
      const updatedExpense = [...expense, totalData];
      setExpense(updatedExpense);
      setFilteredData((prev) => ({
        ...prev,
        expense: updatedExpense,
      }));
    } else {
      const updatedIncome = [...income, totalData];
      setIncome(updatedIncome);
      setFilteredData((prev) => ({
        ...prev,
        income: updatedIncome,
      }));
    }
    resetForm();
  }

  const handlePopulateEditData = function (data) {
    setFormData(data);
    // setTab(data.type);
  };

  // updating item data
  const handleEditData = function (data) {
    if (data.type === "Expense") {
      const updatedExpense = expense.map((exp) => {
        if (exp.id === data.id) return data;
        return exp;
      });
      setExpense(updatedExpense);

      setFilteredData((prev) => ({
        ...prev,
        expense: updatedExpense,
      }));
    } else {
      const updatedIncome = income.map((inc) => {
        if (inc.id === data.id) return data;
        return inc;
      });
      setIncome(updatedIncome);

      setFilteredData((prev) => ({
        ...prev,
        income: updatedIncome,
      }));
    }
    resetForm();
  };

  // delete item
  function handleDelete(data) {
    const { id, type } = data;
    if (type === "Expense") {
      const updatedExpense = expense.filter((exp) => exp.id !== id);
      setExpense(updatedExpense);

      setFilteredData((prev) => ({
        ...prev,
        expense: updatedExpense,
      }));
    } else {
      const updatedIncome = income.filter((inc) => inc.id !== id);
      setIncome(updatedIncome);

      setFilteredData((prev) => ({
        ...prev,
        income: updatedIncome,
      }));
    }
  }

  // handlesorting
  function handleFitering(sortType, transType) {
    let transactionList =
      transType === "Expense"
        ? [...filteredData.expense]
        : [...filteredData.income];

    if (sortType === "asc") {
      transactionList.sort((a, b) => Number(a.amount) - Number(b.amount));
      if (transType === "Expense") {
        setFilteredData((prev) => ({
          ...prev,
          expense: transactionList,
        }));
      } else {
        setFilteredData((prev) => ({
          ...prev,
          income: transactionList,
        }));
      }
    } else if (sortType === "desc") {
      transactionList.sort((a, b) => Number(b.amount) - Number(a.amount));
      if (transType === "Expense") {
        setFilteredData((prev) => ({
          ...prev,
          expense: transactionList,
        }));
      } else {
        setFilteredData((prev) => ({
          ...prev,
          income: transactionList,
        }));
      }
    } else {
      if (transType === "Expense") {
        setFilteredData((prev) => ({
          ...prev,
          expense: expense,
        }));
      } else {
        setFilteredData((prev) => ({
          ...prev,
          income: income,
        }));
      }
    }
  }

  function handleFilterChange(filter, type) {
    if (type === "Expense") {
      const index = filters.expenseFilter.indexOf(filter);
      if (index !== -1) {
        const updated = filters.expenseFilter.toSpliced(index, 1);
        setFilters((prev) => ({
          ...prev,
          expenseFilter: updated,
        }));
      } else
        setFilters((prev) => ({
          ...prev,
          expenseFilter: [...prev.expenseFilter, filter],
        }));
    } else {
      const index = filters.incomeFilter.indexOf(filter);
      if (index !== -1) {
        const updated = filters.incomeFilter.toSpliced(index, 1);
        setFilters((prev) => ({
          ...prev,
          incomeFilter: updated,
        }));
      } else
        setFilters((prev) => ({
          ...prev,
          incomeFilter: [...prev.incomeFilter, filter],
        }));
    }
  }

  function filterData(transData, filters) {
    if (!filters.length) return transData;
    let updatedData = [];
    for (const data of transData) {
      for (const filter of filters) {
        if (data.category === filter) updatedData.push(data);
      }
    }
    return updatedData;
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

  return (
    <>
      <Navbar />
      <main className="relative mx-auto mt-10 w-full max-w-7xl">
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
            <Overview income={income} expense={expense} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-8">
              <History
                income
                data={filteredData.income}
                onEdit={handlePopulateEditData}
                resetForm={resetForm}
                onDelete={handleDelete}
                filter={handleFitering}
                filters={filters}
                onFilterChange={handleFilterChange}
              />
              <History
                expense
                data={filteredData.expense}
                onEdit={handlePopulateEditData}
                resetForm={resetForm}
                onDelete={handleDelete}
                filter={handleFitering}
                filters={filters}
                onFilterChange={handleFilterChange}
              />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default App;
