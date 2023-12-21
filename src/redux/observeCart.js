import { createSlice } from '@reduxjs/toolkit';

export const observeCart = createSlice({
  name: 'cart',
  initialState: {
    cartSummary: [],
    showAlert: false,
    message: '',
    sayac:0,
  },
  reducers: {
    addProduct: (state, action) => {
      const { payload } = action;
      const existingProduct = state.cartSummary.find(product => product.category === payload.category);

      if (!existingProduct) {
        state.cartSummary.push(payload);
        state.showAlert = true;
        state.message = "Ürün ekleme başarılı";
        state.sayac +=1
        
      } else {
        state.showAlert = true;
        state.message = "Aynı üründen ekleyemezsiniz";
        
      }
    },
    removeProduct: (state, action) => {
      const { payload: itemId } = action;
      state.cartSummary = state.cartSummary.filter(item => item.id !== itemId);
      state.showAlert = true;
      state.message = "Ürün silme başarılı";
      if(state.sayac>0){
        state.sayac -=1
      }
    },
    hideAlert: (state) => {
      state.showAlert = false;
      state.message = '';
    },
  },
});

export const { addProduct, removeProduct, hideAlert,sayac } = observeCart.actions;

export default observeCart.reducer;