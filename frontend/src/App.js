import React, { useState, useEffect } from 'react';
import './App.css';
import './index.css';
import Die from './Die'

function App() {
  const [dice, setDice] = useState(allNewDice())
  const [win, setWin] = useState(false)

  useEffect(() => {
    let lose = false
    const selectedDice = dice.filter(die => die.selected !== false)
    if (selectedDice.length === 10) {
      for (let i = 0; i < selectedDice.length - 1; i++) {
        if (selectedDice[i].num !== selectedDice[i + 1].num) lose = true
      }
      lose ? setWin(false) && console.log('STILL NOT WIN') 
      : setWin(true) && console.log('WIIN')
    } else {
      setWin(false)
    }
  }, [dice])

  function allNewDice() {
    let d = []
    for (let i = 0; i < 10; i++) {
      d.push({
        id: i,
        selected: false,
        num: randomNum()
      })
    }
    return d
  }

  function randomNum() {
    return Math.floor(Math.random() * 6) + 1
  }

  function selectDice(e, id, num) {
    setDice(prevDices => prevDices.map(die => {
      return die.id === id ?
        { ...die, selected: !die.selected }
        :
        die
    }))
  }

  function roll() {
    setDice(prevDice => prevDice.map(dice => {
      if (!dice.selected) {
        return { ...dice, num: randomNum() }
      } else {
        return dice
      }
    })
    )
  }

  function winner() {
    if (win) {
      return <button>WIIIIN</button>
    } else {
      return false
    }
  }

  console.log(dice)

  return (
    <>
      <div className='container'>
        {winner()}
        {
          dice.map(die => {
            return <Die die={die} selectDice={selectDice} key={die.id} />
          })
        }
        <button onClick={() => roll()}>Roll</button>
      </div>
    </>
  );
}

export default App;
