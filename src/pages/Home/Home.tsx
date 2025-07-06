import { useEffect, useState } from "react";
import { Card } from "../../components/Card/Card";
import { Container } from "../../components/Container/Container";
import { Button } from "../../components/Button/Button";
import "./Home.scss";
import { Spinner } from "../../components/Spinner/Spinner";
import { Pagination } from "../../components/Pagination/Pagination";
import { Modal } from "../../components/Modal/Modal";
import { Badge } from "../../components/Badge/Badge";
import { useFetch } from "../../hooks/useFetch";
import { BASE_URL } from "../../utils";
import type { Character } from "../../types/character";
import { useFavorites } from "../../context/FavoritesContext";
import { useFilters } from "../../context/FiltersContext";

interface CharactersResponse {
  results: Character[];
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
}

export const Home = () => {
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { toggleFavorite, isFavorite } = useFavorites();
  const { filters, setFilters } = useFilters();
  const { name, species, status } = filters;

  const removeFilter = (filterKey: string) => {
    setFilters({ ...filters, [filterKey]: "" });
    setPage(1)
  };

  const hasActiveFilters = name || species || status;

  let url = `/character/?page=${page}&name=${debouncedSearch}&status=${status}&species=${species}`;

  const { data, isLoading, error } = useFetch<CharactersResponse>(
    `${BASE_URL}${url}`
  );

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(name), 500);

    return () => clearTimeout(handler);
  }, [name]);

  const filtersToMap = [{key: "name", value: debouncedSearch }, {key: "species", value: species}, {key: "status", value: status}].filter((filter) => filter.value !== "");

  const characters = data?.results || [];

  return (
    <Container>
      <h1 className="home-title">Characters</h1>
      <section className="search-section">
        <input
          id="character-search"
          type="search"
          placeholder="Search characters..."
          value={name}
          onChange={(e) => setFilters({ ...filters, name: e.target.value })}
          className="search-input"
        />
        <Button onClick={() => setIsModalOpen(true)}>Filters</Button>
      </section>

      {hasActiveFilters && (
        <section className="active-filters">
          <div className="filters-container">
            {filtersToMap.map((filter) => (
              <Badge key={filter.key} color="gray">
                {filter.key}: {filter.value}
                <button
                  onClick={() => removeFilter(filter.key)}
                  className="filter-remove-btn"
                >
                  ✕
                </button>
              </Badge>
            ))}
          </div>
        </section>
      )}

      <section className="home-content">
        {isLoading ? (
          <div className="loading-container" role="status">
            <Spinner />
          </div>
        ) : error ? (
          <div className="error" role="alert">
            <h3>Error</h3>
            <p>{error}</p>
          </div>
        ) : (
          <div className="characters-grid" role="grid" aria-label="Characters">
            {characters.length === 0 ? (
              <p className="no-results">No characters found.</p>
            ) : (
              characters.map((character) => (
                <Card
                  isFavorite={isFavorite(character.id)}
                  toggleFavorite={toggleFavorite}
                  character={character}
                  key={character.id}
                />
              ))
            )}
          </div>
        )}
      </section>

      {!isLoading && !error && characters.length > 0 && (
        <Pagination
          currentPage={page}
          setPage={setPage}
          hasPrev={page > 1}
          hasNext={data?.info?.next !== null}
        />
      )}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} setPage={setPage}/>
    </Container>
  );
};
