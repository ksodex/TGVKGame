export const Button = ({ children, className, onClick, isFulled }) => {
    const defaultStyles = `flex justify-center items-center gap-2 bg-[#FF4800] text-white rounded-md ${isFulled && "w-full"} px-2 py-1`

    return <button
        className={(className ? className : defaultStyles)}
        onClick={onClick}
    >
        {children}
    </button>
}
