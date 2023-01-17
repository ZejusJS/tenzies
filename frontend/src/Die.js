import React from 'react'

const Die = ({ die, selectDice }) => {
    return (
        <button
            onClick={(e) => selectDice(e, die.id, die.num)}
            num={die.num}
            id={die.id}
            className={die.selected ? 'selected' : 'not-selected'}
        >
            {die.num}
        </button>
    )
}

export default Die