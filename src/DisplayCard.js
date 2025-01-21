import React, { useEffect, useState } from 'react';
import { Card, CardBody, CardTitle, CardText, Button, Row, Col, Container, CardImg } from 'reactstrap';
import "./App.css"

function App() {
  const [cards, setCards] = useState([]);  // State to store card data
  const [loading, setLoading] = useState(true);  // State to handle loading state

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
              level:pokemon.level,
              image: pokemonDetail.sprites.front_default, // Pokémon image URL
              url: pokemonDetail.url,
            };
          })
        );
        
        setCards(pokemonData);  // Save detailed data including images to state
        setLoading(false);  // Set loading to false once data is fetched
      } catch (error) {
        console.error('Error fetching Pokémon data:', error);
        setLoading(false);
      }
    };

    fetchCards();  // Call the fetch function
  }, []);

  return (
    <div>
        
      <Container className="mt-4">
        {loading ? (
          <h3>Loading...</h3>  // Show a loading message while data is being fetched
        ) : (
          <Row>
            <div className='search-field'>
                <input type="text" placeholder="Search ..."></input>
            </div>
            
            
            {cards.map((card, index) => (
              <Col md="2" key={index} className="mb-4">
                <Card>
                  {/* Display the Pokémon image */}
                  <CardImg top width="100%" src={card.image} alt={card.name} />
                  
                  <CardBody>
                    {/* Card Title */}
                    <CardTitle tag="h5">{card.name}</CardTitle>

                    {/* Card Text Content */}
                    <CardText>
                      This is a Pokémon card named {card.name}. Click the button to view more details.
                    </CardText>

                    {/* Button that links to more Pokémon details */}
                    <Button color="primary" href={`https://pokeapi.co/api/v2/pokemon/${card.name}`} target="_blank">
                      View Details
                    </Button>
                  </CardBody>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </div>
  );
}

export default App;
