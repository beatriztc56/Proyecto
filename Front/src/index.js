import React from "react";
import ReactDOM from "react-dom";

import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./store";
import "fontsource-roboto";
import { Context as ResponsiveContext } from "react-responsive";

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <ResponsiveContext.Provider value={{ width: 1000 }}>
        <App />
      </ResponsiveContext.Provider>
    </Provider>
  </Router>,
  document.getElementById("root")
);

reportWebVitals();
