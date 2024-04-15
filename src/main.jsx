import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import GlobalStyle from "./infrastructure/style/globalstyle.js";
import { Provider } from 'react-redux';
import { store} from './store/store.js';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
  <Provider store={store}>
    <BrowserRouter>
        <App />
      </BrowserRouter>
      <GlobalStyle />
  </Provider>
 
  </>
);
