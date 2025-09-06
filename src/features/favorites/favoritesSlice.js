// favoritesSlice.js
import { createSlice } from '@reduxjs/toolkit';

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: { items: [] },
  reducers: {
    addToFavorites: (state, action) => {
      if (!state.items.find(p => p.id === action.payload.id)) {
        state.items.push(action.payload);
      }
    },
    removeFromFavorites: (state, action) => {
      state.items = state.items.filter(product => product.id !== action.payload);
    },
    toggleFavorite: (state, action) => {
      const index = state.items.findIndex(p => p.id === action.payload.id);
      if (index >= 0) {
        state.items = state.items.filter(p => p.id !== action.payload.id);
      } else {
        state.items.push(action.payload);
      }
    }
  },
});

export const { addToFavorites, removeFromFavorites, toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
