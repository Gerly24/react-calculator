import { faCalculator } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useReducer } from "react";

const getButtonClass = (label) => {
  const baseClass =
    "h-12 sm:h-14 md:h-16 rounded-xl sm:rounded-2xl text-base sm:text-lg md:text-xl font-semibold transition-all duration-200 hover:-translate-y-0.5 active:scale-95 shadow-sm";

  if (label === "=")
    return `${baseClass} bg-gradient-to-br from-blue-500 to-indigo-600 text-white hover:from-blue-400 hover:to-indigo-500 shadow-lg shadow-blue-500/20`;
  if (["+", "-", "*", "/"].includes(label))
    return `${baseClass} bg-blue-500/15 text-blue-300 hover:bg-blue-500/25 border border-blue-400/20`;
  if (label === "C")
    return `${baseClass} bg-red-500/15 text-red-300 hover:bg-red-500/25 border border-red-400/20`;
  if (["%", "⌫"].includes(label))
    return `${baseClass} bg-white/10 text-gray-200 hover:bg-white/15 border border-white/10`;
  return `${baseClass} bg-neutral-800/80 text-white hover:bg-neutral-700 border border-white/5`;
};

const CalculatorButton = ({ label, onClick }) => (
  <button onClick={onClick} className={getButtonClass(label)}>
    {label}
  </button>
);

const initialState = {
  currentNumber: "0",
  previousNumber: null,
  operator: null,
  overwrite: false,
};

const evaluate = ({ currentNumber, previousNumber, operator }) => {
  const prev = parseFloat(previousNumber),
    curr = parseFloat(currentNumber);
  if (isNaN(prev) || isNaN(curr)) return "0";
  if (operator === "/" && curr === 0) return "Error";

  const operations = {
    "+": prev + curr,
    "-": prev - curr,
    "*": prev * curr,
    "/": prev / curr,
  };
  return operations[operator]?.toString() ?? "0";
};

const handleAdd = (state, digit) => {
  if (state.overwrite)
    return { ...state, currentNumber: digit, overwrite: false };
  if (digit === "." && state.currentNumber.includes(".")) return state;
  if (state.currentNumber === "0" && digit !== ".")
    return { ...state, currentNumber: digit };

  return { ...state, currentNumber: state.currentNumber + digit };
};

const handleOperator = (state, operator) => {
  if (state.currentNumber === "Error") return state;

  if (!state.previousNumber)
    return {
      ...state,
      previousNumber: state.currentNumber,
      operator,
      currentNumber: "0",
    };

  return {
    ...state,
    previousNumber: evaluate(state),
    operator,
    currentNumber: "0",
  };
};

const handleEvaluate = (state) => {
  if (!state.operator || !state.previousNumber) return state;
  return {
    ...state,
    currentNumber: evaluate(state),
    previousNumber: null,
    operator: null,
    overwrite: true,
  };
};

const handleBackspace = (state) => {
  if (state.overwrite)
    return { ...state, currentNumber: "0", overwrite: false };
  return {
    ...state,
    currentNumber:
      state.currentNumber.length <= 1 ? "0" : state.currentNumber.slice(0, -1),
  };
};

const handlePercent = (state) => {
  const current = parseFloat(state.currentNumber);

  if (!state.operator || !state.previousNumber) {
    return { ...state, currentNumber: (current / 100).toString() };
  }

  const prev = parseFloat(state.previousNumber);

  const result =
    state.operator === "+" || state.operator === "-"
      ? (prev * current) / 100
      : current / 100;

  return { ...state, currentNumber: result.toString() };
};

const calculatorReducer = (state, action) => {
  if (state.currentNumber === "Error" && action.type !== "CLEAR") return state;

  switch (action.type) {
    case "ADD":
      return handleAdd(state, action.payload);
    case "CHOOSE_OPERATOR":
      return handleOperator(state, action.payload);
    case "EVALUATE":
      return handleEvaluate(state);
    case "BACKSPACE":
      return handleBackspace(state);
    case "PERCENT":
      return handlePercent(state);
    case "CLEAR":
      return initialState;
    default:
      return state;
  }
};

const layout = [
  ["C", "%", "⌫", "/"],
  ["7", "8", "9", "*"],
  ["4", "5", "6", "-"],
  ["1", "2", "3", "+"],
  ["00", "0", ".", "="],
];

const createButton = (btn) => {
  if (["+", "-", "*", "/"].includes(btn))
    return { label: btn, type: "CHOOSE_OPERATOR", payload: btn };
  if (btn === "=") return { label: btn, type: "EVALUATE" };
  if (btn === "C") return { label: btn, type: "CLEAR" };
  if (btn === "⌫") return { label: btn, type: "BACKSPACE" };
  if (btn === "%") return { label: btn, type: "PERCENT" };
  return { label: btn, type: "ADD", payload: btn };
};

const calculatorButtons = layout.flat().map(createButton);

export const CalculatorWithReducer = () => {
  const [state, dispatch] = useReducer(calculatorReducer, initialState);

  const expression =
    state.previousNumber && state.operator
      ? `${state.previousNumber} ${state.operator}`
      : "";

  return (
    <div className="w-full flex justify-center px-2 sm:px-4">
      <div className="w-full max-w-85 sm:max-w-100 md:max-w-112.5 rounded-4xl bg-linear-to-br from-neutral-900 via-neutral-950 to-black p-4 sm:p-5 md:p-6 text-white shadow-2xl shadow-black/40 border border-white/10">
        {/* HEADER */}
        <div className="mb-5 sm:mb-6 flex items-center justify-between">
          <div>
            <p className="flex items-center gap-2 text-xs sm:text-sm text-gray-400">
              <FontAwesomeIcon icon={faCalculator} className="text-blue-400" />
              Calculator with useReducer
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
        <div className="mb-4 sm:mb-5 rounded-3xl bg-white/5 border border-white/10 p-4 sm:p-5 shadow-inner">
          <p className="min-h-6 text-right text-xs sm:text-sm md:text-base text-gray-400 break-all overflow-hidden">
            {expression}
          </p>

          <p
            style={{ fontVariantNumeric: "tabular-nums" }}
            className={`mt-3 min-h-14 text-right font-semibold tracking-tight text-3xl sm:text-5xl md:text-6xl break-all overflow-hidden ${state.currentNumber === "Error" ? "text-red-400" : "text-white"}`}
          >
            {state.currentNumber}
          </p>
        </div>

        {/* BUTTON GRID */}
        <div className="grid grid-cols-4 gap-2 sm:gap-3 md:gap-4">
          {calculatorButtons.map((button) => (
            <CalculatorButton
              key={button.label}
              label={button.label}
              onClick={() => dispatch(button)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
