import axios from "axios"
import { useRecoilState } from "recoil"
import { useModal } from "../useModal"
import { ZeroAttempsModal } from "../../components/modals/ZeroAttempsModal"
import { LevelPassed } from "../../components/modals/LevelPassed"
import { formatTime } from "../../utils/formatTime"

export const useGameLogic = ({
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
    winExperience,
    winMoney,
    winTime,
    toBack,
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
                setAviableSymbols(
                    data.gameData.symbols.map((symbol, idx) => ({
                        id: `${data.gameData.wordNumber}-${idx}`,
                        symbol
                    }))
                )
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

            if (!response.data || typeof response.data.char !== 'string' || typeof response.data.index !== 'number') {
                console.error("Invalid hint response format:", response.data)
                return null
            }

            const { char, index } = response.data

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
                id: `hint-${index}`,
                symbol: char,
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
