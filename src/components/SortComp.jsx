/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { SortSVG } from "../utils/SVGs";
export default function SortComp({ onSort }) {
  const [isOpen, setIsOpen] = useState(false);
  const [sort, setSort] = useState("");
  const sortRef = useRef(null);

  useEffect(() => {
    isOpen && sortRef.current.focus();
  }, [isOpen]);

  // on sorting list
  function handleSortingType(sortType) {
    if (sort === sortType) {
      onSort("", "date");
      setSort("");
    } else {
      onSort(sortType, "amount");
      setSort(sortType);
    }
  }

  function handleToggle() {
    setIsOpen((prev) => !prev);
  }

  return (
    <>
      <div onClick={handleToggle}>
        <button
          type="button"
          className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          id="menu-button"
          aria-expanded={isOpen}
          aria-haspopup="true"
        >
          <SortSVG />
        </button>
      </div>

      <div
        ref={sortRef}
        className={`absolute z-10 mt-3 right-0 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${
          !isOpen && "hidden"
        }`}
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="menu-button"
        tabIndex="-1"
        onBlur={() => setIsOpen(false)}
      >
        <div className="py-1 px-1" role="none">
          <a
            href="#"
            onClick={() => {
              handleSortingType("asc");
              sortRef.current.blur();
            }}
            className={`block px-4 py-2 text-sm  ${
              sort === "asc"
                ? "bg-teal-600 rounded-md text-white"
                : "text-gray-700 hover:bg-gray-50"
            }    transition-all`}
            role="menuitem"
            tabIndex="-1"
            id="menu-item-0"
            onMouseDown={(e) => e.preventDefault()}
          >
            Low to High
          </a>
          <a
            href="#"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => {
              handleSortingType("desc");
              sortRef.current.blur();
            }}
            className={`block px-4 py-2 text-sm  ${
              sort === "desc"
                ? "bg-teal-600 rounded-md text-white"
                : "text-gray-700 hover:bg-gray-50"
            }    transition-all`}
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
