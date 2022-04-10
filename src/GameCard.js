import React, { useEffect, useState } from "react";
import { Card, Icon, Label, Reveal } from "semantic-ui-react";
import "./GameCard.css";
import { updateFavListStorage } from "./FavStorage";

export default function GameCard({ game, favorisList, updateList }) {
  const { background_image, name, genres, metacritic } = game;

  if (favorisList == null) {
    favorisList = [];
  }
  const isFavoris = favorisList.findIndex((g) => g.slug === game.slug) > -1

  const [favoris, setFavoris] = useState(isFavoris);

  const imageStyle = {
    backgroundImage: "url(" + background_image + ")",
    width: "100%",
    backgroundSize: "cover",
    backgroundPosition: "center"
  };

  const favoriteStyle = {
    fontSize: "16.5vh",
    paddingTop: "4vh",
    color: "#FFB70A",
  };

  const noFavoriteStyle = {
    fontSize: "16.5vh",
    paddingTop: "4vh",
    color: "#1E1E1E",
  };

  function handleFavorisCLick(e) {
    e.preventDefault();
    setFavoris(!favoris);
  }

  useEffect(() => {
    updateFavListStorage(game, game.slug, favoris);
    if (updateList !== undefined) {
      updateList()
    }
  }, [favoris, game, updateList]);

  return (
    <Card>
      {/* <Image src={image} wrapped ui={false}/> */}
      <Reveal animated="move down">
        <Reveal.Content
          visible
          className="image"
          style={imageStyle}
        ></Reveal.Content>
        <Reveal.Content hidden onClick={handleFavorisCLick}>
          {favoris ? (
            <Icon size="big" name="favorite" style={favoriteStyle} />
          ) : (
            <Icon size="big" name="star outline" style={noFavoriteStyle} />
          )}
        </Reveal.Content>
      </Reveal>
      <Card.Content>
        <Card.Header>{name}</Card.Header>
        <Card.Description>
          <Label.Group color="blue">
            {genres.map((genre, count) => {
              if (count < 5) {
                return <Label key={genre.id}>{genre.name}</Label>;
              }
              return null;
            })}
          </Label.Group>
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Icon name="star" />
        {metacritic ? metacritic : "N/A"}
      </Card.Content>
    </Card>
  );
}
