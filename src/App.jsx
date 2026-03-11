import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClipboard } from '@fortawesome/free-solid-svg-icons'

function App() {
  const [len, setLength] = useState(12)
  const [upper, setUpper] = useState(true);
  const [lower, setLower] = useState(true);
  const [nums, setNums] = useState(true);
  const [sym, setSym] = useState(true);
  const [pass, setPass] = useState(null)

  const getPassword = () => {
    const up = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    const low = "abcdefghijklmnopqrstuvwxyz"
    const num = "1234567890"
    const sy = "@#$%^&*()_+-=[]{}|;:<>?"

    let valid = ""
    if (upper) valid += up
    if (lower) valid += low
    if (nums) valid += num
    if (sym) valid += sy

    // The user is able to type numbers that exceed the defined limits so check
    let length = len
    if(len < 5) {
      setLength(5)
      length = 5
    }
    else if(len > 20) {
      setLength(20)
      length = 20
    }

    let password = ""
    for(let i = 0; i < length; i++) {
      password += valid[Math.floor(Math.random() * valid.length)]
    }

    setPass(password)
  }

  return (
    <>
      <div id="container">
        <h2>Password Generator</h2>
        <div id="password-res">
          <span className="result">{pass}</span>
          <button className="clip">
            <FontAwesomeIcon icon={faClipboard} />
          </button>
        </div>
        <div id="settings">
          <div className="setting">
            <label htmlFor="length">Password Length</label>
            <input id="length" type="number" min="5" max="20" value={len} onChange={e => setLength(e.target.value)} />
          </div>
          <div className="setting">
            <label htmlFor="uppercase">Include Uppercase Letters</label>
            <input id="uppercase" type="checkbox" checked={upper} onChange={e => setUpper(e.target.checked)}/>
          </div>
          <div className="setting">
            <label htmlFor="lowercase">Include Lowercase Letters</label>
            <input id="lowercase" type="checkbox" checked={lower} onChange={e => setLower(e.target.checked)}/>
          </div>
          <div className="setting">
            <label htmlFor="numbers">Include Numbers</label>
            <input id="numbers" type="checkbox" checked={nums} onChange={e => setNums(e.target.checked)}/>
          </div>
          <div className="setting">
            <label htmlFor="symbols">Include Special Symbols</label>
            <input id="symbols" type="checkbox" checked={sym} onChange={e => setSym(e.target.checked)}/>
          </div>
        </div>
        <button id="generate" onClick={getPassword}>Generate</button>
      </div>
    </>
  )
}

export default App
