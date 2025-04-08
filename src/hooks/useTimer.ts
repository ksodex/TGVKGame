import { useEffect } from "react"

interface IUseTimer {
    dependencies: {
        selectedLevel: number
        aviableTime: number
    }
    timerData: {
        aviableTime: number
        setAviableTime: React.Dispatch<React.SetStateAction<number>>
    }
}

export const useTimer = ({ dependencies, timerData }: IUseTimer) => {
    useEffect(() => {
        if (
            !timerData.aviableTime ||
            !dependencies.selectedLevel ||
            timerData.aviableTime <= 0
        ) return

        const timer = setInterval(() => {
            timerData.setAviableTime(prevCount => {
                if (prevCount > 0) return prevCount - 1
                return 0
            })
        }, 1000)

        return () => clearInterval(timer)
    }, [dependencies])
}
