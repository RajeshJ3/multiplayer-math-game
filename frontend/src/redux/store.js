import { configureStore } from "@reduxjs/toolkit";
import game from "./game/gameSlice";

export default configureStore({
  reducer: {
    game,
  },
});
