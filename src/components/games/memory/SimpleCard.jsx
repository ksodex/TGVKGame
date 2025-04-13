import { useEffect, useState } from "react"

export const SimpleCard = ({
    value,
    isOpen,
    handleFlip,
    isCorrect
}) => {
    const [flippedCard, setFlippedCard] = useState(false)
    const [isDisabled, setIsDisabled] = useState(false)

    useEffect(() => {
        setFlippedCard(isOpen)
    }, [isOpen])

    useEffect(() => {
        setIsDisabled(isCorrect)
    }, [isCorrect])

    return <button
        onClick={() => !isDisabled && handleFlip()}
        disabled={isDisabled}
        className="aspect-square p-1"
        style={{ perspective: "1000px" }}
    >
        <div
            className={`relative w-full h-full transform transition-transform duration-500 ${flippedCard ? "-rotate-y-180" : ""}`}
            style={{ transformStyle: "preserve-3d" }}
        >
            <div
                className="absolute rounded-md border-2 border-[#430B51] overflow-hidden w-full h-full flex justify-center items-center text-black backface-hidden"
            >
                <svg width="41" height="72" viewBox="0 0 41 72" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21.3 0.399997C25.3 0.399997 28.7333 1.13333 31.6 2.6C34.5333 4 36.7333 5.9 38.2 8.3C39.6667 10.7 40.4 13.2667 40.4 16C40.4 18.6 39.9333 20.8333 39 22.7C38.1333 24.5 37.0667 25.9667 35.8 27.1C34.5333 28.2333 32.8333 29.5667 30.7 31.1C27.9 33.0333 25.8 34.8333 24.4 36.5C23 38.1 22.3 40.2667 22.3 43V47.5H13.2V42.5C13.2 39.6333 13.6667 37.2 14.6 35.2C15.6 33.2 16.7667 31.6 18.1 30.4C19.4333 29.2 21.2 27.8333 23.4 26.3C25.9333 24.6333 27.8 23.1333 29 21.8C30.2 20.4667 30.8 18.7333 30.8 16.6C30.8 13.8667 29.9 11.7667 28.1 10.3C26.3 8.76666 23.8333 8 20.7 8C15.3667 8 10.7333 10.4 6.8 15.2L0.5 10.3C6.1 3.7 13.0333 0.399997 21.3 0.399997ZM18 57.8C20 57.8 21.6667 58.4667 23 59.8C24.3333 61.1333 25 62.7667 25 64.7C25 66.6333 24.3333 68.3 23 69.7C21.6667 71.0333 20 71.7 18 71.7C16.0667 71.7 14.4333 71.0333 13.1 69.7C11.7667 68.3 11.1 66.6333 11.1 64.7C11.1 62.7667 11.7667 61.1333 13.1 59.8C14.4333 58.4667 16.0667 57.8 18 57.8Z" fill="black" />
                </svg>
            </div>

            <div
                className="absolute rounded-md border-2 border-[#430B51] overflow-hidden w-full h-full flex justify-center items-center text-black backface-hidden"
                style={{ transform: "rotateY(180deg)" }}
            >
                <h1 className="text-3xl font-bold">{value}</h1>
            </div>
        </div>
    </button>
}
