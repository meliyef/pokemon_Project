// src/App.js

import React, { useEffect, useState } from 'react';
import { Row, Col, Container,Button } from 'reactstrap';
import PokemonCard from './PokemonCard'; // Import the PokemonCard component
import Squad from './Squad'; // Import the Squad component
import './App.css';

function App() {
  const [cards, setCards] = useState([]); // State to store card data
  const [loading, setLoading] = useState(true); // State to handle loading state
  const [selectedPokemons, setSelectedPokemons] = useState([]); // State for selected Pokémon

  useEffect(() => {
    // Function to fetch Pokémon data including images
    const fetchCards = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151'); // Fetching first 151 Pokémon
        const data = await response.json();

        // Fetch detailed information for each Pokémon
        const pokemonData = await Promise.all(
          data.results.map(async (pokemon) => {
            const pokemonDetailResponse = await fetch(pokemon.url);
            const pokemonDetail = await pokemonDetailResponse.json();
            return {
              name: pokemon.name,
              level: pokemonDetail.base_experience, // Using base_experience as "level" here
              image: pokemonDetail.sprites.front_default, // Pokémon image URL
              url: pokemonDetail.url,
            };
          })
        );

        setCards(pokemonData); // Save detailed data including images to state
        setLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        console.error('Error fetching Pokémon data:', error);
        setLoading(false);
      }
    };

    fetchCards(); // Call the fetch function
  }, []);

  // Function to handle adding a Pokémon to the squad
  const handleAddToSquad = (pokemon) => {
    if (selectedPokemons.length < 6) {
      setSelectedPokemons([...selectedPokemons, pokemon]);
    } else {
      alert('You can only add up to 6 Pokémon!');
    }
  };

  // Function to handle removing a Pokémon from the squad
  const handleRemoveFromSquad = (pokemon) => {
    setSelectedPokemons(selectedPokemons.filter(p => p.name !== pokemon.name));
  };
   
  //Determine if the "Battle" buttle is enabled
  const isBattleEnabled = selectedPokemons.length === 2;
  return (
    <div>
      <Container className="mt-4">
        {loading ? (
          <h3>Loading...</h3> // Show a loading message while data is being fetched
        ) : (
          <Row>
            <div>
              <Button>Battle</Button>
            </div>
             
            <div className="search-field">
              <input type="text" placeholder="Search ..." />
            </div>

            {cards.map((card, index) => (
              <Col md="2" key={index} className="mb-4">
                {/* Use the PokemonCard component here */}
                <PokemonCard card={card} handleAddToSquad={handleAddToSquad} />
              </Col>
            ))}
          </Row>
        )}

        {/* Display selected Pokémon in Squad component */}
        <Squad
          selectedPokemons={selectedPokemons}
          handleRemoveFromSquad={handleRemoveFromSquad}
        />
         {/* Battle Button */}
         <div style={{ marginTop: '20px' }}>
          <Button 
            color="success" 
            disabled={!isBattleEnabled} 
            onClick={() => alert('Let the battle begin!')}
          >
            Battle
          </Button>
        </div>
      </Container>
    </div>
  );
}

export default App;
