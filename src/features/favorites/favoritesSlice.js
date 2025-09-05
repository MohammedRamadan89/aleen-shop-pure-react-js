// favoritesSlice.js
import { createSlice } from '@reduxjs/toolkit';

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: [],
  reducers: {
    addToFavorites: (state, action) => {
      if (!state.find(p => p.id === action.payload.id)) {
        state.push(action.payload);
      }
    },
    removeFromFavorites: (state, action) => {
      return state.filter(product => product.id !== action.payload);
    },
    toggleFavorite: (state, action) => {
      const index = state.findIndex(p => p.id === action.payload.id);
      if (index >= 0) {
        return state.filter(p => p.id !== action.payload.id);
      } else {
        state.push(action.payload);
      }
    }

  },
});

export const { addToFavorites, removeFromFavorites, toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
