import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { Home } from "./Home";
import "@testing-library/jest-dom";
import { useFetch } from "../../hooks/useFetch";
import { FavoritesProvider } from "../../context/FavoritesContext";
import { FiltersProvider } from "../../context/FiltersContext";
import type { Character } from "../../types/character";

const mockCharacters: Character[] = [
  {
    id: 1,
    name: "Rick Sanchez",
    status: "Alive",
    species: "Human",
    type: "",
    gender: "Male",
    origin: { name: "Earth", url: "" },
    location: { name: "Citadel of Ricks", url: "" },
    image: "https://example.com/rick.png",
    episode: [],
    url: "",
    created: "",
  },
];

const mockFilteredCharacters: Character[] = [
  {
    id: 2,
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
  },
];

jest.mock("../../hooks/useFetch", () => ({
  useFetch: jest.fn(),
}));

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <MemoryRouter>
      <FiltersProvider>
        <FavoritesProvider>{ui}</FavoritesProvider>
      </FiltersProvider>
    </MemoryRouter>
  );
};

describe("Home component", () => {
  it("renders characters correctly when data is available", () => {
    (useFetch as jest.Mock).mockReturnValue({
      data: {
        results: mockCharacters,
        info: { pages: 1, next: null, prev: null },
      },
      isLoading: false,
      error: null,
    });

    renderWithProviders(<Home />);

    expect(screen.getByText("Characters")).toBeInTheDocument();
    expect(screen.getByText("Rick Sanchez")).toBeInTheDocument();
    expect(screen.getByText("Human")).toBeInTheDocument();
    expect(screen.getByText("Citadel of Ricks")).toBeInTheDocument();
    expect(
      screen.getByRole("grid", { name: "Characters" })
    ).toBeInTheDocument();
  });

  it("shows 'No characters found' when data is empty", () => {
    (useFetch as jest.Mock).mockReturnValue({
      data: { results: [], info: { pages: 1, next: null, prev: null } },
      isLoading: false,
      error: null,
    });

    renderWithProviders(<Home />);

    expect(screen.getByText("No characters found.")).toBeInTheDocument();
  });

  it("updates search input when user types in the search bar", async () => {
    (useFetch as jest.Mock).mockReturnValue({
      data: {
        results: mockCharacters,
        info: { pages: 1, next: null, prev: null },
      },
      isLoading: false,
      error: null,
    });

    renderWithProviders(<Home />);

    const input = screen.getByPlaceholderText("Search characters...");

    await userEvent.type(input, "Morty");

    expect((input as HTMLInputElement).value).toBe("Morty");
  });

  it("opens modal, changes filters, submits and returns filtered list", async () => {
    const mockUseFetch = useFetch as jest.Mock;

    mockUseFetch.mockReturnValue({
      data: {
        results: mockCharacters,
        info: { pages: 1, next: null, prev: null },
      },
      isLoading: false,
      error: null,
    });

    renderWithProviders(<Home />);

    const filtersButton = screen.getByText("Filters");
    await userEvent.click(filtersButton);

    expect(
      screen.getByRole("heading", { name: "Filters" })
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Status")).toBeInTheDocument();
    expect(screen.getByLabelText("Species")).toBeInTheDocument();

    const statusSelect = screen.getByLabelText("Status");
    await userEvent.selectOptions(statusSelect, "Alive");

    const speciesSelect = screen.getByLabelText("Species");
    await userEvent.selectOptions(speciesSelect, "Human");

    mockUseFetch.mockReturnValue({
      data: {
        results: mockFilteredCharacters,
        info: { pages: 1, next: null, prev: null },
      },
      isLoading: false,
      error: null,
    });

    const saveButton = screen.getByText("Save");
    await userEvent.click(saveButton);

    expect(
      screen.queryByRole("heading", { name: "Filters" })
    ).not.toBeInTheDocument();

    expect(screen.getByText("Morty Smith")).toBeInTheDocument();
    expect(screen.getByText("Human")).toBeInTheDocument();
    expect(screen.getByText("Citadel of Ricks")).toBeInTheDocument();

    expect(screen.queryByText("Rick Sanchez")).not.toBeInTheDocument();

    expect(screen.getByText("status: Alive")).toBeInTheDocument();
    expect(screen.getByText("species: Human")).toBeInTheDocument();
  });
});
