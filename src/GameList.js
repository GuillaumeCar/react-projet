import React, { useCallback, useEffect, useState } from "react";
import {
  Container,
  Dimmer,
  Grid,
  Icon,
  Loader,
  Pagination,
  Segment,
} from "semantic-ui-react";
import GameCard from "./GameCard";
import GameFilters from "./GameFilters";
import { Link, useHistory, useLocation } from "react-router-dom";
import API_KEY from "./Api";

export default function GameList() {
  const history = useHistory();

  const URLParams = new URLSearchParams(useLocation().search);
  const pageURLValue = URLParams.get("page") ? URLParams.get("page") : 1;
  const searchURLValue = URLParams.get("search") ? URLParams.get("search") : "";
  const orderingURLValue = URLParams.get("ordering")
    ? URLParams.get("ordering")
    : "pertinence";
  const genresURLValue = URLParams.get("genres")
    ? URLParams.get("genres").split(",")
    : [];
  const tagsURLValue = URLParams.get("tags")
    ? URLParams.get("tags").split(",")
    : [];

  const URLValues = {
    pageURLValue: pageURLValue,
    searchURLValue: searchURLValue,
    orderingURLValue: orderingURLValue,
    genresURLValue: genresURLValue,
    tagsURLValue: tagsURLValue,
  };

  const [page, setPage] = useState(pageURLValue);
  const [games, setGames] = useState([]);
  const [maxPages, setMaxPages] = useState(1);

  const [genres, setGenres] = useState(genresURLValue);
  const [tags, setTags] = useState(tagsURLValue);
  const [ordering, setOrdering] = useState(orderingURLValue);
  const [search, setSearch] = useState(searchURLValue);

  const generateApiUrl = useCallback(() => {
    let url = `https://api.rawg.io/api/games?key=${API_KEY}&page=${page}`;

    if (
      genres.length === 0 &&
      tags.length === 0 &&
      ordering === "pertinence" &&
      search === ""
    ) {
      url += `&dates=2020-01-01,2050-12-31&metacritic=50,100`;
    } else {
      const genres_url = "&genres=" + genres.join();
      const tags_url = "&tags=" + tags.join();
      const ordering_url = "&ordering=" + ordering;
      const search_url = "&search=" + search;

      if (genres.length !== 0) {
        url += genres_url;
      }
      if (tags.length !== 0) {
        url += tags_url;
      }
      if (ordering !== "pertinence") {
        url += ordering_url;
      }
      if (search !== "") {
        url += search_url;
      }
    }

    return url;
  }, [page, genres, tags, ordering, search]);

  const updateURL = useCallback(() => {
    const pageURL = page && page > 0 ? `?page=${page}` : "?page=1";
    const searchURL = search && search !== "" ? `&search=${search}` : "";
    const genresURL = genres.length > 0 ? `&genres=${genres}` : "";
    const tagsURL = tags.length > 0 ? `&tags=${tags}` : "";
    const orderingURL =
      ordering && ordering !== "pertinence" ? `&ordering=${ordering}` : "";
    history.push(`/${pageURL}${searchURL}${genresURL}${tagsURL}${orderingURL}`);
  }, [page, genres, tags, ordering, search, history]);

  function setFilters({ genres, tags, ordering, search, page }) {
    setGenres(genres);
    setTags(tags);
    setOrdering(ordering);
    setSearch(search);
    setPage(page);
  }

  useEffect(() => {
    const url = generateApiUrl();

    fetch(url)
      .then((res) => res.json())
      .then((games) => {
        setMaxPages(Math.ceil(games.count / 20));
        setGames(games.results);
      });

    updateURL();
  }, [generateApiUrl, updateURL]);

  const favorisList = JSON.parse(localStorage.getItem("favoris"));

  return (
    <Container fluid>
      <Grid columns={5} centered>
        <Grid.Row>
          <GameFilters URLValues={URLValues} fetchByFilters={setFilters} />
        </Grid.Row>
        <Grid.Row className="gameListLoader">
          {!games.length ? (
            <Segment className="gameListLoaderSegment">
            <Dimmer active>
              <Loader />
            </Dimmer>
            </Segment>
          ) : (
            ""
          )}
          {games.map((game) => (
            <Link to={"/jeux/" + game.slug} key={game.id}>
              <GameCard game={game} favorisList={favorisList} />
            </Link>
          ))}
        </Grid.Row>
        <Grid.Row>
          <Pagination
            onClick={(e) => setPage(e.target.attributes.value.value)}
            boundaryRange={0}
            activePage={page}
            ellipsisItem={null}
            firstItem={{
              content: <Icon name="angle double left" value={1} />,
              icon: true,
            }}
            lastItem={{
              content: <Icon name="angle double right" value={maxPages} />,
              icon: true,
            }}
            siblingRange={2}
            totalPages={maxPages}
          />
        </Grid.Row>
      </Grid>
    </Container>
  );
}
