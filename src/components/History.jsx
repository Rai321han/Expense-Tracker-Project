/* eslint-disable no-unused-vars */
import { ExpenseSVG, IncomeSVG } from "../utils/SVGs";
// import FilterComp from "./FilterComp";
import HistoryListItem from "./HistoryListItem";
import SortComp from "./SortComp";

/* eslint-disable react/prop-types */
export default function History({
  income,
  expense,
  data,
  onPopulateForm,
  onDelete,
  resetForm,
  onSort,
  // filter,
  // filters,
  // onFilterChange,
}) {
  let type;
  if (income) type = "Income";
  else if (expense) type = "Expense";

  let updatedData = data;
  // if (expense) {
  //   updatedData = filterData(data, filters.expenseFilter);
  // } else updatedData = filterData(data, filters.incomeFilter);

  // function filterData(transData, filters) {
  //   if (!filters.length) return transData;
  //   let updatedData = [];
  //   for (const data of transData) {
  //     for (const filter of filters) {
  //       if (data.category === filter) updatedData.push(data);
  //     }
  //   }
  //   return updatedData;
  // }

  return (
    <div className="border rounded-md relative">
      <div className="flex items-center justify-between gap-2 bg-[#F9FAFB] py-4 px-4 rounded-md">
        <div className="flex items-center gap-2">
          <div
            className={`h-10 w-10 ${
              type === "Income" ? "bg-teal-600" : " bg-pink-600"
            }  text-white rounded-md text-center object-center place-content-center text-base`}
          >
            {type === "Income" && <IncomeSVG />}
            {type === "Expense" && <ExpenseSVG />}
          </div>
          <div>
            <h3 className="text-xl font-semibold leading-7 text-gray-800">
              {type}
            </h3>
          </div>
        </div>
        <div className="flex gap-1">
          <div className="relative inline-block text-left">
            <SortComp onSort={onSort} />
          </div>

          <div className="relative inline-block text-left">
            {/* <FilterComp type={type} onFilterChange={onFilterChange} /> */}
          </div>
        </div>
      </div>

      <div className="p-4 divide-y">
        {updatedData.map((item) => (
          <HistoryListItem
            data={item}
            key={item.id}
            onPopulateForm={onPopulateForm}
            resetForm={resetForm}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
}
