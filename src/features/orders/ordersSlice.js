import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    addOrder: (state, action) => {
      state.items.unshift(action.payload);
      console.log(`action.payload:`, action.payload);
    },
    clearOrders: (state) => {
      state.items = [];
    },
    cancelOrder: (state, action) => {
      const orderId = action.payload;
      const order = state.items.find((o) => o.id === orderId);

      if (order && order.status === 'processing') {
        order.status = 'canceled';
      }
    }
  }
});

export const { addOrder, clearOrders, cancelOrder } = ordersSlice.actions;
export default ordersSlice.reducer;
