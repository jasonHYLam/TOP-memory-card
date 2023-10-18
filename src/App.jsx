import { useState } from 'react'
import { Card } from './components/Card'
import { ScoreDisplay } from './components/ScoreDisplay'
import './App.css'


function App() {

  function createStartingKeysArray() {
    let startingArray = []
    for (let i = 0; i < 3; i++) {
      startingArray.push(generateValidId());
    }
    return startingArray;
  }

  const startingArray = createStartingKeysArray();
  const [keysArray, setKeysArray] = useState(startingArray)
  const [currentKey, setKey] = useState(generateValidId())
  const [score, setScore] = useState(0);
  const [highestScore, setHighestScore] = useState(0)
  const [clickedIdsArray, setClickedIdsArray] = useState([])

  function generateValidId() {
    let randomKey;
    randomKey = Math.floor(Math.random() * 500)
    return randomKey;
  }

  function setValidId() {
    setKey(generateValidId())
  }
  
  function addToKeysArray() {
    setKeysArray([...keysArray, currentKey])
  }

  function increaseScore() {
    setScore(score+1)
  }

  function resetScore() {
    setScore(0)
  }

  function setHighestScoreIfValid() {
    if (score > highestScore) setHighestScore(score)
  }

  function resetClickedIdsArray() {
    setClickedIdsArray([])
  }


  function resetStartingKeysArray() {
    setKeysArray(startingArray)
  }

  function resetGame() {
    setHighestScoreIfValid();
    resetScore();
    resetClickedIdsArray();
    resetStartingKeysArray();
  }

  function removeKeyFromArray() {
    const randomIndex = Math.floor(Math.random() * keysArray.length)
    keysArray.splice(randomIndex, 1)
    setKeysArray([...keysArray])
  }

  function randomiseArray(array) {
    let shuffled = array
    .map(value => ({value, sort: Math.random() }))
    .sort((a,b) => a.sort - b.sort)
    .map(({value}) => value)
    return shuffled
  }

  function randomiseKeysArray() {
    setKeysArray(keysArray => randomiseArray(keysArray))
  }

  return (
    <>
      <h1> memory card</h1>
      <ScoreDisplay 
      
      score={score}
      highestScore={highestScore}
      />
      <div className='card-container'>

        {keysArray.map(Id=> {
          return (
              <Card 
                key={Id}

                uniqueId={Id}
                setValidId={setValidId}
                addToKeysArray={addToKeysArray}

                increaseScore={increaseScore}

                clickedIdsArray={clickedIdsArray}
                setClickedIdsArray={setClickedIdsArray}

                resetGame={resetGame}
                keysArrayLength={keysArray.length}
                removeKeyFromArray={removeKeyFromArray}
                randomiseKeysArray={randomiseKeysArray}
              />
          )
        })}

      </div>
    </>
  )
}

export default App
