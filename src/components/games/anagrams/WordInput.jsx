export const WordInput = ({
    attachedSymbols,
    selectedPosition,
    handlePositionSelect,
    selectedLevel
}) => {
    return <div className="flex items-center justify-center border-2 border-[#430B51] rounded-md space-x-2 p-2 min-h-16 w-5/6">
        {attachedSymbols.map((attached, index) => (
            <div
                key={index}
                onClick={() => !attached.isLocked && handlePositionSelect(index)}
                className={`${attached.isLocked ? 'cursor-not-allowed' : 'cursor-pointer'}`}
            >
                <span
                    className={`${selectedPosition === index ? "text-[#430B51]" : ""} ${selectedLevel <= 6 ? "text-3xl" : "text-xl"
                        } font-bold ${attached.isLocked ? "text-[#FF4800]" : ""}`}
                >
                    {attached.symbol || "_"}
                </span>
            </div>
        ))}
    </div>
}
