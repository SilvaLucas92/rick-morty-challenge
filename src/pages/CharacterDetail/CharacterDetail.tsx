import { useNavigate, useParams } from "react-router-dom";
import { Container } from "../../components/Container/Container";
import { Spinner } from "../../components/Spinner/Spinner";
import { useFetch } from "../../hooks/useFetch";
import { BASE_URL } from "../../utils";
import type { Character } from "../../types/character";
import type { Episode } from "../../types/episode";
import "./CharacterDetail.scss";
import { Badge } from "../../components/Badge/Badge";
import { Button } from "../../components/Button/Button";

const CharacterItem = ({ label, value }: { label: string; value: string }) => (
  <div className="info-item">
    <span className="info-label">{label}</span>
    <span className={`info-value`}>{value}</span>
  </div>
);

export const CharacterDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const {
    data: character,
    isLoading,
    error,
  } = useFetch<Character>(id ? `${BASE_URL}/character/${id}` : "");

  const episodesArray =
    character &&
    JSON.stringify(
      character.episode.map((e) => e.split("/").pop() || "").filter(Boolean)
    );

  const { data: episodes, isLoading: isEpisodeLoading } = useFetch<Episode[]>(
    character ? `${BASE_URL}/episode/${episodesArray}` : ""
  );

  if (isLoading) {
    return (
      <Container>
        <div className="character-detail-loading">
          <Spinner />
        </div>
      </Container>
    );
  }

  if (error || !character) {
    return (
      <Container>
        <div className="character-detail-error">
          <h2>Error</h2>
          <p>Character not found</p>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <section className="character-header">
        <h1>Character</h1>
        <Button onClick={() => navigate(-1)}>Back</Button>
      </section>
      <section className="character-detail-content">
        <img
          src={character.image}
          alt={character.name}
          className="character-image"
        />

        <div className="character-info">
          <article className="info-section">
            <h2>{character.name}</h2>
            <div className="info-grid">
              <CharacterItem label="Status:" value={character.status} />
              <CharacterItem label="Species:" value={character.species} />
              <CharacterItem
                label="Type:"
                value={character.type || "Unknown"}
              />
              <CharacterItem label="Gender:" value={character.gender} />
              <CharacterItem label="Origin:" value={character.origin.name} />
              <CharacterItem
                label="Current Location:"
                value={character.location.name}
              />
            </div>
          </article>

          <article className="info-section">
            <h2>Episodes</h2>

            {isEpisodeLoading ? (
              <p>Loading episodes...</p>
            ) : (
              <div className="episodes-list">
                {episodes &&
                  episodes.map((episode: Episode) => {
                    return (
                      <Badge key={episode.id} color="blue">
                        {episode.name}
                      </Badge>
                    );
                  })}
              </div>
            )}
          </article>
        </div>
      </section>
    </Container>
  );
};
