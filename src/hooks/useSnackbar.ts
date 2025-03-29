import { useRecoilState } from "recoil"
import { atom } from "recoil"
import React from "react"

export interface IMainState {
    modal?: React.ReactNode
    snackbar?: React.ReactNode
}

export const mainState = atom<IMainState>({
    key: "mainState",
    default: {}
})

export function useSnackbar() {
    const [state, setState] = useRecoilState(mainState)

    function setSnackbar(child: any) {
        setState((prev) => ({
            ...prev,
            snackbar: child
        }))
    }

    return [state.snackbar, setSnackbar]
}
