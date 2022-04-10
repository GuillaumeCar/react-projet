import { Switch, Route } from 'react-router-dom';
import GameList from "./GameList";
import GameDetails from "./GameDetails";
import FavList from './FavList';
import Team from "./Team";

export default function Navigator() {
    return (
        <Switch>
            <Route exact path="/">
                <GameList />
            </Route>
            <Route exact path="/jeux/:slug">
                <GameDetails />
            </Route>
            <Route exact path="/mes-favoris">
                <FavList />
            </Route>
            <Route exact path="/team">
                <Team />
            </Route>
        </Switch>
    )
}