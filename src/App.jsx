import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [len, setLength] = useState(12)

  return (
    <>
      <div id="container">
        <h3>Password Generator</h3>
        <div className="setting">
          <label htmlFor="length">Password Length: </label>
          <input id="length" type="number" min="5" max="20" value={len} onChange={e => setLength(e.target.value)} />
        </div>
        <div className="setting">

        </div>
        <div className="setting">

        </div>
        <div className="setting">

        </div>
        <div className="setting">

        </div>
        <button>Generate</button>
      </div>
    </>
  )
}

export default App
