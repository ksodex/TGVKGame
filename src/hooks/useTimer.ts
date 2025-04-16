import { useEffect, useRef } from "react"

interface IUseTimer {
    dependencies: {
        selectedLevel: number
        aviableTime: number
        modal: any
    }
    timerData: {
        aviableTime: number
        setAviableTime: React.Dispatch<React.SetStateAction<number>>
    }
}

export const useTimer = ({ dependencies, timerData }: IUseTimer) => {
    const { selectedLevel, modal } = dependencies
    const { aviableTime, setAviableTime } = timerData
    const timerRef = useRef<NodeJS.Timeout | null>(null)

    useEffect(() => {
        if (
            !selectedLevel ||
            aviableTime <= 0 ||
            (modal && modal.type.name === "LevelPassed")
        ) {
            if (timerRef.current) {
                clearInterval(timerRef.current)
                timerRef.current = null
            }

            return
        }

        if (!timerRef.current) {
            timerRef.current = setInterval(() => {
                setAviableTime((prevCount) => (prevCount > 0 ? prevCount - 1 : 0))
            }, 1000)
        }

        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current)
                timerRef.current = null
            }
        }
    }, [selectedLevel, aviableTime, modal])
}
