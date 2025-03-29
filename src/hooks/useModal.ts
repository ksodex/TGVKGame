import { DefaultValue, selector } from "recoil"
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

export const useModal = selector<React.ReactNode>({
    key: "modalSelector",

    get: ({ get }) => get(mainState).modal,
    set: ({ set, get }, newValue) => {
        if (newValue instanceof DefaultValue) return
        
        set(mainState, (prev) => ({
            ...prev,
            modal: newValue
        }))
    }
})
