import { BrowserRouter, Routes, Route } from "react-router-dom";

// wrappers
import GameWrapper from "./containers/GameWrapper";

// pages
import Home from "./pages/Home";
import Join from "./pages/Join";
import Lobby from "./pages/Lobby";
import Room from "./pages/Room";
import Results from "./pages/Results";

export default function MyRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/join/:id" element={<Join />} />
        <Route
          path="/result/:id"
          element={
            <GameWrapper>
              <Results />
            </GameWrapper>
          }
        />
        <Route
          path="/lobby/:id"
          element={
            <GameWrapper>
              <Lobby />
            </GameWrapper>
          }
        />
        <Route path="/room/:id" element={<Room />} />
      </Routes>
    </BrowserRouter>
  );
}
