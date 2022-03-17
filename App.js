import React, { useEffect } from "react";
import MyStack from "./src/navigation/index";
import { Provider } from "react-redux";
import store from "./src/store/index";
import userAPi from "./src/api/userApi";


const App = () => {
  
  return (
    <Provider store={store}>
      <MyStack />
    </Provider>
  );
};

export default App;
