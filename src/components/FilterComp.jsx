/* eslint-disable react/prop-types */
import { useState } from "react";
import { incomeCategories, expenseCategories } from "../utils/data";
import { FilterSVG } from "../utils/SVGs";

export default function FilterComp({ type, onFilterChange }) {
  const [isOpen, setIsOpen] = useState(false);

  let options;

  if (type === "Expense") options = expenseCategories;
  else options = incomeCategories;

  const renderOptions = options.map((option) => (
    <label
      key={option}
      className="inline-flex items-center px-4 py-2 text-sm text-gray-700"
    >
      <input
        type="checkbox"
        className="form-checkbox h-4 w-4 rounded-md text-gray-600"
        id="filter-option-1"
        value={option}
        onChange={(e) => {
          onFilterChange(e.target.value, type);
        }}
      />
      <span className="ml-2">{option}</span>
    </label>
  ));

  return (
    <>
      <div>
        <button
          type="button"
          className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          id="filter-button"
          aria-expanded={isOpen}
          aria-haspopup="true"
          onClick={() => setIsOpen((prevIsOpen) => !prevIsOpen)}
        >
          <FilterSVG />
        </button>
      </div>

      <div
        className={`absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none
          ${!isOpen && "hidden"}
          `}
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="filter-button"
        tabIndex="-1"
        id="filter-dropdown"
      >
        <div className="py-1" role="none">
          {renderOptions}
        </div>
      </div>
    </>
  );
}
