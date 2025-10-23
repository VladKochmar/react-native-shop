import { Product } from '@/types/Product';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartItem extends Product {
  quantity: number;
}

interface CartStoreState {
  products: CartItem[];
}

const initialState: CartStoreState = {
  products: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const existing = state.products.find(prod => prod.id === action.payload.id);

      if (existing) existing.quantity += 1;
      else state.products.push({ ...action.payload, quantity: 1 });
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      const existing = state.products.find(prod => prod.id === action.payload);

      if (!existing) return;
      if (existing.quantity > 1) existing.quantity -= 1;
      else state.products = state.products.filter(product => product.id !== action.payload);
    },

    clearCart: state => {
      state.products = [];
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
