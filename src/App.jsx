import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClipboard, faClipboardCheck } from '@fortawesome/free-solid-svg-icons'
import zxcvbn from 'zxcvbn'

function App() {
  const [len, setLength] = useState(12)
  const [upper, setUpper] = useState(true)
  const [lower, setLower] = useState(true)
  const [nums, setNums] = useState(true)
  const [sym, setSym] = useState(true)
  const [pass, setPass] = useState(null)
  const [copied, setCopied] = useState(false)
  const [strength, setStrength] = useState(null)
  const labels = ["Too Weak", "Weak", "Fair", "Strong", "Very Strong"]

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

    if(valid === "") return // Only stop if none of the boxes are checked

    // The user is able to type numbers that exceed the defined limits so check
    let length = len
    if(len < 3) {
      setLength(3)
      length = 3
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
    setStrength(zxcvbn(password).score) // Returns an int from 0-4 determining password strength
  }

  const copyToClipboard = () => {
    if(pass) {
      navigator.clipboard.writeText(pass)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <>
      <div id="container">
        <h2>Password Generator</h2>
        <div id="password-res">
          <span className="result">{pass}</span>
          <button className="clip" onClick={copyToClipboard}>
            <FontAwesomeIcon icon={copied ? faClipboardCheck : faClipboard} />
          </button>
        </div>
        {strength !== null && <div className={`strength strength-${strength}`}>{labels[strength]}</div>}
        <div id="settings">
          <div className="setting">
            <label htmlFor="length">Password Length</label>
            <input id="length" type="number" min="3" max="20" value={len} onChange={e => setLength(e.target.value)} />
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
