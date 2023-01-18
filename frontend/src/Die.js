import React from 'react'

const Die = ({ die, selectDice }) => {
    return (
        <button
            onClick={(e) => selectDice(e, die.id, die.num)}
            num={die.num}
            id={die.id}
            className={die.selected ? 'die selected' : 'die not-selected'}
            type="button"
        >
            {die.num}
        </button>
    )
}

export default Die