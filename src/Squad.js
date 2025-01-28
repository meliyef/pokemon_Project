import React from "react";

function Squad({ selectedPokemons, handleRemoveFromSquad }) {
    return (
      <div>
        <h3>My Squad</h3>
        {selectedPokemons.length === 0 ? (
          <p>No Pokémon selected yet!</p>
        ) : (
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {selectedPokemons.map((pokemon, index) => (
              <div key={index} style={{ margin: '10px', border: '1px solid #ddd', padding: '10px', borderRadius: '8px' }}>
                <img src={pokemon.image} alt={pokemon.name} style={{ width: '80px', height: '80px' }} />
                <h5>{pokemon.name}</h5>
                <p>Level: {pokemon.level || 'N/A'}</p>
                <button onClick={() => handleRemoveFromSquad(pokemon)}>Remove</button>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
  
  export default Squad;

