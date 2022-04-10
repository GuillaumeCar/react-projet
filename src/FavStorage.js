export function updateFavListStorage(game, slug, isFavoris) {
    let favorisList = JSON.parse(localStorage.getItem("favoris"));

    if (favorisList == null) {
        favorisList = [];
    }

    const listContainsGame = favorisList.some((g) => g.slug === slug);

    if (isFavoris && !listContainsGame) {
        favorisList.push(game);
    } else if (!isFavoris && listContainsGame) {
        const indexToRemove = favorisList.findIndex((g) => g.slug === slug);
        if (indexToRemove > -1) {
            favorisList.splice(indexToRemove, 1);
        }
    }

    localStorage.setItem("favoris", JSON.stringify(favorisList));
}