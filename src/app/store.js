// src/app/store.js

import { configureStore } from '@reduxjs/toolkit';

import cartReducer from '../features/cart/cartSlice';
import ordersReducer from '../features/orders/ordersSlice';
import { loadState, saveState } from './localStorage';
import favoritesReducer from '../features/favorites/favoritesSlice'

const preloadedState = loadState() || {
  cart: { items: [] },
  orders: { items: [] },
  favorites: {items: []}
};

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    orders: ordersReducer,
    favorites: favoritesReducer,
  },
  preloadedState,
});

store.subscribe(() => {
  const { cart, orders, favorites } = store.getState();
  saveState({ cart, orders, favorites });
});
