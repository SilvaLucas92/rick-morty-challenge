import { render, screen } from "@testing-library/react";
import { CharacterDetail } from "./CharacterDetail";
import { useFetch } from "../../hooks/useFetch";
import { MemoryRouter } from "react-router-dom";
import type { Character } from "../../types/character";
import type { Episode } from "../../types/episode";
import "@testing-library/jest-dom";


const mockCharacter: Character = {
  id: 1,
  name: "Rick Sanchez",
  status: "Alive",
  species: "Human",
  type: "",
  gender: "Male",
  origin: { name: "Earth (C-137)", url: "" },
  location: { name: "Citadel of Ricks", url: "" },
  image: "https://example.com/rick.png",
  episode: [
    "https://rickandmortyapi.com/api/episode/1",
    "https://rickandmortyapi.com/api/episode/2",
  ],
  url: "",
  created: "",
};

const mockEpisodes: Episode[] = [
  { id: 1, name: "Pilot", air_date: "December 2, 2013", episode: "S01E01", characters: [], url: "", created: "" },
  { id: 2, name: "Lawnmower Dog", air_date: "December 9, 2013", episode: "S01E02", characters: [], url: "", created: "" },
];

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({ id: "1" }),
}));


jest.mock("../../hooks/useFetch", () => ({
  useFetch: jest.fn(),
}));


const renderComponent = () =>
  render(
    <MemoryRouter>
      <CharacterDetail />
    </MemoryRouter>
  );

describe("CharacterDetail component", () => {
  it("shows loading spinner initially", () => {
    (useFetch as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
    });

    renderComponent();

    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("shows error when character fetch fails", () => {
    (useFetch as jest.Mock).mockReturnValueOnce({
      data: null,
      isLoading: false,
      error: "Character not found",
    });

    (useFetch as jest.Mock).mockReturnValueOnce({
      data: null,
      isLoading: false,
      error: null,
    });

    renderComponent();

    expect(screen.getByText("Character not found")).toBeInTheDocument();
  });

  it("renders character and episodes correctly", () => {

    (useFetch as jest.Mock).mockReturnValueOnce({
      data: mockCharacter,
      isLoading: false,
      error: null,
    });


    (useFetch as jest.Mock).mockReturnValueOnce({
      data: mockEpisodes,
      isLoading: false,
      error: null,
    });

    renderComponent();

    expect(screen.getByText("Character Detail")).toBeInTheDocument();
    expect(screen.getByText("Rick Sanchez")).toBeInTheDocument();
    expect(screen.getByText("Species:")).toBeInTheDocument();
    expect(screen.getByText("Human")).toBeInTheDocument();
    expect(screen.getByText("Episodes")).toBeInTheDocument();
    expect(screen.getByText("Pilot")).toBeInTheDocument();
    expect(screen.getByText("Lawnmower Dog")).toBeInTheDocument();
  });
});
