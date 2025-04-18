import axios from "axios"

import { Button } from "../Button"

export const ZeroAttempsModal = ({ againVoid, setModal, setSelectedLevel, gameType }) => {
    const fetchData = async () => {
        const response = await axios.post(`/games/${gameType}/buyAttempt`)
        const data = await response.data

        return data
    }

    const exit = () => {
        setSelectedLevel(undefined)
        setTimeout(() => setModal(null), 50)
    }

    const handleBuy = async () => {
        await fetchData()
        againVoid()
        setModal(null)
    }

    return <div className="fixed inset-0 flex items-center justify-center bg-black/50 bg-opacity-50 z-50 w-full">
        <div className="bg-white rounded-lg space-y-6 p-6">
            <h1 className="text-2xl text-center font-bold">Закончились попытки </h1>

            <p className="text-[#6D7885] text-center font-semibold">Купи 2 попытки за 10 монет</p>

            <div className="flex gap-3">
                <Button isFulled onClick={handleBuy}>Купить 2 попытки за 10</Button>
                <Button onClick={exit} bgcolor="#430B51">Выйти</Button>
            </div>
        </div>
    </div>
}
