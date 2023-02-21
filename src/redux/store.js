import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './states/cart';

export default configureStore({
  reducer: {
    cart: cartReducer,
  },
});
