import { configureStore } from '@reduxjs/toolkit'
import observerComputer from './ObserverComputer'
import observeCart from './observeCart'
export const store = configureStore({
  reducer: {
    action : observerComputer,
    cart : observeCart
  }
})