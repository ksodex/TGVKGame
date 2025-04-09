import { useState } from "react"

export const useGameState = () => {
    const [selectedLevel, setSelectedLevel] = useState(undefined)
    const [attachedSymbols, setAttachedSymbols] = useState([])
    const [selectedPosition, setSelectedPosition] = useState(null)
    const [aviableSymbols, setAviableSymbols] = useState(undefined)
    const [aviableTime, setAviableTime] = useState(undefined)
    const [wordLength, setWordLength] = useState(undefined)
    const [wordIndex, setWordIndex] = useState(undefined)
    const [difficult, setDifficult] = useState(undefined)
    const [attemps, setAttemps] = useState(undefined)
    const [hints, setHints] = useState(undefined)
    const [winExperience, setWinExperience] = useState(undefined)
    const [winMoney, setWinMoney] = useState(undefined)
    const [winTime, setWinTime] = useState(undefined)

    return {
        selectedLevel, setSelectedLevel,
        attachedSymbols, setAttachedSymbols,
        selectedPosition, setSelectedPosition,
        aviableSymbols, setAviableSymbols,
        aviableTime, setAviableTime,
        wordLength, setWordLength,
        wordIndex, setWordIndex,
        difficult, setDifficult,
        attemps, setAttemps,
        winExperience, setWinExperience,
        winMoney, setWinMoney,
        winTime, setWinTime,
        hints, setHints
    }
}
