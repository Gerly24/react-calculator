import { faCalculator } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"

export const Calculator = () => {
    const [number, setNumber] = useState("0")
    const [previousNumber, setPreviousNumber] = useState(null)
    const [operator, setOperator] = useState(null)

    const handleNumber = (number) => {
        setNumber((prev) => prev === "0" ? number : prev + number)
    }

    const handleOperator = (operator) => {
        setPreviousNumber(number)
        setOperator(operator)
        setNumber("0")
    }

    const handleClearNumber = () => {
        setNumber("0")
        setPreviousNumber(null)
        setOperator(null)
    }

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
                {[7, 8, 9].map((first_row_num) => (
                    <button
                        key={first_row_num}
                        className="bg-neutral-700 p-4 rounded-lg text-xl font-medium hover:bg-neutral-600 transition-colors"
                        onClick={() => handleNumber(first_row_num.toString())}>{first_row_num}</button>
                ))}
                <button onClick={() => handleOperator("+")} className="bg-neutral-700 p-4 rounded-lg text-xl font-medium hover:bg-neutral-600 transition-colors">+</button>

                {[4, 5, 6].map((second_row_num) => (
                    <button
                        key={second_row_num}
                        className="bg-neutral-700 p-4 rounded-lg text-xl font-medium hover:bg-neutral-600 transition-colors"
                        onClick={() => handleNumber(second_row_num.toString())}>{second_row_num}</button>
                ))}
                <button onClick={() => handleOperator("-")} className="bg-neutral-700 p-4 rounded-lg text-xl font-medium hover:bg-neutral-600 transition-colors">-</button>

                {[1, 2, 3].map((third_row_num) => (
                    <button
                        key={third_row_num}
                        className="bg-neutral-700 p-4 rounded-lg text-xl font-medium hover:bg-neutral-600 transition-colors"
                        onClick={() => handleNumber(third_row_num.toString())}>{third_row_num}</button>
                ))}
                <button onClick={() => handleOperator("x")} className="bg-neutral-700 p-4 rounded-lg text-xl font-medium hover:bg-neutral-600 transition-colors">x</button>

                <button onClick={handleClearNumber} className="bg-neutral-700 p-4 rounded-lg text-xl font-medium hover:bg-neutral-600 transition-colors">C</button>
                <button onClick={() => handleOperator("0")} className="bg-neutral-700 p-4 rounded-lg text-xl font-medium hover:bg-neutral-600 transition-colors">0</button>
                <button onClick={() => handleOperator("/")} className="bg-neutral-700 p-4 rounded-lg text-xl font-medium hover:bg-neutral-600 transition-colors">/</button>
                <button onClick={calculateResult} className="bg-neutral-700 p-4 rounded-lg text-xl font-medium hover:bg-neutral-600 transition-colors">=</button>
            </div>
        </div>
    )
}