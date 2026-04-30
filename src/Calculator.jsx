import { faCalculator } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

const CalculatorButton = ({ label, onClick }) => (
  <button
    onClick={onClick}
    className="bg-neutral-700 p-4 rounded-lg text-xl font-medium hover:bg-neutral-600 transition-colors"
  >
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

  // Clear all
  const handleClearAll = () => {
    setNumber("0");
    setPreviousNumber(null);
    setOperator(null);
  };

  // Backspace
  const handleBackspace = () => {
    setNumber((prev) => (prev.length === 1 ? "0" : prev.slice(0, -1)));
  };

  // Percent
  const handlePercent = () => {
    if (!previousNumber || !operator) return;

    const prev = parseFloat(previousNumber);
    const current = parseFloat(number);

    const result =
      operator === "+" || operator === "-"
        ? (prev * current) / 100
        : current / 100;

    setNumber(result.toString());
  };

  // Calculate
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

  // Button layout config
  const buttons = [
    { label: "C", action: handleBackspace },
    { label: "%", action: handlePercent },
    { label: "CE", action: handleClearAll },
    { label: "/", action: () => handleOperator("/") },

    ...[7, 8, 9].map((first_row) => ({
      label: first_row,
      action: () => handleNumber(first_row.toString()),
    })),
    { label: "x", action: () => handleOperator("x") },

    ...[4, 5, 6].map((second_row) => ({
      label: second_row,
      action: () => handleNumber(second_row.toString()),
    })),
    { label: "-", action: () => handleOperator("-") },

    ...[1, 2, 3].map((third_row) => ({
      label: third_row,
      action: () => handleNumber(third_row.toString()),
    })),
    { label: "+", action: () => handleOperator("+") },

    { label: "00", action: () => handleNumber("00") },
    { label: "0", action: () => handleNumber("0") },
    { label: ".", action: () => handleNumber(".") },
    { label: "=", action: calculate },
  ];

  return (
    <div className="bg-neutral-900 text-white p-5 rounded-lg shadow-lg flex flex-col items-center gap-4">
      <p className="flex items-center gap-2 w-full text-gray-300 text-sm">
        <FontAwesomeIcon icon={faCalculator} />
        Calculator with useState
      </p>

      <h1 className="text-left text-xl font-medium w-full">Standard</h1>

      <div className="w-full text-right">
        <p className="text-lg text-gray-400">
          {previousNumber} {operator} {number}
        </p>
        <p className="text-5xl font-semibold">{number}</p>
      </div>

      <div className="grid grid-cols-4 gap-2 w-full">
        {buttons.map((btn, index) => (
          <CalculatorButton key={index} label={btn.label} onClick={btn.action} />
        ))}
      </div>
    </div>
  );
};