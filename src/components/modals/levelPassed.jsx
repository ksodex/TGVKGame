import confetti from "canvas-confetti"

import { Button } from "../Button"
import { TimeCard, CoinCard, ExperienceCard } from "../cards"

export const LevelPassed = ({ setModal, againVoid, toBack, data }) => {
    confetti({
        shapes: [confetti.shapeFromPath({ path: "M0 10 L5 0 L10 10z" })],
        particleCount: 400
    })

    return <div className="fixed inset-0 flex items-center justify-center bg-black/50 bg-opacity-50 z-50 w-full">
        <div className="bg-white rounded-lg space-y-6 p-6">
            <h1 className="text-green-600 text-3xl text-center font-semibold">Уровень пройден</h1>
            <p className="text-center font-semibold">Молодец, продолжай в том же духе!</p>

            <div className="flex justify-center space-x-1">
                <ExperienceCard winExperience={data.winExperience} />
                <TimeCard winTime={data.winTime} />
                <CoinCard winMoney={data.winMoney} />
            </div>

            <div className="flex gap-4">
                <Button
                    isFulled
                    onClick={() => {
                        againVoid()
                        setModal(null)
                    }}
                >
                    Играть уровень еще раз
                </Button>
                <Button onClick={() => {
                    setModal(null)
                    toBack(-1)
                }}>Выйти</Button>
            </div>
        </div>
    </div>
}