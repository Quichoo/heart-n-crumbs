import { useEffect, useRef, useState } from "react";

function QuantityStepper({ label, price, quantity, onIncrement, onDecrement }) {
  const [animate, setAnimate] = useState(false);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    setAnimate(true);
    const timer = setTimeout(() => setAnimate(false), 250);
    return () => clearTimeout(timer);
  }, [quantity]);

  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-stone-800">
        {label} <span className="text-stone-700 font-medium">P{price}</span>
      </span>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onDecrement}
          className="w-6 h-6 flex items-center justify-center rounded-full border border-stone-500 text-stone-800 hover:bg-stone-100/50"
        >
          −
        </button>
        <span
          className={`w-4 text-center text-stone-900 font-medium inline-block ${animate ? "quantity-pop" : ""}`}
        >
          {quantity}
        </span>
        <button
          type="button"
          onClick={onIncrement}
          className="w-6 h-6 flex items-center justify-center rounded-full border border-stone-500 text-stone-800 hover:bg-stone-100/50"
        >
          +
        </button>
      </div>
    </div>
  );
}

export default QuantityStepper;
