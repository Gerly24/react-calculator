import './App.css'
import { Calculator } from './Calculator'
import { CalculatorWithReducer } from './CalculatorWithReducer'

function App() {
  return (
    <div className="h-screen bg-white flex items-center justify-center gap-5">
      <Calculator />
      <CalculatorWithReducer />
    </div>
  )
}

export default App
