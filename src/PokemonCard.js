// src/PokemonCard.js

import React from 'react';
import { Button } from 'reactstrap';
import { useSquad } from './SquadContext'; // Use context hook

const PokemonCard = ({ card }) => {
  const { handleAddToSquad } = useSquad(); // Access add-to-squad function from context

  return (
    <div className="pokemon-card">
      <img src={card.image} alt={card.name} />
      <h4>{card.name}</h4>
      <p>Level: {card.level}</p>
      <Button onClick={() => handleAddToSquad(card)} color="primary">
        Add to Squad
      </Button>
    </div>
  );
};

export default PokemonCard;
