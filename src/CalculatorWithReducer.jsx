import { faCalculator } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useReducer } from "react";

const CalculatorButton = ({ label, onClick }) => (
    <button
        onClick={onClick}
        className="bg-neutral-700 p-4 rounded-lg text-xl font-medium hover:bg-neutral-600 transition-colors"
    >
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
    const prev = parseFloat(previousNumber);
    const curr = parseFloat(currentNumber);

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
    if (state.overwrite) {
        return { ...state, currentNumber: digit, overwrite: false };
    }

    if (digit === "." && state.currentNumber.includes(".")) return state;

    if (state.currentNumber === "0" && digit !== ".") {
        return { ...state, currentNumber: digit };
    }

    return {
        ...state,
        currentNumber: state.currentNumber + digit,
    };
};

const handleOperator = (state, operator) => {
    if (state.currentNumber === "Error") return state;

    if (!state.previousNumber) {
        return {
            ...state,
            previousNumber: state.currentNumber,
            operator,
            currentNumber: "0",
        };
    }

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
    if (state.overwrite) {
        return { ...state, currentNumber: "0", overwrite: false };
    }

    return {
        ...state,
        currentNumber:
            state.currentNumber.length <= 1
                ? "0"
                : state.currentNumber.slice(0, -1),
    };
};

const handlePercent = (state) => {
    const current = parseFloat(state.currentNumber);

    if (!state.operator || !state.previousNumber) {
        return {
            ...state,
            currentNumber: (current / 100).toString(),
        };
    }

    const prev = parseFloat(state.previousNumber);

    const result =
        state.operator === "+" || state.operator === "-"
            ? (prev * current) / 100
            : current / 100;

    return {
        ...state,
        currentNumber: result.toString(),
    };
};

const calculatorReducer = (state, action) => {
    if (state.currentNumber === "Error" && action.type !== "CLEAR") {
        return state;
    }

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
    if (["+", "-", "*", "/"].includes(btn)) {
        return { label: btn, type: "CHOOSE_OPERATOR", payload: btn };
    }

    if (btn === "=") return { label: btn, type: "EVALUATE" };
    if (btn === "C") return { label: btn, type: "CLEAR" };
    if (btn === "⌫") return { label: btn, type: "BACKSPACE" };
    if (btn === "%") return { label: btn, type: "PERCENT" };

    return { label: btn, type: "ADD", payload: btn };
};

const calculatorButtons = layout.flat().map(createButton);

export const CalculatorWithReducer = () => {
    const [state, dispatch] = useReducer(calculatorReducer, initialState);

    return (
        <div className="bg-neutral-900 text-white p-5 rounded-lg shadow-lg flex flex-col items-center gap-3">

            {/* HEADER */}
            <p className="flex items-center gap-2 w-full text-gray-300 text-sm">
                <FontAwesomeIcon icon={faCalculator} />
                Calculator with useReducer
            </p>

            <h1 className="text-left text-xl font-medium w-full">
                Standard
            </h1>

            {/* DISPLAY */}
            <div className="w-full text-right">
                <p className="text-lg text-gray-400">
                    {state.previousNumber} {state.operator} {state.currentNumber}
                </p>
                <p className="text-5xl font-semibold">
                    {state.currentNumber}
                </p>
            </div>

            {/* BUTTON GRID */}
            <div className="grid grid-cols-4 gap-2 w-full">
                {calculatorButtons.map((button) => (
                    <CalculatorButton
                        key={button.label}
                        label={button.label}
                        onClick={() => dispatch(button)}
                    />
                ))}
            </div>
        </div>
    );
};