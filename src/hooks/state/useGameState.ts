import { useState } from "react"

const useDefaultState = () => {
    const [selectedLevel, setSelectedLevel] = useState(undefined)
    const [aviableTime, setAviableTime] = useState(undefined)
    const [difficult, setDifficult] = useState(undefined)
    const [attemps, setAttemps] = useState(undefined)
    const [hints, setHints] = useState(undefined)
    const [winExperience, setWinExperience] = useState(undefined)
    const [winMoney, setWinMoney] = useState(undefined)
    const [winTime, setWinTime] = useState(undefined)

    return {
        selectedLevel, setSelectedLevel,
        aviableTime, setAviableTime,
        difficult, setDifficult,
        attemps, setAttemps,
        winExperience, setWinExperience,
        winMoney, setWinMoney,
        winTime, setWinTime,
        hints, setHints
    }
}

export const useGameStateAnnagrams = () => {
    const defaultState = useDefaultState()

    const [selectedCategory, setSelectedCategory] = useState({id: 0, title: "Животные", type: "animals"})
    const [attachedSymbols, setAttachedSymbols] = useState([])
    const [selectedPosition, setSelectedPosition] = useState(null)
    const [aviableSymbols, setAviableSymbols] = useState(undefined)
    const [wordLength, setWordLength] = useState(undefined)
    const [wordIndex, setWordIndex] = useState(undefined)

    return {
        ...defaultState,
        selectedCategory, setSelectedCategory,
        attachedSymbols, setAttachedSymbols,
        selectedPosition, setSelectedPosition,
        aviableSymbols, setAviableSymbols,
        wordLength, setWordLength,
        wordIndex, setWordIndex
    }
}

export const useGameStateMemory = () => {
    const defaultState = useDefaultState()

    const [column, setColumn] = useState(undefined)
    const [fields, setFields] = useState([])
    const [grid, setGrid] = useState(undefined)
    const [row, setRow] = useState(undefined)

    return {
        ...defaultState,
        column, setColumn,
        fields, setFields,
        grid, setGrid,
        row, setRow
    }
}
