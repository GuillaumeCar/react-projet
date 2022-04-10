import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { Dropdown, Form, Input, Segment, Divider } from "semantic-ui-react";
import API_KEY from "./Api";

export default function GameFilters({URLValues, fetchByFilters }) {

  const location = useLocation();
  useEffect(() => {
    if(location.pathname === "/" && location.search === ""){
      setFilters({ genres: [], tags: [], ordering: "pertinence", search:"", page: 1 });
    }
  }, [location]);

  const [genreList, setGenreList] = useState([]);
  const [tagList, setTagList] = useState([]);
  const orderingList = [
    { key: "pertinence", text: "Pertinence", value: "pertinence" },
    { key: "-released", text: "Date de sortie", value: "-released" },
    { key: "-metacritic", text: "Metacritic", value: "-metacritic" },
  ];

  let typingTimer = useRef();
  const doneTypingInterval = 1000;

  const [filters, setFilters] = useState({
    genres: URLValues.genresURLValue,
    tags: URLValues.tagsURLValue,
    ordering: URLValues.orderingURLValue,
    search: URLValues.searchURLValue,
    page: URLValues.pageURLValue
  });

  const handleOnChange = (e, data, type) => {
    switch (type) {
      case "genres":
        setFilters({ ...filters, genres: data.value, page: 1 });
        break;
      case "tags":
        setFilters({ ...filters, tags: data.value, page: 1 });
        break;
      case "ordering":
        setFilters({ ...filters, ordering: data.value, page: 1 });
        break;
      case "search":
        setFilters({ ...filters, search: data.value, page: 1 });
        break;
      default:
    }
  };

  useEffect(() => {
    fetchByFilters(filters);
  }, [filters.genres, filters.tags, filters.ordering]);

  // Permet de ne faire la recherche que quand l'utilisateur arrete de taper plus de {doneTypingInterval} millisecondes
  useEffect(() => {
    clearTimeout(typingTimer.current);
    typingTimer.current = setTimeout(() => {
      fetchByFilters(filters);
    }, doneTypingInterval);
  }, [filters.search]);

  useEffect(() => {
    fetch(`https://api.rawg.io/api/genres?key=${API_KEY}`)
      .then((res) => res.json())
      .then((genres) => {
        genres = genres.results.map((genre) => {
          return { key: genre.slug, text: genre.name, value: genre.slug };
        });
        setGenreList(genres);
      });

    fetch(`https://api.rawg.io/api/tags?key=${API_KEY}`)
      .then((res) => res.json())
      .then((tags) => {
        tags = tags.results.map((tag) => {
          return { key: tag.slug, text: tag.name, value: tag.slug };
        });
        setTagList(tags);
      });
  }, []);

  return (
    <Segment padded className="filtersSegment">
      <Form>
        <Input
          fluid
          icon={{ name: "search", circular: true, link: true }}
          placeholder="Recherche..."
          onChange={(e, data) => handleOnChange(e, data, "search")}
          value={filters.search}
        />
        <Divider></Divider>
        <Form.Group widths="equal">
          <Dropdown
            fluid
            placeholder="Genre"
            clearable
            multiple
            selection
            options={genreList}
            onChange={(e, data) => handleOnChange(e, data, "genres")}
            value={filters.genres}
          />

          <Dropdown
            fluid
            placeholder="Tag"
            clearable
            multiple
            selection
            options={tagList}
            onChange={(e, data) => handleOnChange(e, data, "tags")}
            value={filters.tags}
            
          />

          <Dropdown
            fluid
            placeholder="Trier par"
            selection
            options={orderingList}
            onChange={(e, data) => handleOnChange(e, data, "ordering")}
            value={filters.ordering}
          />
        </Form.Group>
      </Form>
    </Segment>
  );
}
