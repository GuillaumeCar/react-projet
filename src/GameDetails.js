import API_KEY from './Api'
import { useState, useEffect, useCallback } from 'react';
import { Grid, Image, Header, Label, Icon, Container, Dimmer, Loader, Divider } from 'semantic-ui-react'
import { useParams } from "react-router-dom";
import './GameDetails.css';
import ImageThumbnail from './ImageThumbnail';
import { updateFavListStorage } from './FavStorage';

export default function GameDetails() {
    const [game, setGame] = useState(null);
    const { slug } = useParams();
    const [screenshots, setScreenshots] = useState([])

    const favorisList = JSON.parse(localStorage.getItem("favoris"));
    const isFavoris = favorisList.findIndex((g) => g.slug === slug) > -1;
    const [favoris, setFavoris] = useState(isFavoris);

    const fetchGame = useCallback(() => {
        fetch(`https://api.rawg.io/api/games/${slug}?key=${API_KEY}`)
            .then(response => response.json())
            .then(game => setGame(game))
    }, [slug]);

    const fetchScreenshots = useCallback(() => {
        fetch(`https://api.rawg.io/api/games/${slug}/screenshots?key=${API_KEY}`)
            .then(response => response.json())
            .then(screenshots => setScreenshots(screenshots.results))
    }, [slug]);

    const getDetails = useCallback(() => {
        fetchGame();
        fetchScreenshots();
    }, [fetchGame, fetchScreenshots])

    function handleFavorisCLick(e) {
        e.preventDefault();
        setFavoris(!favoris);
    }

    useEffect(() => getDetails(), [getDetails])

    useEffect(() => {
        updateFavListStorage(game, slug, favoris);
    }, [favoris, game, slug]);

    if (!game) {
        return <Dimmer active><Loader /></Dimmer>
    }

    return (
        <Container className="gameDetails">
            <Grid>
                <Grid.Row>
                    <div onClick={handleFavorisCLick}>
                        {favoris ? (
                            <Icon size="big" name="favorite" className="favorite" />
                        ) : (
                            <Icon size="big" name="star outline" className="no-favorite" />
                        )}
                    </div>
                    <Header as='h1'>
                        {game.name} &nbsp;
                        <a href={game.website} target="_blank" rel="noreferrer">
                            <Icon name="linkify" />
                        </a>
                        <Divider clearing />
                        <Header.Subheader>
                            <Label color={game.metacritic > 75 ? 'green' : game.metacritic > 50 ? 'orange' : game.metacritic == null ? 'grey' : 'red'}>
                                <Icon name='star' /> {game.metacritic != null ? game.metacritic : "N/A"}
                            </Label>
                        </Header.Subheader>
                    </Header>
                    <Label.Group color='blue'>
                        {
                            game.genres.map(
                                (genre) => {
                                    return <Label key={genre.id}>{genre.name}</Label>
                                }
                            )
                        }
                    </Label.Group>
                </Grid.Row>

                <Grid.Row>
                    <Grid.Column width={8}>
                        <Image src={game.background_image} size='big' />
                    </Grid.Column>
                    <Grid.Column width={6} verticalAlign='middle'>
                        <Container className="description" textAlign='justified' dangerouslySetInnerHTML={{ __html: game.description }}></Container>
                    </Grid.Column>
                </Grid.Row>

                <Divider clearing />
                <Grid.Row>
                    <Header as='h2'>Screenshots</Header>
                    <Container className="screenshotsContainer">
                        {
                            screenshots.map(
                                (screenshot) => {
                                    return <ImageThumbnail key={screenshot.id} image={screenshot.image}></ImageThumbnail>
                                }
                            )
                        }
                        <Divider clearing />
                    </Container>
                    <Header as='h2'>Plateformes</Header>
                    <Container className="logo-container">
                        {game.platforms.map(
                            element => {
                                return <Image
                                    key={element.platform.id}
                                    src={'/platforms/' + element.platform.slug + ".png"}
                                    size="small"
                                    label={element.platform.name}
                                />
                            }
                        )
                        }
                    </Container>
                </Grid.Row>
            </Grid>
        </Container>
    );
}