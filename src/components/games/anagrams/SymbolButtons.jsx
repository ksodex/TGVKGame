export const SymbolButtons = ({ aviableSymbols, attachedSymbols, handleSymbolClick }) => (
    <div className="grid grid-cols-4 gap-4">
        {aviableSymbols.map((symbolObj) => (
            <button
                key={symbolObj.id}
                onClick={() => handleSymbolClick(symbolObj)}
                className={`flex items-center justify-center border-2 rounded-md aspect-square transition-colors p-1
                    ${attachedSymbols.some(attached => symbolObj.symbol === attached.symbol && attached.isLocked) ?
                        "bg-[#FF4800]" :
                        attachedSymbols.some((attached) => attached.id === symbolObj.id) ?
                            "border-[#430B5150]" :
                            "border-[#430B51]"
                    }`
                }
                disabled={attachedSymbols.some(
                    (attached) => attached.id === symbolObj.id
                )}
            >
                <span
                    className={`
                        ${attachedSymbols.some(attached => symbolObj.symbol === attached.symbol && attached.isLocked) ? "text-white" :
                            attachedSymbols.some((attached) => attached.id === symbolObj.id) ?
                                "text-[#430B5150]" :
                                "text-[#430B51]"
                        } transition-colors text-4xl font-bold`}
                >
                    {symbolObj.symbol}
                </span>
            </button>
        ))}
    </div>
)
