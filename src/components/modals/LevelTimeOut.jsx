import { Button } from "../Button"

export const LevelTimeOut = ({ setModal, againVoid, setSelectedLevel }) => {
    const exit = () => {
        setSelectedLevel(undefined)
        setInterval(() => setModal(null), 50)
    }

    return <div className="fixed inset-0 flex items-center justify-center bg-black/50 bg-opacity-50 z-50 w-full">
        <div className="bg-white rounded-lg space-y-6 p-6 w-11/12">
            <h1 className="text-[#FF4800] text-3xl text-center font-semibold">Время вышло</h1>
            <p className="text-gray-600 text-center font-semibold">К сожалению, ты не успел отгадать слово, попробуй ещё раз.</p>

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
                <Button onClick={exit}>Выйти</Button>
            </div>
        </div>
    </div>
}
