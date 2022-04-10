import _ from "lodash";
import React from "react";
import { Search, Grid, Image } from "semantic-ui-react";
import API_KEY from "./Api";
import { useHistory } from "react-router-dom";

let source = [];

const initialState = {
  loading: false,
  results: [],
  value: "",
  selection: "",
};

const resultRenderer = ({ image, title, slug }) => [
  image && (
    <div key="image" className="image">
      <Image src={image} />
    </div>
  ),
  <div key="content" data-slug={slug} className="content">
    {title && <div className="title">{title}</div>}
  </div>,
];

function updateSource(query) {
  fetch(`https://api.rawg.io/api/games?key=${API_KEY}&search=${query}`)
    .then((res) => res.text())
    .then((res) => JSON.parse(res))
    .then((games) => {
      source = [];
      games.results.forEach((game, count) => {
        if (count < 5) {
          source.push({
            title: game.name,
            image: game.background_image,
            slug: game.slug,
          });
        }

      });
    });
}

function reducer(state, action) {
  switch (action.type) {
    case "CLEAN_QUERY":
      return initialState;
    case "START_SEARCH": {
      updateSource(action.query);
      return { ...state, loading: true, value: action.query };
    }
    case "FINISH_SEARCH":
      return { ...state, loading: false, results: source };
    case "UPDATE_SELECTION": {
      return { ...state, value: "", selection: action.selection.slug };
    }

    default:
      throw new Error();
  }
}

function SearchGame() {
  const history = useHistory();

  const [state, dispatch] = React.useReducer(reducer, initialState);
  const { loading, results, value, selection } = state;

  React.useEffect(() => {
    if (selection !== "") {
      history.push(`/jeux/${selection}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selection]);

  const timeoutRef = React.useRef();
  const handleSearchChange = React.useCallback((e, data) => {
    clearTimeout(timeoutRef.current);
    dispatch({ type: "START_SEARCH", query: data.value });

    timeoutRef.current = setTimeout(() => {
      if (data.value.length === 0) {
        dispatch({ type: "CLEAN_QUERY" });
        return;
      }

      const re = new RegExp(_.escapeRegExp(data.value), "i");
      const isMatch = (result) => re.test(result.title);

      dispatch({
        type: "FINISH_SEARCH",
        results: _.filter(source, isMatch),
      });
    }, 300);
  }, []);
  React.useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <Grid>
      <Grid.Column>
        <Search
          fluid
          loading={loading}
          onResultSelect={(e, data) =>
            dispatch({ type: "UPDATE_SELECTION", selection: data.result })
          }
          onSearchChange={handleSearchChange}
          resultRenderer={resultRenderer}
          results={results}
          value={value}
        />
      </Grid.Column>
    </Grid>
  );
}

export default SearchGame;
