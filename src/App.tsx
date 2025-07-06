import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import { Navbar } from "./components/Navbar/Navbar";
import { FavoritesProvider } from "./context/FavoritesContext";
import { FiltersProvider } from "./context/FiltersContext";
import { Favorites } from "./pages/Favorites/Favorites";
import { CharacterDetail } from "./pages/CharacterDetail/CharacterDetail";
import {NotFound} from "./pages/NotFound/NotFound";

function App() {
  return (
    <FavoritesProvider>
      <FiltersProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/character/:id" element={<CharacterDetail />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </FiltersProvider>
    </FavoritesProvider>
  );
}

export default App;
