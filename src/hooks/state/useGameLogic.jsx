import axios from "axios"

import { useRecoilState } from "recoil"

import { ZeroAttempsModal } from "../../components/modals/ZeroAttempsModal"
import { LevelPassed } from "../../components/modals/LevelPassed"
import { formatTime } from "../../utils/formatTime"
import { useModal } from "../useModal"

export const useGameLogicAnnagrams = ({
    selectedLevel,
    selectedCategory,
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
    toBack,
    getUserData
}) => {
    const [modal, setModal] = useRecoilState(useModal)

    const handleCreateRound = async (code, category) => {
        try {
            const response = await axios.post("/games/annagrams/create", {
                type: category,
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

    const handleValidate = async (type, difficult, wordIndex, result) => {
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
                    <ZeroAttempsModal
                        gameType={"annagrams"}
                        setModal={setModal}
                        toBack={toBack}
                        againVoid={() => {
                            getUserData().then(data => {
                                setWinMoney(data.money)
                            })
                        }}
                    />
                )
            }

            return data
        } catch (error) {
            console.error("Error fetching data:", error)
        }
    }

    const checkWord = (word) => {
        handleValidate("animals", difficult, wordIndex, word).then(data => {
            if (data.isCorrect) {
                setModal(
                    <LevelPassed
                        againVoid={() => {
                            handleCreateRound(selectedLevel, selectedCategory.type)
                            getUserData().then(data => {
                                setWinMoney(data.money)
                            })
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

    return { handleCreateRound, handleValidate, checkWord, getHint }
}

export const useGameLogicMemory = ({
    selectedLevel,
    setSelectedLevel,
    setAviableTime,
    setDifficult,
    setAttemps,
    setColumn,
    setGrid,
    setRow,
    column,
    grid,
    row,
    setFields,
    attemps,
    setModal,
    setWinMoney,
    setWinExperience,
    setWinTime,
    toBack,
    getUserData
}) => {
    const getGridSize = (level) => {
        switch (level) {
            case 4: return { rows: 2, columns: 2 }
            case 6: return { rows: 2, columns: 3 }
            case 12: return { rows: 4, columns: 3 }
            case 16: return { rows: 4, columns: 4 }
            case 20: return { rows: 5, columns: 4 }
            case 24: return { rows: 6, columns: 4 }
            default: return { rows: 2, columns: 2 }
        }
    }

    const createGrid = (rows, columns) => {
        const totalCards = rows * columns

        return Array(totalCards).fill().map(() => ({
            isOpen: false,
            isCorrect: false,
            value: null
        }))
    }

    const handleCreateRound = async (code) => {
        const gridData = getGridSize(code)
        const grid = createGrid(gridData.rows, gridData.columns)

        setGrid(grid)
        setRow(gridData.rows)
        setColumn(gridData.columns)
        setFields([])

        try {
            const response = await axios.post("/games/memory/create", {
                type: "memory",
                difficult: code
            })

            const { data } = response.data

            if (code) {
                setAviableTime(data.availableTime)
                setDifficult(data.difficult)
                setAttemps(data.attemptsLeft)
                setSelectedLevel(code)
            }
        } catch (error) {
            console.error("Error creating game:", error)
        }
    }

    const handleValidate = async (x, y) => {
        try {
            const newGrid = [...grid]
            const cardIndex = x * column + y

            newGrid[cardIndex] = {
                ...newGrid[cardIndex],
                isOpen: true
            }

            setGrid(newGrid)

            const response = await axios.post("/games/memory/validate", { x, y })
            const data = response.data

            const flattenedField = []

            for (let r = 0; r < row; r++) {
                for (let c = 0; c < column; c++) {
                    const card = data.field[r]?.[c] || { opened: false, value: null }
                    flattenedField[r * column + c] = card
                }
            }

            const updatedGrid = grid.map((card, index) => {
                const fieldCard = flattenedField[index]

                return {
                    isOpen: fieldCard.opened,
                    isCorrect: fieldCard.opened && data.isValid ? true : card.isCorrect,
                    value: fieldCard.opened ? fieldCard.value : null
                }
            })

            setGrid(updatedGrid)
            setAttemps(data.attemptsLeft)

            if (!data.isValid && data.message !== "🃏 Pick one more") {
                setTimeout(() => {
                    const closedGrid = updatedGrid.map(card => ({
                        ...card,
                        isOpen: card.isCorrect ? true : false,
                        value: card.isCorrect ? card.value : null
                    }))

                    setGrid(closedGrid)

                    if (attemps - 1 !== 0) setAttemps(attemps - 1)
                    else setModal(
                        <ZeroAttempsModal
                            againVoid={() => {
                                getUserData().then(data => {
                                    setWinMoney(data.money)
                                })
                            }}
                            gameType={"memory"}
                            setModal={setModal}
                            toBack={toBack}
                        />
                    )

                }, 500)
            }

            if (data.win) {
                setWinMoney(data.money)
                setWinExperience(data.expReceived)
                setWinTime(data.timeLeft)
                setModal(
                    <LevelPassed
                        againVoid={() => {
                            handleCreateRound(selectedLevel)
                            getUserData().then(data => {
                                setWinMoney(data.money)
                            })
                        }}
                        setModal={setModal}
                        toBack={toBack}
                        data={{
                            winExperience: data.expReceived,
                            winMoney: data.money,
                            winTime: formatTime(data.timeLeft)
                        }}
                    />
                )
            }

            return data
        } catch (error) {
            console.error("Error validating card:", error)
        }
    }

    const getHint = async () => {
        try {
            const response = await axios.get("/games/memory/hint")

            return response.data
        } catch (error) {
            console.error("Error fetching hint:", error)
            return null
        }
    }

    const getCardCoordinates = (rows, columns) => {
        const coordinates = []

        for (let y = 0; y < rows; y++) {
            for (let x = 0; x < columns; x++) {
                coordinates.push({ x, y })
            }
        }

        return coordinates
    }

    return {
        getHint,
        createGrid,
        getGridSize,
        handleValidate,
        handleCreateRound,
        getCardCoordinates
    }
}