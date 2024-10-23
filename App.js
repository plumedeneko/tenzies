import React from "react"
import Die from "./Die"
import Confetti from "react-confetti"
import { nanoid } from "nanoid"

export default function App() {

    const [dice, setDice] = React.useState(allNewDice())
    const [tenzies, setTenzies] = React.useState(false)
    const [rollCount, setRollCount] = React.useState(0)
    const [bestRolls, setBestRolls] = React.useState(parseInt(localStorage.getItem("rolls")) || Infinity)
    
    const [time, setTime] = React.useState(0)
    const [running, setRunning] = React.useState(false)
    const [bestTime, setBestTime] = React.useState(parseInt(localStorage.getItem("time")) || Infinity)
    
    React.useEffect(() => {
        let interval
        if (running) {
            interval = setInterval(() => {
                setTime(prev => prev + 10)
            }, 10)
        } else {
            clearInterval(interval)
        }
        return () => clearInterval(interval)
    }, [running])
    
    React.useEffect(() => {
        const allHeld = dice.every(die => die.isHeld)
        const firstValue = dice[0].value
        const allSameValue = dice.every(die => die.value === firstValue)
        if (allHeld && allSameValue) {
            setTenzies(true)
            setRunning(false)
            if (rollCount < bestRolls) {
                localStorage.setItem("rolls", `${rollCount}`)
                setBestRolls(rollCount)
            }
            if (time < bestTime) {
                localStorage.setItem("time", `${time}`)
                setBestTime(time)
            }
        }
    }, [dice])

    function generateNewDie() {
        return {
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid()
        }
    }
    
    function allNewDice() {
        const newDice = []
        for (let i = 0; i < 10; i++) {
            newDice.push(generateNewDie())
        }
        return newDice
    }
    
    function rollDice() {
        if(!tenzies) {
            setDice(oldDice => oldDice.map(die => {
                return die.isHeld ? 
                    die :
                    generateNewDie()
            }))
            setRollCount(prev => prev + 1)
        } else {
            setTenzies(false)
            setDice(allNewDice())
            setRollCount(0)
            setTime(0)
        }
    }
    
    function holdDice(id) {
        if (!running) {
            setRunning(true)
        }
        setDice(oldDice => oldDice.map(die => {
            return die.id === id ? 
                {...die, isHeld: !die.isHeld} :
                die
        }))
    }
    
    const diceElements = dice.map(die => (
        <Die 
            key={die.id} 
            value={die.value} 
            isHeld={die.isHeld} 
            holdDice={() => holdDice(die.id)}
        />
    ))
    
    return (
        <main>
            {tenzies && <Confetti />}
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. 
            Click a die to freeze it at its current value between rolls.</p>
            <div className="dice-container">
                {diceElements}
            </div>
            <div className="infobar">
                <div className="stats">
                    <p className="stats-text">Rolls: {rollCount}</p>
                    <p className="stats-text">Best:&nbsp;&nbsp;{bestRolls === Infinity ? "-" : bestRolls}</p>
                </div>
                <button 
                    className="roll-dice" 
                    onClick={rollDice}
                >
                    {tenzies ? "New Game" : "Roll"}
                </button>
                <div className="stats">
                    <p className="stats-text">Time:&nbsp;
                        <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
                        <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}:</span>
                        <span>{("0" + ((time / 10) % 100)).slice(-2)}</span>
                    </p>
                    <p className="stats-text">Best:&nbsp; 
                        {bestTime === Infinity ?
                        "--:--:--" :
                        <div><span>{("0" + Math.floor((bestTime / 60000) % 60)).slice(-2)}:</span>
                        <span>{("0" + Math.floor((bestTime / 1000) % 60)).slice(-2)}:</span>
                        <span>{("0" + ((bestTime / 10) % 100)).slice(-2)}</span></div>
                        }
                    </p>
                </div>
            </div>
        </main>
    )
}