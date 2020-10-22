import React, { createContext, useState } from "react"

export const CountContext = createContext({})

export const CountContextProvider = ({ children }) => {
  const [count, setCount] = useState(1)
  const [score, setScore] = useState(0)

  const updateCount = count => {
    setCount(count + 1)
  }
  const resetCount = () => {
    setCount(1)
  }
  const updateScore = (score) => {
      setScore(score+1)
  }
  const resetScore = () => {
    setScore(0)
  }

  return (
    <CountContext.Provider value={{ count, updateCount, resetCount, score, updateScore, resetScore }}>
      {children}
    </CountContext.Provider>
  )
}

