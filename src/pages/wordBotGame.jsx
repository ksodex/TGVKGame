import axios from "axios"

import { useRouterBack } from "@kokateam/router-vkminiapps"
import { PanelHeader } from "@vkontakte/vkui"
import { useState, useEffect } from "react"
import { useRecoilState } from "recoil"

import { LevelTimeOut } from "../components/modals/levelTimeout"
import { LevelPassed } from "../components/modals/levelPassed"
import { LevelDifficult } from "../components/levelDifficult"
import { ZeroBalanceModal } from "../components/modals/zeroAttempsModal"
import { GameHeader } from "../components/gameHeader"
import { formatTime } from "../utils/formatTime"


import { useModal } from "../hooks/useModal"
import { useTimer } from "../hooks/useTimer"
import { useUser } from "../hooks/useUser"

const levels = [
    { code: 4, levelName: "Детский", description: "Слова из 4-5 букв" },
    { code: 6, levelName: "Простой", description: "Слова из 6-7 букв" },
    { code: 8, levelName: "Средний", description: "Слова из 8-9 букв" },
    { code: 10, levelName: "Сложный", description: "Слова из 10+ букв" }
]

// {
//     "message": "Word is correct",
//     "data": {
//         "isCorrect": true,
//         "correctWord": "тигр",
//         "userWord": "тигр",
//         "attemptsLeft": 2,
//         "money": 100
//     }
// }

// {
//     "message": "Word is incorrect",
//     "data": {
//         "isCorrect": false,
//         "userWord": "триг",
//         "attemptsLeft": 2,
//         "remainingTime": 26,
//         "money": 100
//     }
// }

export const WordBotGame = () => {
    const [modal, setModal] = useRecoilState(useModal)

    const [selectedLevel, setSelectedLevel] = useState(undefined)
    const [attachedSymbols, setAttachedSymbols] = useState([])
    const [selectedPosition, setSelectedPosition] = useState(null)

    const [aviableSymbols, setAviableSymbols] = useState(undefined)
    const [aviableTime, setAviableTime] = useState(undefined)
    const [wordLength, setWordLength] = useState(undefined)
    const [wordIndex, setWordIndex] = useState(undefined)
    const [difficult, setDifficult] = useState(undefined)
    const [attemps, setAttemps] = useState(undefined)

    const [winExperience, setWinExperience] = useState(undefined)
    const [winMoney, setWinMoney] = useState(undefined)
    const [winTime, setWinTime] = useState(undefined)

    // const [gameData, setGameData] = useState({
    //     aviableSymbols: undefined,
    //     aviableTime: undefined,
    //     wordLength: undefined,
    //     wordIndex: undefined,
    //     difficult: undefined
    // })

    // const [winData, setWinData] = useState({
    //     winExperience: undefined,
    //     winMoney: undefined,
    //     winTime: undefined
    // })

    const toBack = useRouterBack()


    const { money } = useUser({ dependencies: [] })
    useTimer({
        dependencies: { aviableTime, selectedLevel },
        timerData: { aviableTime, setAviableTime }
    })

    const handleCreateRound = async (code) => {
        try {
            const response = await axios.post(
                "/games/annagrams/create",
                { type: "animals", difficult: code }
            )

            const { data } = await response.data

            if (code) {
                setAviableTime(data.availableTime)
                setAviableSymbols(data.gameData.symbols.map((symbol, idx) => ({
                    id: `${data.gameData.wordNumber}-${idx}`,
                    symbol
                })))

                setWordLength(data.gameData.wordLength)
                setWordIndex(data.gameData.wordNumber)
                setDifficult(data.difficult)
                setAttemps(data.attemptsLeft)
                setSelectedLevel(code)

                setAttachedSymbols(Array(data.gameData.wordLength).fill(null).map(() => ({ id: null, symbol: null })))
            }
        } catch (error) {
            console.error("Error fetching data:", error)
        }
    }

    const handleValidateWord = async (type, difficult, wordIndex, result) => {
        try {
            const response = await axios.post(
                "/games/annagrams/validate",
                {
                    type: type,
                    difficult: difficult,
                    wordIndex: wordIndex,
                    userWord: result
                }
            )

            const { data } = await response.data

            if (data.isCorrect) {
                setWinMoney(data.money)
                setWinExperience(data.expReceived)
                setWinTime(data.remainingTime)

                console.log(data.money)
                console.log(data.expReceived)
                console.log(data.remainingTime)
            } else {
                const attachedData = Array(attachedSymbols.length).fill({
                    id: null, symbol: null
                })

                setAttachedSymbols(attachedData)

                if (attemps - 1 !== 0) setAttemps(attemps - 1)
                else setModal(<ZeroBalanceModal
                    setModal={setModal}
                    toBack={toBack}
                />)
            }

            return data
        } catch (error) {
            console.error("Error fetching data:", error)
        }
    }

    const handlePositionSelect = (index) => setSelectedPosition(index)

    const handleSymbolClick = (symbolObj) => {
        const isSymbolUsed = attachedSymbols.some(attached => attached && attached.id === symbolObj.id)
        if (isSymbolUsed) return

        let positionToFill = selectedPosition

        if (positionToFill === null) {
            positionToFill = attachedSymbols.findIndex(attached => attached.symbol === null)
            if (positionToFill === -1) return
        }

        const newAttachedSymbols = [...attachedSymbols]
        newAttachedSymbols[positionToFill] = { id: symbolObj.id, symbol: symbolObj.symbol }

        setAttachedSymbols(newAttachedSymbols)
        setSelectedPosition(null)
    }

    const handleRemoveLastSymbol = () => {
        const lastFilledIndex = attachedSymbols.reduce((lastIdx, attached, currentIdx) => {
            return attached.symbol !== null ? currentIdx : lastIdx
        }, -1)

        if (lastFilledIndex >= 0) {
            const newAttachedSymbols = [...attachedSymbols]
            newAttachedSymbols[lastFilledIndex] = { id: null, symbol: null }

            setAttachedSymbols(newAttachedSymbols)
        }
    }

    useEffect(() => {
        if (aviableTime === 0 && !modal) {
            setModal(
                <LevelTimeOut
                    setModal={setModal}
                    againVoid={() => {
                        handleCreateRound(selectedLevel)
                        setModal(null)
                    }}
                />
            )
        }
    }, [aviableTime, modal, selectedLevel])

    useEffect(() => {
        if (!attachedSymbols.some(attached => attached.symbol === null) && attachedSymbols.length > 0) {
            const word = attachedSymbols.map(attached => attached.symbol).join("")

            handleValidateWord("animals", difficult, wordIndex, word).then(data => {
                console.log("data in fetch", data)
                if (data.isCorrect) {
                    setModal(
                        <LevelPassed
                            againVoid={() => { handleCreateRound(selectedLevel) }}
                            setModal={setModal}
                            toBack={toBack}
                            data={{
                                winExperience: winExperience,
                                winMoney: winMoney,
                                winTime: winTime
                            }}
                        />
                    )
                }
            })
        }
    }, [attachedSymbols])

    return <main className="bg-[#f1f3f5] min-h-screen space-y-4">
        <PanelHeader
            before={
                <button className="ml-5" onClick={() => { toBack(-1) }}>
                    <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.29289 0.292893C7.68342 -0.0976311 8.31658 -0.0976311 8.70711 0.292893C9.09763 0.683418 9.09763 1.31658 8.70711 1.70711L3.414 7H17C17.5128 7 17.9355 7.38604 17.9933 7.88338L18 8C18 8.55228 17.5523 9 17 9H3.414L8.70711 14.2929C9.06759 14.6534 9.09532 15.2206 8.7903 15.6129L8.70711 15.7071C8.31658 16.0976 7.68342 16.0976 7.29289 15.7071L0.292893 8.70711L0.219689 8.62545C0.217372 8.62256 0.215071 8.61966 0.212786 8.61675C0.207285 8.60984 0.201753 8.6026 0.196334 8.59531C0.17849 8.57113 0.161719 8.54628 0.146068 8.52066C0.138607 8.50861 0.131499 8.49639 0.124671 8.48406C0.113794 8.46429 0.103377 8.44389 0.0936537 8.4231C0.0856789 8.4061 0.0781966 8.3888 0.0712256 8.37134C0.0633159 8.35158 0.0561225 8.3318 0.0495467 8.31174C0.0447288 8.29685 0.0400979 8.28146 0.0358453 8.26599C0.0298338 8.24444 0.0246396 8.22275 0.020165 8.20079C0.016702 8.18338 0.0136281 8.16595 0.0110178 8.14847C0.00376119 8.10036 0 8.05062 0 8L0.00396633 8.08925C0.0018949 8.066 0.000634706 8.04268 0.000185966 8.01935L0 8C0 7.99359 6.03044e-05 7.9872 0.000180244 7.98082C0.000599384 7.95798 0.00186552 7.93433 0.00396633 7.91075C0.00576604 7.89015 0.00811212 7.8705 0.0110192 7.85104C0.013628 7.83405 0.0167024 7.81663 0.0202403 7.79927C0.02464 7.77725 0.0298335 7.75556 0.0357208 7.73416C0.0400976 7.71854 0.0447286 7.70315 0.0497379 7.68786C0.0561223 7.6682 0.0633158 7.64842 0.071104 7.62894C0.0781965 7.61121 0.0856789 7.5939 0.0936732 7.57678C0.103377 7.55611 0.113794 7.53571 0.124876 7.51572C0.131499 7.50361 0.138607 7.49139 0.145996 7.47929C0.161719 7.45373 0.17849 7.42887 0.196313 7.40484C0.225313 7.36567 0.257499 7.32829 0.292893 7.29289L0.212786 7.38325C0.237669 7.35153 0.264427 7.32136 0.292893 7.29289L7.29289 0.292893Z" fill="#FF4800" />
                    </svg>
                </button>
            }
            separator={true}
        >
            <span className="flex justify-center text-md text-[#FF4800]">Анаграммы</span>
        </PanelHeader>

        {!selectedLevel ? (
            <LevelDifficult
                levels={levels}
                handleInitializeRound={handleCreateRound}
            />
        ) : (
            <section className="space-y-4 text-[#430B51] p-2 m-2">
                <GameHeader
                    data={{
                        money: money,
                        attemps: attemps,
                        time: formatTime(aviableTime)
                    }}
                />

                <div className="flex gap-3">
                    <div className="flex items-center justify-center border-2 border-[#430B51] rounded-md space-x-2 p-2 min-h-16 w-5/6">
                        {attachedSymbols.map((attached, index) => (
                            <div
                                key={index}
                                onClick={() => handlePositionSelect(index)}
                            >
                                <span
                                    className={`${selectedPosition === index ? "text-[#430B51]" : ""} ${selectedLevel <= 6 ? "text-3xl" : "text-xl"} font-bold`}
                                >
                                    {attached.symbol || "_"}
                                </span>
                            </div>
                        ))}
                    </div>

                    <button
                        onClick={handleRemoveLastSymbol}
                        className="flex items-center justify-center border-2 border-[#430B51] rounded-md p-2 text-white w-1/6 font-bold"
                    >
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11 10L15 14M11 14L15 10M2.7716 13.5185L7.43827 17.5185C7.80075 17.8292 8.26243 18 8.73985 18H18C19.1046 18 20 17.1046 20 16V8C20 6.89543 19.1046 6 18 6H8.73985C8.26243 6 7.80075 6.17078 7.43827 6.48149L2.7716 10.4815C1.84038 11.2797 1.84038 12.7203 2.7716 13.5185Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>

                <div className="grid grid-cols-4 gap-4">
                    {aviableSymbols.map((symbolObj) => (
                        <button
                            key={symbolObj.id}
                            onClick={() => handleSymbolClick(symbolObj)}
                            className={`flex items-center justify-center border-2 rounded-md aspect-square transition-colors p-1 ${attachedSymbols.some(attached => attached.id === symbolObj.id) ? "border-[#430B5150]" : "border-[#430B51]"}`}
                            disabled={attachedSymbols.some(attached => attached.id === symbolObj.id)}
                        >
                            <span className={`${attachedSymbols.some(attached => attached.id === symbolObj.id) ? "text-[#430B5150]" : "text-[#430B51]"} transition-colors text-4xl font-bold`}>
                                {symbolObj.symbol}
                            </span>
                        </button>
                    ))}
                </div>
            </section>
        )}
    </main>
}

export default WordBotGame