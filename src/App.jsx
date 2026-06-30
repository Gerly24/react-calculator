import "./App.css";
import { Calculator } from "./Calculator";
import { CalculatorWithReducer } from "./CalculatorWithReducer";

function App() {
  return (
    <div className="min-h-screen bg-white p-4 flex flex-col lg:flex-row items-center justify-center gap-5">
      <Calculator />
      <CalculatorWithReducer />
    </div>
  );
}

export default App;
