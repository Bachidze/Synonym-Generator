import { useState } from 'react'
import './App.css'
import axios from 'axios'

type Synonym = {
  word: string;
  score: number;
}

const BASE_URL = `https://api.datamuse.com`

function App() {
  const [word, setWord] = useState('')
  const [synonyms, setSynonyms] = useState<Synonym[]>([])
  const [isEmpty, setIsEmpty] = useState(true)

  const handleFetchSynonyms = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!isEmpty) {
      axios.get(`${BASE_URL}/words?rel_syn=${word}`)
        .then((res) => {
          setSynonyms(res.data.slice(0,10))
        })
    }
  }

  return (
    <div className="App">
      <form action='post' onSubmit={handleFetchSynonyms}>
        <label htmlFor='word-input'>Your Word</label>
        <input
          id='word-input'
          type="text"
          maxLength={12}
          onChange={(e) => {
            setWord(e.target.value)
            setIsEmpty(e.target.value === '') 
          }}
          value={word}
        />
        <button disabled={isEmpty}>Submit</button>
        {isEmpty && <p style={{ color: 'red' }}>Input cannot be empty</p>}
      </form>

      <ul style={{display:'grid', gridTemplateColumns:'auto auto auto', maxWidth:'480px'}}>
        {synonyms.map((synonym, el) => (
          <li key={el}>
            {synonym.word}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App;
