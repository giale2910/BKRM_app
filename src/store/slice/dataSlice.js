import { createSlice } from "@reduxjs/toolkit";
const initialDataSlice = {
    product:[]
 
};
const dataSlice = createSlice({
  name: "info",
  initialState: initialDataSlice,
  reducers: {
    setProduct(state, action) {
      state.product = action.payload;
    },
    
  },
});
export default dataSlice;
export const dataActions = dataSlice.actions;
