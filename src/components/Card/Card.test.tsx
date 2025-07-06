import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { Card } from "./Card";
import type { Character } from "../../types/character";

const mockCharacter: Character = {
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
};



describe("Card component - favorites behaviour", () => {
  it("adds character to favorites and localStorage on heart click", async () => {
    const user = userEvent.setup();
    localStorage.clear();
    const setItemSpy = jest.spyOn(Storage.prototype, "setItem");

    const toggleFavoriteMock = jest.fn(() => {
      localStorage.setItem("favorites", JSON.stringify([mockCharacter]));
    });

    render(
      <MemoryRouter>
        <Card
          isFavorite={false}
          toggleFavorite={toggleFavoriteMock}
          character={mockCharacter}
        />
      </MemoryRouter>
    );


    const heartElement = document.querySelector(".heart-icon") as HTMLElement;
    await user.click(heartElement);

    expect(setItemSpy).toHaveBeenCalledWith(
      "favorites",
      JSON.stringify([mockCharacter])
    );

    setItemSpy.mockRestore();
  });

  it("removes character from favorites and localStorage on heart click when already favorite", async () => {
    const user = userEvent.setup();
    localStorage.clear();

    localStorage.setItem("favorites", JSON.stringify([mockCharacter]));
    const setItemSpy = jest.spyOn(Storage.prototype, "setItem");

    const toggleFavoriteMock = jest.fn(() => {
      localStorage.setItem("favorites", JSON.stringify([]));
    });

    render(
      <MemoryRouter>
        <Card
          isFavorite={true}
          toggleFavorite={toggleFavoriteMock}
          character={mockCharacter}
        />
      </MemoryRouter>
    );

    const heartElement = document.querySelector(".heart-icon") as HTMLElement;
    await user.click(heartElement);

    expect(setItemSpy).toHaveBeenCalledWith("favorites", JSON.stringify([]));

    setItemSpy.mockRestore();
  });
});
