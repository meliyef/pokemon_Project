
import React, { useState } from 'react';
import { Card, CardBody, CardTitle, CardText, Button, CardImg } from 'reactstrap';

function PokemonCard({ card, handleAddToSquad }) {
   const[add,setAdd] = useState("add")
   
  return (
    <div>
      <Card>
        <CardImg top width="100%" src={card.image} alt={card.name} />
        <CardBody>
          <CardTitle tag="h5">{card.name}</CardTitle>
          <CardText>
            This is a Pokémon card named {card.name}. Click the button to view more details.
          </CardText>
          <Button color="primary" href={`https://pokeapi.co/api/v2/pokemon/${card.name}`} target="_blank">
            View Details
          </Button>
          <Button id="add_Button" onClick={() => handleAddToSquad(card)}>
            Add
          </Button>
        </CardBody>
      </Card>
    </div>
  );
}

export default PokemonCard;
