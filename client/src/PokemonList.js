import React, { Component } from "react";
import axios from "axios";
import Nav from "./components/Nav/index";
import { Col, Row, Container } from "./components/Grid/index";

export default class PokemonList extends Component {
  state = {
    pokemon: []
  };

  // This will hit our API using axios and set the resulting array to state
  async componentDidMount() {
    const { data } = await axios.get("/api/pokemon");
    console.log(data);
    this.setState({
      pokemon: data
    });
  }

  render() {
    return (
      <div>
        <Nav />
        <Container fluid>
        <h1>Landon's Pokemon!</h1>
        {this.state.pokemon.map((poke, i) => (
          <li key={i}>
            <h2>{poke.name}</h2>
            <p>Type: {poke.type}</p>
            <p>Level: {poke.level}</p>
          </li>
        ))}
        </Container>
      </div>
    );
  }
}
