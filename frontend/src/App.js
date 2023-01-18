import React, { useState, useEffect } from 'react';
import './index.css';
import Die from './Die'
import questionMark from './imgs/svg/question-mark-in-a-circle.svg'

function App() {
  const [dice, setDice] = useState(allNewDice())
  const [win, setWin] = useState(false)
  const [showTip, setShowTip] = useState(false)

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
      <main>
        <div className='container'>
          <div className={showTip ? 'tip showed' : 'tip'}>
            How to play: You must select 10 dice with same
            numbers. If numbers don't match, you can roll to change them.
          </div>
          <div className='header-1'>
            <img src={questionMark}
              className='question-mark'
              title="How to play?"
              onClick={() => setShowTip(!showTip)} />
            <h1>Tenzies game</h1>
          </div>
          <section className='dice-game'>
            <div className='dice-container'>
              {winner()}
              {
                dice.map(die => {
                  return <Die die={die} selectDice={selectDice} key={die.id} />
                })
              }
            </div>
            <button onClick={() => roll()}
              type="button"
              className='roll-btn'>
              Roll
            </button>
          </section>
        </div>
      </main>
    </>
  );
}

export default App;
