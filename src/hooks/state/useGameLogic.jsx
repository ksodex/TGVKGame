import axios from "axios"

import { useRecoilState } from "recoil"

import { ZeroAttempsModal } from "../../components/modals/ZeroAttempsModal"
import { LevelPassed } from "../../components/modals/LevelPassed"
import { formatTime } from "../../utils/formatTime"
import { useModal } from "../useModal"

export const useGameLogicAnnagrams = ({
    selectedLevel,
    setSelectedLevel,
    setAviableTime,
    setAviableSymbols,
    setWordLength,
    setWordIndex,
    setDifficult,
    setAttemps,
    setAttachedSymbols,
    attachedSymbols,
    attemps,
    difficult,
    wordIndex,
    setWinMoney,
    setWinExperience,
    setWinTime,
    toBack
}) => {
    const [modal, setModal] = useRecoilState(useModal)

    const handleCreateRound = async (code) => {
        try {
            const response = await axios.post("/games/annagrams/create", {
                type: "animals",
                difficult: code
            })
            const { data } = response.data

            if (code) {
                setAviableTime(data.availableTime)

                setAviableSymbols(data.gameData.symbols)
                setWordLength(data.gameData.wordLength)
                setWordIndex(data.gameData.wordNumber)
                setDifficult(data.difficult)
                setAttemps(data.attemptsLeft)
                setSelectedLevel(code)

                const initialAttachedSymbols = Array(data.gameData.wordLength)
                    .fill(null)
                    .map(() => ({ id: null, symbol: null }))
                setAttachedSymbols(initialAttachedSymbols)
            }
        } catch (error) {
            console.error("Error fetching data:", error)
        }
    }

    const handleValidateWord = async (type, difficult, wordIndex, result) => {
        try {
            const response = await axios.post("/games/annagrams/validate", {
                type,
                difficult,
                wordIndex,
                userWord: result
            })
            const { data } = response.data

            if (data.isCorrect) {
                setWinMoney(data.money)
                setWinExperience(data.expReceived)
                setWinTime(data.remainingTime)
            } else {
                const attachedData = Array(attachedSymbols.length).fill({
                    id: null,
                    symbol: null
                })
                setAttachedSymbols(attachedData)

                if (attemps - 1 !== 0) setAttemps(attemps - 1)
                else setModal(
                    <ZeroAttempsModal setModal={setModal} toBack={toBack} />
                )
            }

            return data
        } catch (error) {
            console.error("Error fetching data:", error)
        }
    }

    const checkWord = (word) => {
        handleValidateWord("animals", difficult, wordIndex, word).then(data => {
            if (data.isCorrect) {
                setModal(
                    <LevelPassed
                        againVoid={() => {
                            handleCreateRound(selectedLevel)
                        }}
                        setModal={setModal}
                        toBack={toBack}
                        data={{
                            winExperience: data.expReceived,
                            winMoney: data.money,
                            winTime: formatTime(data.remainingTime)
                        }}
                    />
                )
            }
        })
    }

    const getHint = async () => {
        try {
            const response = await axios.get("/games/annagrams/hint")

            const { id, symbol, index } = response.data

            if (!attachedSymbols || !attachedSymbols.length) {
                console.error("attachedSymbols not initialized")
                return null
            }

            if (index < 0 || index >= attachedSymbols.length) {
                console.error("Invalid hint index:", index)
                return null
            }

            const newAttachedSymbols = [...attachedSymbols]
            newAttachedSymbols[index] = {
                id: id,
                symbol: symbol,
                isLocked: true
            }

            setAttachedSymbols(newAttachedSymbols)

            return response.data
        } catch (error) {
            console.error("Error fetching hint:", error)
            return null
        }
    }

    return { handleCreateRound, handleValidateWord, checkWord, getHint }
}

export const useGameLogicMemory = ({
    selectedLevel,
    setSelectedLevel,
    setAviableTime,
    setAviableSymbols,
    setWordLength,
    setWordIndex,
    setDifficult,
    setAttemps,
    setAttachedSymbols,
    column, setColumn,
    grid, setGrid,
    row, setRow,
    attachedSymbols,
    attemps,
    difficult,
    wordIndex,
    setWinMoney,
    setWinExperience,
    setWinTime,
    toBack
}) => {
    const getGridSize = (level) => {
        switch (level) {
            case 4: return { rows: 2, columns: 2 }
            case 6: return { rows: 2, columns: 3 }
            case 12: return { rows: 4, columns: 3 }
            case 16: return { rows: 4, columns: 4 }
            case 20: return { rows: 5, columns: 4 }
            case 24: return { rows: 6, columns: 4 }
        }
    }

    const createGrid = (rows, columns) => {
        const totalCards = rows * columns
        return new Array(totalCards).fill('?')
    }

    const handleCreateRound = async (code) => {
        const gridData = getGridSize(code)
        const grid = createGrid(gridData.rows, gridData.columns)
        console.log(gridData, grid)

        setGrid(grid)
        setRow(gridData.rows)
        setColumn(gridData.columns)

        try {
            const response = await axios.post("/games/memory/create", {
                type: "memory",
                difficult: 1
            })

            const { data } = response.data

            if (code) {
                setAviableTime(data.availableTime)

                setDifficult(data.difficult)
                setAttemps(data.attemptsLeft)
                setSelectedLevel(code)
            }
        } catch (error) {
            console.error("Error fetching data:", error)
        }
    }

    return { getGridSize, handleCreateRound, createGrid }

}
