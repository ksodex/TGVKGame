import { Button } from "../Button"
import { TimeCard, CoinCard, ExperienceCard } from "../../components/cards"

export const LevelPassed = ({ setModal, againVoid }) => {
    return <div className="fixed inset-0 flex items-center justify-center bg-black/50 bg-opacity-50 z-50 w-full">
        <div className="bg-white rounded-lg space-y-6 p-6">
            <h1 className="text-green-600 text-3xl text-center font-semibold">Уровень пройден</h1>
            <p className="text-center font-semibold">Молодец, продолжай в том же духе!</p>

            <div className="flex justify-center space-x-1">
                <TimeCard />
                <CoinCard />
                <ExperienceCard />
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
                <Button onClick={() => setModal(null)}>Выйти</Button>
            </div>
        </div>
    </div>
}