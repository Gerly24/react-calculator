import { faCalculator } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

const getButtonClass = (label) => {
  const baseClass =
    "p-4 rounded-xl text-xl font-medium transition-all duration-200 active:scale-95 border";

  if (label === "=") {
    return `${baseClass} bg-gradient-to-br from-blue-500 to-indigo-600 text-white border-blue-500/20 hover:brightness-110`;
  }

  if (["+", "-", "x", "/"].includes(label)) {
    return `${baseClass} bg-blue-500/10 text-blue-300 border-blue-400/20 hover:bg-blue-500/20`;
  }

  if (label === "CE") {
    return `${baseClass} bg-red-500/10 text-red-300 border-red-400/20 hover:bg-red-500/20`;
  }

  if (["C", "%"].includes(label)) {
    return `${baseClass} bg-white/10 text-gray-300 border-white/10 hover:bg-white/15`;
  }

  return `${baseClass} bg-neutral-800 text-white border-white/5 hover:bg-neutral-700`;
};

const CalculatorButton = ({ label, onClick }) => (
  <button onClick={onClick} className={getButtonClass(label)}>
    {label}
  </button>
);

export const Calculator = () => {
  const [number, setNumber] = useState("0");
  const [previousNumber, setPreviousNumber] = useState(null);
  const [operator, setOperator] = useState(null);

  const handleNumber = (value) => {
    setNumber((prev) => {
      if (value === "." && prev.includes(".")) return prev;

      if (prev === "0") {
        if (value === ".") return "0.";
        if (value === "00") return "0";
        return value;
      }

      return prev + value;
    });
  };

  const handleOperator = (op) => {
    if (operator) {
      setOperator(op);
      return;
    }

    setPreviousNumber(number);
    setOperator(op);
    setNumber("0");
  };

  const handleClearAll = () => {
    setNumber("0");
    setPreviousNumber(null);
    setOperator(null);
  };

  const handleBackspace = () => {
    setNumber((prev) => (prev.length <= 1 ? "0" : prev.slice(0, -1)));
  };

  const handlePercent = () => {
    const current = parseFloat(number);

    if (!previousNumber || !operator) {
      setNumber((current / 100).toString());
      return;
    }

    const prev = parseFloat(previousNumber);

    const result =
      operator === "+" || operator === "-"
        ? (prev * current) / 100
        : current / 100;

    setNumber(result.toString());
  };

  const calculate = () => {
    const prev = parseFloat(previousNumber);
    const current = parseFloat(number);

    let result;

    switch (operator) {
      case "+":
        result = prev + current;
        break;

      case "-":
        result = prev - current;
        break;

      case "x":
        result = prev * current;
        break;

      case "/":
        result = current !== 0 ? prev / current : "Error";
        break;

      default:
        return;
    }

    setNumber(result.toString());
    setPreviousNumber(null);
    setOperator(null);
  };

  const buttons = [
    { label: "C", action: handleBackspace },
    { label: "%", action: handlePercent },
    { label: "CE", action: handleClearAll },
    { label: "/", action: () => handleOperator("/") },

    ...[7, 8, 9].map((num) => ({
      label: num.toString(),
      action: () => handleNumber(num.toString()),
    })),
    { label: "x", action: () => handleOperator("x") },

    ...[4, 5, 6].map((num) => ({
      label: num.toString(),
      action: () => handleNumber(num.toString()),
    })),
    { label: "-", action: () => handleOperator("-") },

    ...[1, 2, 3].map((num) => ({
      label: num.toString(),
      action: () => handleNumber(num.toString()),
    })),
    { label: "+", action: () => handleOperator("+") },

    { label: "00", action: () => handleNumber("00") },
    { label: "0", action: () => handleNumber("0") },
    { label: ".", action: () => handleNumber(".") },
    { label: "=", action: calculate },
  ];

  const expression =
    previousNumber && operator ? `${previousNumber} ${operator}` : "";

  return (
    <div className="w-full flex justify-center px-2 sm:px-4">
      <div className="w-full max-w-85 sm:max-w-100 md:max-w-112.5 rounded-4xl bg-linear-to-br from-neutral-900 via-neutral-950 to-black p-4 sm:p-5 md:p-6 text-white border border-white/10 shadow-2xl shadow-black/40">
        {/* HEADER */}
        <div className="mb-5 flex items-center justify-between">
          <div>
            <p className="flex items-center gap-2 text-xs sm:text-sm text-gray-400">
              <FontAwesomeIcon icon={faCalculator} className="text-blue-400" />
              Calculator with useState
            </p>

            <h1 className="mt-1 text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight">
              Standard
            </h1>
          </div>

          <div className="flex h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 items-center justify-center rounded-2xl bg-blue-500/10 border border-blue-400/20">
            <FontAwesomeIcon
              icon={faCalculator}
              className="text-blue-300 text-sm sm:text-base md:text-lg"
            />
          </div>
        </div>

        {/* DISPLAY */}
        <div className="mb-5 rounded-3xl bg-white/5 border border-white/10 p-4 sm:p-5 shadow-inner">
          <p className="min-h-6 text-right text-xs sm:text-sm md:text-base text-gray-400 break-all overflow-hidden">
            {expression}
          </p>

          <p
            style={{ fontVariantNumeric: "tabular-nums" }}
            className={`mt-3 min-h-14 text-right font-semibold tracking-tight text-3xl sm:text-5xl md:text-6xl break-all overflow-hidden ${
              number === "Error" ? "text-red-400" : "text-white"
            }`}
          >
            {number}
          </p>
        </div>

        {/* BUTTON GRID */}
        <div className="grid grid-cols-4 gap-2 sm:gap-3 md:gap-4">
          {buttons.map((btn, index) => (
            <CalculatorButton
              key={index}
              label={btn.label}
              onClick={btn.action}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
