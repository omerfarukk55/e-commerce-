import { createSlice } from '@reduxjs/toolkit'



export const observeComputer = createSlice({
  name: 'computer',

  initialState : {
    currentCategory : "",
    currentCategoryId : null,
    productId : null,
   
  },

  reducers: {
    setCategory : (state , action) =>{
      state.currentCategory = action.payload;
      state.currentCategoryId = action.payload.id;
    },
    setProductId  : (state , action) =>{
      state.productId = action.payload;
    },
    
  },
})

// Action creators are generated for each case reducer function
export const { setCategory , setProductId } = observeComputer.actions

export default observeComputer.reducer