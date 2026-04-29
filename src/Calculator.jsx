import { faCalculator } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"

export const Calculator = () => {
    const [number, setNumber] = useState("0")
    const [previousNumber, setPreviousNumber] = useState(null)
    const [operator, setOperator] = useState(null)

    const handleNumber = (value) => {
        setNumber(prev => {
            if (value === "." && prev.includes(".")) {
                return prev;
            }

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

    const handleClearAllNumbers = () => {
        setNumber("0")
        setPreviousNumber(null)
        setOperator(null)
    }

    const handleClearNumber = () => {
        setNumber(prev => {
            if (prev.length === 1) return "0";
            return prev.slice(0, -1);
        });
    }

    const handlePercent = () => {
        if (!previousNumber || !operator) return;

        const prev = parseFloat(previousNumber);
        const current = parseFloat(number);

        let result;

        if (operator === "+" || operator === "-") {
            result = (prev * current) / 100;
        } else {
            result = current / 100;
        }

        setNumber(result.toString());
    };

    const calculateResult = () => {
        const prev = parseFloat(previousNumber)
        const current = parseFloat(number)
        let result;
        switch (operator) {
            case "+":
                result = prev + current
                break;
            case "-":
                result = prev - current
                break;
            case "x":
                result = prev * current
                break;
            case "/":
                result = current !== 0 ? prev / current : "Error";
                break;
            default:
                return
        }
        setNumber(result.toString())
        setPreviousNumber(null)
        setOperator(null)
    }

    return (
        <div className="bg-neutral-900 text-white p-5 rounded-lg shadow-lg flex flex-col items-center gap-4 w-[17vw]">
            <p className="flex items-center gap-2 text-left w-full"><FontAwesomeIcon icon={faCalculator} />Calculator</p>
            <h1 className="text-left text-xl font-medium w-full">Standard</h1>
            <div className="w-full text-right ">
                <p className="text-lg text-gray-400">{previousNumber} {operator} {number}</p>
                <p className="text-5xl font-semibold text-gray-100">{number}</p>
            </div>

            <div className="grid grid-cols-4 gap-2 w-full">

                <button onClick={handleClearNumber} className="bg-neutral-700 p-4 rounded-lg text-xl font-medium hover:bg-neutral-600 transition-colors">C</button>
                <button onClick={handlePercent} className="bg-neutral-700 p-4 rounded-lg text-xl font-medium hover:bg-neutral-600 transition-colors">%</button>
                <button onClick={handleClearAllNumbers} className="bg-neutral-700 p-4 rounded-lg text-xl font-medium hover:bg-neutral-600 transition-colors">CE</button>
                <button onClick={() => handleOperator("/")} className="bg-neutral-700 p-4 rounded-lg text-xl font-medium hover:bg-neutral-600 transition-colors">/</button>

                {/* 7,8,9,x */}
                {[7, 8, 9].map((first_row_num) => (
                    <button
                        key={first_row_num}
                        className="bg-neutral-700 p-4 rounded-lg text-xl font-medium hover:bg-neutral-600 transition-colors"
                        onClick={() => handleNumber(first_row_num.toString())}>{first_row_num}</button>
                ))}
                <button onClick={() => handleOperator("x")} className="bg-neutral-700 p-4 rounded-lg text-xl font-medium hover:bg-neutral-600 transition-colors">x</button>

                {/* 4,5,6,- */}
                {[4, 5, 6].map((second_row_num) => (
                    <button
                        key={second_row_num}
                        className="bg-neutral-700 p-4 rounded-lg text-xl font-medium hover:bg-neutral-600 transition-colors"
                        onClick={() => handleNumber(second_row_num.toString())}>{second_row_num}</button>
                ))}
                <button onClick={() => handleOperator("-")} className="bg-neutral-700 p-4 rounded-lg text-xl font-medium hover:bg-neutral-600 transition-colors">-</button>

                {/* 1,2,3,+ */}
                {[1, 2, 3].map((third_row_num) => (
                    <button
                        key={third_row_num}
                        className="bg-neutral-700 p-4 rounded-lg text-xl font-medium hover:bg-neutral-600 transition-colors"
                        onClick={() => handleNumber(third_row_num.toString())}>{third_row_num}</button>
                ))}
                <button onClick={() => handleOperator("+")} className="bg-neutral-700 p-4 rounded-lg text-xl font-medium hover:bg-neutral-600 transition-colors">+</button>

                {/* 00,0,.,= */}
                <button onClick={() => handleNumber("00")} className="bg-neutral-700 p-4 rounded-lg text-xl font-medium hover:bg-neutral-600 transition-colors">00</button>
                <button onClick={() => handleNumber("0")} className="bg-neutral-700 p-4 rounded-lg text-xl font-medium hover:bg-neutral-600 transition-colors">0</button>
                <button onClick={() => handleNumber(".")} className="bg-neutral-700 p-4 rounded-lg text-xl font-medium hover:bg-neutral-600 transition-colors">.</button>
                <button onClick={calculateResult} className="bg-neutral-700 p-4 rounded-lg text-xl font-medium hover:bg-neutral-600 transition-colors">=</button>
            </div>
        </div>
    )
}