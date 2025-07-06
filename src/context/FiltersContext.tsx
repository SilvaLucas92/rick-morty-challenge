import { createContext, useContext, useState, type Dispatch } from "react";
import type { Filters } from "../types/filters";

type FiltersContextType = {
  filters: Filters;
  setFilters: Dispatch<React.SetStateAction<Filters>>;
  resetFilters: () => void;
};

const FiltersContext = createContext<FiltersContextType | undefined>(undefined);

export function FiltersProvider({ children }: { children: React.ReactNode }) {
  const [filters, setFilters] = useState<Filters>({
    name: "",
    status: "",
    species: "",
  });

  const resetFilters = () =>
    setFilters({
      name: "",
      status: "",
      species: "",
    });


  return (
    <FiltersContext.Provider value={{ filters, setFilters, resetFilters }}>
      {children}
    </FiltersContext.Provider>
  );
}

export function useFilters() {
  const context = useContext(FiltersContext);
  if (!context) {
    throw new Error("useFilters must be used inside FiltersProvider");
  }
  return context;
}
