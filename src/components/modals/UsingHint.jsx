// import { useGameLogicAnnagrams as useGameLogic } from "../../hooks/state/useGameLogic"
import { useUser } from "../../hooks/useUser"
import { Button } from "../Button"

export const UsingHint = ({ setModal, getHint }) => {
    const { setHints, hints } = useUser({ dependencies: [] })

    const handleUseHint = async () => {
        try {
            const hintData = await getHint()

            if (hintData) {
                await new Promise(resolve => {
                    setHints(prev => {
                        resolve()
                        setHints(hints - 1)
                        return prev - 1
                    })
                })
                
                setTimeout(() => setModal(null), 200)
            }
        } catch (error) {
            console.error("Error using hint:", error)
        }
    }

    return <div className="fixed inset-0 flex items-center justify-center bg-black/50 bg-opacity-50 z-50 w-full">
        <div className="bg-white rounded-lg space-y-6 p-6 w-11/12">
            <h1 className="text-[#FF4800] text-3xl text-center font-semibold">Использовать подсказку</h1>
            <p className="text-gray-600 text-center font-semibold">Вы действительно хотите использовать подсказку?</p>

            <div className="flex gap-4">
                <Button isFulled onClick={handleUseHint}>Подтвердить</Button>
                <Button onClick={() => setModal(null)}>Отмена</Button>
            </div>
        </div>
    </div>
}
