import { createSlice } from "@reduxjs/toolkit";

export const gameSlice = createSlice({
  name: "game",
  initialState: {
    loading: true,
    game: {
      _id: null,
      level: null,
      players: [],
      status: null,
      question: {},
    },
  },
  reducers: {
    setLoading: (state, { payload }) => {
      state.loading = payload;
    },
    setGame: (state, { payload }) => {
      state.game = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setGame, setLoading } = gameSlice.actions;

export default gameSlice.reducer;
