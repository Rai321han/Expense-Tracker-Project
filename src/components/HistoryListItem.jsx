import { useState } from "react";
import { DeleteSVG, EditSVG } from "../utils/SVGs";
import { formatTimestampToString, formatDate } from "../utils/dateFormat";

/* eslint-disable react/prop-types */
export default function HistoryListItem({
  data,
  onPopulateForm,
  onDelete,
  resetForm,
}) {
  const [isEdit, setIsEdit] = useState(true);

  const { category, date, amount, type, id } = data;

  return (
    <div
      className={`${
        isEdit ? "text-gray-600" : "text-black"
      } flex justify-between items-center py-2 relative group cursor-pointer`}
    >
      <div>
        <h3 className="text-base font-medium leading-7 ">{category}</h3>
        <p className="text-xs ">
          {date === "" ? "No date provided" : formatDate(date)}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <p
          className={`${
            isEdit ? "group-hover:-translate-x-14" : "-translate-x-14"
          } text-base font-semibold  transition-all `}
        >
          BDT {amount}
        </p>

        <div
          className={`${
            isEdit
              ? "translate-x-5 group-hover:translate-x-0 opacity-0 group-hover:opacity-100"
              : "trasnlate-x-0 opcaity-100"
          }  absolute right-0 top-1/2 -translate-y-1/2 transition-all flex flex-row gap-2`}
        >
          <button
            className="hover:text-teal-600 relative group"
            role="button"
            title="Edit Button"
            onClick={() => {
              if (isEdit) {
                onPopulateForm({
                  ...data,
                  date: formatTimestampToString(date),
                });
              } else {
                resetForm();
              }
              setIsEdit((prev) => !prev);
            }}
          >
            <EditSVG />
            <div
              className={`absolute w-6 h-6  ${
                !isEdit && "animate-pulse border-teal-900 border-2"
              }  rounded-full -translate-y-1/2 -translate-x-1/2 top-1/2 left-1/2 -z-10 `}
            ></div>
          </button>

          <button
            onClick={() => onDelete(id, type)}
            className="hover:text-red-600 "
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
