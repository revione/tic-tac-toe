import React from 'react'

export const AppContext = React.createContext()

const initState = {}

let state = {}

export const AppProvider = ({ children }) => <AppContext value={state}></AppContext>
