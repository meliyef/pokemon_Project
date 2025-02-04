// src/Squad.js

import React from 'react';
import { Button } from 'reactstrap';  // Assuming you're using Reactstrap for buttons
import { useSquad } from './SquadContext';  // Import the useSquad hook to access context

function Squad() {
  const { selectedPokemons, handleRemoveFromSquad } = useSquad(); // Access squad context

  return (
    <div>
      <h3>My Squad</h3>
      {selectedPokemons.length === 0 ? (
        <p>No Pokémon selected yet!</p>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {selectedPokemons.map((pokemon, index) => (
            <div
              key={index}
              style={{
                margin: '10px',
                border: '1px solid #ddd',
                padding: '10px',
                borderRadius: '8px',
                textAlign: 'center', // Center align the contents
                width: '120px',
              }}
            >
              <img
                src={pokemon.image}
                alt={pokemon.name}
                style={{
                  width: '80px',
                  height: '80px',
                  marginBottom: '10px', // Add some space between image and name
                }}
              />
              <h5>{pokemon.name}</h5>
              <p>Level: {pokemon.level || 'N/A'}</p>
              <Button
                color="danger"
                size="sm"
                onClick={() => handleRemoveFromSquad(pokemon)}
                style={{ marginTop: '10px' }}
              >
                Remove
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Squad;
