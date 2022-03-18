import { configureStore } from "@reduxjs/toolkit";
import cusomizeSlice from "./slice/customizeSlice";
import authSlice from "./slice/authSlice";
import loadingSlice from "./slice/loadingSlice";
import infoSlice from "./slice/infoSlice";
import statusSlice from "./slice/statusSlice";
import dataSlice from "./slice/dataSlice"
import cartSlice from "./slice/cartSlice"

const store = configureStore({
  reducer: {
    customize: cusomizeSlice.reducer,
    auth: authSlice.reducer,
    loading: loadingSlice.reducer,
    info: infoSlice.reducer,
    status:statusSlice.reducer,
    data:dataSlice.reducer,
    cart:cartSlice.reducer
  },
});
export default store;
