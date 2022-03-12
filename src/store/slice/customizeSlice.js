// import colors from "../../assets/scss/_themes-vars.module.scss";
// import { pink, blue, grey } from "@material-ui/core/colors";
import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  fontFamily: `'Roboto', sans-serif`,
  borderRadius: 12,
  mode: "Light",
  menu:"1",
  themeBackground: "#ffffff",
  themeText: "#212121",
  themeGreyText: "#616161",
  primaryColor: "cyan",
  secondaryColor: "pink",
  colorLevel: 50,
  isSidebarOpen: null,
  // itemMenuOpen:  sessionStorage.getItem("BKRMopening") ? sessionStorage.getItem("BKRMopening"):-1 ,
};

const customizeSlice = createSlice({
  name: "customize",
  initialState: initialState,
  reducers: {
    setFontFamily(state, action) {
      state.fontFamily = action.payload;
    },
    setMenu(state, action) {
      state.menu = action.payload;
    },
    setBorderRadius(state, action) {
      state.borderRadius = action.payload;
    },
    setMode(state, action) {
      if (action.payload === "Light") {
        state.mode = action.payload;
        state.themeBackground = "#fafafa";
        state.themeText = "#212121";
        state.themeGreyText = "#616161";
        state.primaryColor = "cyan";
        state.colorLevel = 50;
      } else {
        state.mode = action.payload;
        state.themeBackground = "#2d2d2d";
        state.themeText ="#fafafa";
        state.themeGreyText = "#fafafa";
        state.primaryColor = "grey";
        state.colorLevel = 700;
      }
    },
    setPrimaryColor(state, action) {
      state.primaryColor = action.payload;
    },
    setSecondaryColor(state, action) {
      state.secondaryColor = action.payload;
    },
    setColorLevel(state, action) {
      if (action.payload === 0) {
        state.colorLevel = 50;
      } else {
        state.colorLevel = action.payload;
      }
    },
    setState(state, action) {
      state = action.payload;
    },
    setSidebarOpen(state, action) {
      state.isSidebarOpen = action.payload;
    },
    setItemMenuOpen(state, action) {
      state.itemMenuOpen = action.payload;
    },
  },
});
export default customizeSlice;
export const customizeAction = customizeSlice.actions;
