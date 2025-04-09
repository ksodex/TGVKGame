export const useSymbolInteraction = ({
    attachedSymbols,
    setAttachedSymbols,
    selectedPosition,
    setSelectedPosition,
}) => {
    const handlePositionSelect = (index) => setSelectedPosition(index);

    const handleSymbolClick = (symbolObj) => {
        const isSymbolUsed = attachedSymbols.some(
            (attached) => attached && attached.id === symbolObj.id
        );
        if (isSymbolUsed) return;

        let positionToFill = selectedPosition;
        if (positionToFill === null) {
            positionToFill = attachedSymbols.findIndex(
                (attached) => attached.symbol === null
            );
            if (positionToFill === -1) return;
        }

        const newAttachedSymbols = [...attachedSymbols];
        newAttachedSymbols[positionToFill] = {
            id: symbolObj.id,
            symbol: symbolObj.symbol,
        };
        setAttachedSymbols(newAttachedSymbols);
        setSelectedPosition(null);
    };

    const handleRemoveLastSymbol = () => {
        const lastFilledIndex = attachedSymbols.reduce(
            (lastIdx, attached, currentIdx) => {
                return attached.symbol !== null && !attached.isLocked ? currentIdx : lastIdx;
            },
            -1
        );

        if (lastFilledIndex >= 0) {
            const newAttachedSymbols = [...attachedSymbols];
            newAttachedSymbols[lastFilledIndex] = { id: null, symbol: null };
            setAttachedSymbols(newAttachedSymbols);
        }
    };

    return { handlePositionSelect, handleSymbolClick, handleRemoveLastSymbol };
};