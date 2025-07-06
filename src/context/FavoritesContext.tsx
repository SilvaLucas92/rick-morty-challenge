import { createContext, useContext, useState, useEffect } from "react";
import type { Character } from "../types/character";

type FavoritesContextType = {
  favorites: Character[];
  toggleFavorite: (character: Character) => void;
  isFavorite: (id: number) => boolean;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<Character[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("favorites");
    if (saved) {
      setFavorites(JSON.parse(saved));
    }
  }, []);

  const isFavorite = (id: number) => favorites.some((c) => c.id === id);

  const toggleFavorite = (character: Character) => {
    const alreadyFavorite = isFavorite(character.id);

    const newFavorites = alreadyFavorite
      ? favorites.filter((c) => c.id !== character.id)
      : [...favorites, character];

    setFavorites(newFavorites);
    localStorage.setItem("favorites", JSON.stringify(newFavorites));
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, toggleFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used inside FovoritesProvider");
  }
  return context;
}
