import { useState, useRef, useEffect } from "react";

const STATUS_STYLES = {
  pending: "bg-amber-100 text-amber-800",
  ongoing: "bg-blue-100 text-blue-800",
  done: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

const STATUS_OPTIONS = ["pending", "ongoing", "done", "cancelled"];

function StatusDropdown({ status, onChange }) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block" ref={containerRef}>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setOpen((prev) => !prev);
        }}
        className={`text-xs font-medium px-3 py-1 rounded-full cursor-pointer ${STATUS_STYLES[status]}`}
      >
        {status}
      </button>

      {open && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute z-10 mt-1 bg-white border border-stone-200 rounded-md shadow-md py-1 w-32"
        >
          {STATUS_OPTIONS.map((option) => (
            <button
              key={option}
              onClick={() => {
                onChange(option);
                setOpen(false);
              }}
              className={`w-full text-left px-3 py-1.5 text-sm cursor-pointer hover:bg-stone-50 ${
                option === status
                  ? "font-semibold text-stone-900"
                  : "text-stone-600"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default StatusDropdown;
