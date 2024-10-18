import { useState } from "react";
import { DeleteSVG, EditSVG } from "../utils/SVGs";

/* eslint-disable react/prop-types */
export default function HistoryListItem({ data, onEdit, onDelete, resetForm }) {
  const [isEdit, setIsEdit] = useState(true);

  const { category, date, amount } = data;

  function formatDate(date) {
    const event = new Date(date);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return event.toLocaleDateString("en-GB", options);
  }

  return (
    <div className="flex justify-between items-center py-2 relative group cursor-pointer">
      <div>
        <h3 className="text-base font-medium leading-7 text-gray-600">
          {category}
        </h3>
        <p className="text-xs text-gray-600">
          {date === "" ? "No date provided" : formatDate(date)}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <p className="text-base font-semibold text-gray-600 transition-all group-hover:-translate-x-14">
          BDT {amount}
        </p>

        <div className="translate-x-5 group-hover:translate-x-0 opacity-0 group-hover:opacity-100 absolute right-0 top-1/2 -translate-y-1/2 transition-all">
          <button
            className="hover:text-teal-600"
            role="button"
            title="Edit Button"
            onClick={() => {
              if (isEdit) {
                onEdit(data);
              } else {
                resetForm();
              }
              setIsEdit((prev) => !prev);
            }}
          >
            <EditSVG />
          </button>

          <button
            onClick={() => onDelete(data)}
            className="hover:text-red-600"
            role="button"
            title="Delete"
          >
            <DeleteSVG />
          </button>
        </div>
      </div>
    </div>
  );
}
