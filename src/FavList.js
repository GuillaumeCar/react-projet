import React, { useState } from "react";
import {
  Container,
  Dimmer,
  Grid,
  Loader,
} from "semantic-ui-react";
import GameCard from "./GameCard";
import { Link } from "react-router-dom";

export default function FavList() {

  const favorisList = JSON.parse(localStorage.getItem("favoris"));

  const [games, setGames] = useState(favorisList);

  function updateList() {
    setGames(JSON.parse(localStorage.getItem("favoris")));
  }

  return (
    (!games.length) ? <Dimmer active><Loader /></Dimmer> :
      <Container fluid>
        <Grid columns={5} centered>
          {games.map((game) => (
            <Link to={"/jeux/" + game.slug} key={game.id}>
              <GameCard
                game={game}
                favorisList={favorisList}
                updateList={updateList}
              />
            </Link>
          ))}
        </Grid>
      </Container>
  );
}
