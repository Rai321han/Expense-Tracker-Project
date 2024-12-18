/* eslint-disable react/prop-types */
import { useState } from "react";
import { expenseCategories, incomeCategories } from "../utils/data";
import useMonthFirstAndLastDay from "@/hooks/useMonthFirstAndLastDay";

export default function ExpenseForm({
  onChange,
  onAddSubmit,
  formData,
  onEdit,
}) {
  const [tab, setTab] = useState("Expense");
  let renderOptions = [];
  const updatedTab = formData.type || tab;
  let { firstDay, lastDay } = useMonthFirstAndLastDay();
  console.log(firstDay, lastDay);

  // console.log(formData);

  if (updatedTab === "Expense") {
    renderOptions = expenseCategories.map((option) => (
      <option key={option} value={option}>
        {option}
      </option>
    ));
  } else
    renderOptions = incomeCategories.map((option) => (
      <option key={option} value={option}>
        {option}
      </option>
    ));

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();

        if (formData.id) onEdit(formData, updatedTab);
        else onAddSubmit(formData, tab);
      }}
    >
      <div className="flex divide-x divide-slate-400/20 overflow-hidden rounded-md bg-white text-[0.8125rem] font-medium leading-5 text-slate-700 shadow-sm ring-1 ring-slate-700/10 mt-6">
        <div
          onClick={() => setTab("Expense")}
          className={`cursor-pointer text-center flex-1 px-4 py-2 hover:bg-slate-50 hover:text-slate-900  ${
            updatedTab === "Expense" && "active"
          }`}
        >
          Expense
        </div>
        <div
          onClick={() => setTab("Income")}
          className={`cursor-pointer text-center flex-1 px-4 py-2 hover:bg-slate-50 hover:text-slate-900 ${
            updatedTab === "Income" && "active"
          }`}
        >
          Income
        </div>
      </div>

      <div className="mt-3">
        <label
          htmlFor="category"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Category
        </label>
        <div className="mt-2">
          <select
            id="category"
            name="category"
            autoComplete="category-name"
            value={formData.category}
            onChange={(e) => onChange(e)}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
          >
            {renderOptions}
          </select>
        </div>
      </div>

      <div className="mt-3">
        <label
          htmlFor="amount"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Amount
        </label>
        <div className="mt-2">
          <input
            type="number"
            name="amount"
            id="amount"
            value={formData.amount}
            onChange={(e) => onChange(e)}
            autoComplete="off"
            placeholder="Ex: 10000"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div className="mt-3">
        <label
          htmlFor="date"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Date
        </label>
        <div className="mt-2">
          <input
            type="date"
            name="date"
            min={firstDay}
            max={lastDay}
            id="date"
            value={formData.date}
            required
            onChange={(e) => onChange(e)}
            autoComplete="off"
            placeholder="12931"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <button
        type="submit"
        className="mt-6 rounded-md bg-teal-600 px-8 py-2 text-sm font-semibold text-white shadow-sm hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 w-full"
      >
        Save
      </button>
    </form>
  );
}
