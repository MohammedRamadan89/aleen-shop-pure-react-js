// cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [], // كل عنصر سيكون { id, name, price, quantity, image, selectedSize, selectedColor }
  shippingMethod: 'standard'
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { product, quantity = 1, selectedSize, selectedColor } = action.payload;
      
      // إنشاء مفتاح فريد للمنتج مع خياراته
      const itemKey = `${product.id}-${selectedSize || 'default'}-${selectedColor || 'default'}`;
      
      const existing = state.items.find(item => 
        item.id === product.id && 
        item.selectedSize === selectedSize && 
        item.selectedColor === selectedColor
      );
      
      if (existing) {
        existing.quantity += quantity;
      } else {
        state.items.push({ 
          ...product, 
          quantity, 
          selectedSize, 
          selectedColor,
          itemKey 
        });
      }
    },
    removeFromCart: (state, action) => {
      const { id, selectedSize, selectedColor } = action.payload;
      state.items = state.items.filter(item => 
        !(item.id === id && 
          item.selectedSize === selectedSize && 
          item.selectedColor === selectedColor)
      );
    },
    updateQuantity: (state, action) => {
      const { id, quantity, selectedSize, selectedColor } = action.payload;
      const item = state.items.find(item => 
        item.id === id && 
        item.selectedSize === selectedSize && 
        item.selectedColor === selectedColor
      );
      if (item) {
        // تأكد من أن الكمية لا تقل عن 1
        item.quantity = Math.max(1, quantity);
      }
    },
    incrementQuantity: (state, action) => {
      const { id, selectedSize, selectedColor } = action.payload;
      const item = state.items.find(item => 
        item.id === id && 
        item.selectedSize === selectedSize && 
        item.selectedColor === selectedColor
      );
      if (item) {
        item.quantity += 1;
      }
    },
    decrementQuantity: (state, action) => {
      const { id, selectedSize, selectedColor } = action.payload;
      const item = state.items.find(item => 
        item.id === id && 
        item.selectedSize === selectedSize && 
        item.selectedColor === selectedColor
      );
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
    setShippingMethod: (state, action) => {
      state.shippingMethod = action.payload;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  incrementQuantity,
  decrementQuantity,
  clearCart,
  setShippingMethod
} = cartSlice.actions;

export default cartSlice.reducer;