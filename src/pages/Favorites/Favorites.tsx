import { Container } from "../../components/Container/Container";
import { Card } from "../../components/Card/Card";
import { useFavorites } from "../../context/FavoritesContext";
import "./Favorites.scss";

export const Favorites = () => {
  const { favorites, toggleFavorite, isFavorite } = useFavorites();

  return (
    <Container>
      <h1 className="favorites-title">Favorites</h1>
      <section>
        {favorites.length === 0 ? (
          <div className="no-favorites">
            <p className="no-favorites-text">No Favorites added!</p>
          </div>
        ) : (
          <div className="favorites-grid">
            {favorites.map((character) => (
              <Card
                isFavorite={isFavorite(character.id)}
                toggleFavorite={toggleFavorite}
                character={character}
                key={character.id}
              />
            ))}
          </div>
        )}
      </section>
    </Container>
  );
};
