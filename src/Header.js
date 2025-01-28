import React from 'react';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink, Container ,Button} from 'reactstrap';
import pokemonImage from './pokemon.jpg'
function Header() {
  return (
    <Navbar color="dark" dark expand="md">
      <Container>
        <NavbarBrand href="/">My Pokémon Cards | All Pokémons </NavbarBrand>
        <Nav><img src={pokemonImage} 
                     width="180" height="80" 
                     alt="Logo" /></Nav>
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink href="/">Home</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/about">About</NavLink>
          </NavItem>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Header;
