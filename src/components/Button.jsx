export const Button = ({ children, className, onClick, isFulled, isBold = true, bgcolor = "#FF4800" }) => {
    const defaultStyles = `flex justify-center ${isBold && "font-semibold"} items-center gap-2 bg-[#FF4800] text-white rounded-md ${isFulled && "w-full"} px-3 py-1.5`

    return <button
        className={(className ? className : defaultStyles)}
        onClick={onClick}
    >
        {children}
    </button>
}
