import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Favorites } from "./Favorites";
import { FavoritesProvider } from "../../context/FavoritesContext";
import type { Character } from "../../types/character";

const mockCharacter: Character = {
  id: 1,
  name: "Morty Smith",
  status: "Alive",
  species: "Human",
  type: "",
  gender: "Male",
  origin: { name: "Earth", url: "" },
  location: { name: "Citadel of Ricks", url: "" },
  image: "https://example.com/morty.png",
  episode: [],
  url: "",
  created: "",
};

const renderWithFavorites = (favorites: Character[]) => {
  localStorage.setItem("favorites", JSON.stringify(favorites));
  return render(
    <MemoryRouter>
      <FavoritesProvider>
        <Favorites />
      </FavoritesProvider>
    </MemoryRouter>
  );
};

beforeEach(() => {
  localStorage.clear();
});

describe("Favorites component", () => {
  it("renders favorite characters correctly", () => {
    renderWithFavorites([mockCharacter]);
    expect(screen.getByText("Favorites")).toBeInTheDocument();
    expect(screen.getByText("Morty Smith")).toBeInTheDocument();
    expect(screen.getByText("Human")).toBeInTheDocument();
    expect(screen.getByText("Citadel of Ricks")).toBeInTheDocument();
  });

  it("shows message when there are no favorites", () => {
    renderWithFavorites([]);
    expect(screen.getByText("No Favorites added!")).toBeInTheDocument();
  });
});
