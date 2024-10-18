/* eslint-disable react/prop-types */
import { useState } from "react";
import { SortSVG } from "../utils/SVGs";
export default function SortComp({ filter, type }) {
  const [isOpen, setIsOpen] = useState(false);
  const [sort, setSort] = useState("random");

  // on sorting list
  function handleSortingType(sortType) {
    if (sort === sortType) {
      filter("random", type);
      setSort("random");
    } else {
      filter(sortType, type);
      setSort(sortType);
    }
  }

  const toggleMenu = function () {
    setIsOpen((prev) => !prev);
  };
  return (
    <>
      <div>
        <button
          type="button"
          className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          id="menu-button"
          aria-expanded={isOpen}
          aria-haspopup="true"
          onClick={toggleMenu}
        >
          <SortSVG />
        </button>
      </div>

      <div
        className={`absolute z-10 mt-3 left-5 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${
          !isOpen && "hidden"
        }`}
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="menu-button"
        tabIndex="-1"
        // onBlur={() => setIsOpen(false)}
      >
        <div className="py-1" role="none">
          <a
            href="#"
            onClick={() => handleSortingType("asc")}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-all"
            role="menuitem"
            tabIndex="-1"
            id="menu-item-0"
          >
            Low to High
          </a>
          <a
            href="#"
            onClick={() => handleSortingType("desc")}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-all"
            role="menuitem"
            tabIndex="-1"
            id="menu-item-0"
          >
            High to Low
          </a>
        </div>
      </div>
    </>
  );
}
