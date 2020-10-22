import React, { createContext, useState } from "react";

export const DataContext = createContext({});

export const DataContextProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  //const [choice1, setChoice1] = useState('Title');
  //const [choice2, setChoice2] = useState('Year');
const choice1 = 'Title'
const choice2 = 'Year'
  const updateMovies = (data) => {
    return setMovies(data);
  };
  const resetMovies = () => {
    return setMovies([]);
  };

  return (
    <DataContext.Provider
      value={{ movies, updateMovies, resetMovies, choice1, choice2 }}
    >
      {children}
    </DataContext.Provider>
  );
};
