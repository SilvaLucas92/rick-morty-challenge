import { Container } from "../../components/Container/Container";
import { Card } from "../../components/Card/Card";
import { useFavorites } from "../../context/FavoritesContext";
import "./Favorites.scss";
import { Button } from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";

export const Favorites = () => {
  const navigate = useNavigate();
  const { favorites, toggleFavorite, isFavorite } = useFavorites();

  return (
    <Container>
      <section className="favorites-header">
        <h1>Favorites</h1>
        <Button onClick={() => navigate(-1)}>Back</Button>
      </section>
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
