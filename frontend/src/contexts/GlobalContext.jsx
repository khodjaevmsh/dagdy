import React, { createContext } from 'react'
import { usePersistState } from '../hooks/state'

export const GlobalContext = createContext()

export function GlobalProvider({ children }) {
    const [lang, setLang] = usePersistState('language', 'ru')

    return (
        <GlobalContext.Provider value={{ lang, setLang }}>
            {children}
        </GlobalContext.Provider>
    )
}
