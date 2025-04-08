import { useEffect } from "react"

interface IUseGameChecker {
    dependencies: {
        attachedSymbols: Array<any>
    }
}

export const useGameChecker = () => {
    useEffect(() => {

    }, [])
}

// useEffect(() => {
//     if (!attachedSymbols.some(attached => attached.symbol === null) && attachedSymbols.length > 0) {
//         const word = attachedSymbols.map(attached => attached.symbol).join("")

//         handleValidateWord("animals", difficult, wordIndex, word).then(data => {
//             console.log("data in fetch", data)
//             if (data.isCorrect) {
//                 setModal(
//                     <LevelPassed
//                         againVoid={() => { handleCreateRound(selectedLevel) }}
//                         setModal={setModal}
//                         toBack={toBack}
//                         data={{
//                             winExperience: "0",
//                             winMoney: winMoney,
//                             winTime: "0"
//                         }}
//                     />
//                 )
//             }
//         })
//     }
// }, [attachedSymbols])