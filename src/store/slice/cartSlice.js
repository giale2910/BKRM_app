import { createSlice } from "@reduxjs/toolkit";
const initialCartSlice = {
    importCart:[
      {
        supplier: null,
        cartItem: [],
        total_amount: "0",
        paid_amount: "0",
        discount: "0",
        payment_method: "cash",
      },
    ]
 
};
const cartSlice = createSlice({
  name: "info",
  initialState: initialCartSlice,
  reducers: {
    setImportCart(state, action) {
      state.importCart = action.payload;
    },
    
  },
});
export default cartSlice;
export const cartActions = cartSlice.actions;
