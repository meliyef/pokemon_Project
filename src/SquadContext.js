// src/SquadContext.js

import React, { createContext, useState, useContext } from 'react';

// Create a context for the squad
const SquadContext = createContext();

// Create a provider to wrap around your app
export const SquadProvider = ({ children }) => {
  const [selectedPokemons, setSelectedPokemons] = useState([]);

  const handleAddToSquad = (pokemon) => {
    if (selectedPokemons.length < 6) {
      if (!selectedPokemons.some(p => p.name === pokemon.name)) {
        setSelectedPokemons([...selectedPokemons, pokemon]);
      } else {
        alert(`${pokemon.name} is already in your squad!`);
      }
    } else {
      alert('You can only add up to 6 Pokémon!');
    }
  };

  const handleRemoveFromSquad = (pokemon) => {
    setSelectedPokemons(selectedPokemons.filter(p => p.name !== pokemon.name));
  };

  return (
    <SquadContext.Provider value={{ selectedPokemons, handleAddToSquad, handleRemoveFromSquad }}>
      {children}
    </SquadContext.Provider>
  );
};

// Custom hook to access squad context
export const useSquad = () => {
  return useContext(SquadContext);
};
