import React, { useEffect } from "react";
import MyStack from "./src/navigation/index";
import { Provider } from "react-redux";
import store from "./src/store/index";
import userAPi from "./src/api/userApi";
const App = () => {
  useEffect(() => {
    const signIn = async () => {
      try {
        const res = await userAPi.signIn({
          user_name: "lyquochai",
          password: "123456789",
          role: "owner",
        });
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    };
    signIn();
  }, []);
  return (
    <Provider store={store}>
      <MyStack />
    </Provider>
  );
};

export default App;
