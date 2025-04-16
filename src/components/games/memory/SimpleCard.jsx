import { useEffect, useState } from "react"

export const SimpleCard = ({
    value,
    isOpen,
    handleFlip,
    isCorrect,
    isLocked // Add isLocked prop
}) => {
    const [flippedCard, setFlippedCard] = useState(false)
    const [isDisabled, setIsDisabled] = useState(false)

    useEffect(() => {
        setFlippedCard(isOpen)
    }, [isOpen])

    useEffect(() => {
        setIsDisabled(isCorrect || isLocked) // Disable card if correct or locked
    }, [isCorrect, isLocked])

    return <button
        onClick={() => !isDisabled && handleFlip()}
        disabled={isDisabled}
        className="aspect-square"
        style={{ perspective: "1000px" }}
    >
        <div
            className={`relative w-full h-full transform transition-transform duration-500 ${flippedCard ? "-rotate-y-180" : ""}`}
            style={{ transformStyle: "preserve-3d" }}
        >
            <div
                className="absolute rounded-md border-2 border-[#430B51] overflow-hidden w-full h-full flex justify-center items-center text-black backface-hidden"
            >
                <span className="font-bold text-6xl">?</span>
            </div>

            <div
                className="absolute rounded-md border-2 border-[#430B51] overflow-hidden w-full h-full flex justify-center items-center text-black backface-hidden"
                style={{ transform: "rotateY(180deg)" }}
            >
                <h1 className="text-6xl font-bold">{value}</h1>
            </div>
        </div>
    </button>
}
