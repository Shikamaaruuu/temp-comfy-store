import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { ProductsProvider } from "./context/products_context";
import { FilterProvider } from "./context/filter_context";
import { CartProvider } from "./context/cart_context";
import { UserProvider } from "./context/user_context";
import { Auth0Provider } from "@auth0/auth0-react";
import { Cart } from "./pages";

// dev - vpoh9ekg.us.auth0.com
// ssJdSvD11ycUo7pJEN8mDPw6vsJ869Eq

if (module.hot) {
  module.hot.accept();
}
ReactDOM.render(
  <Auth0Provider
    domain="dev-vpoh9ekg.us.auth0.com"
    clientId="ssJdSvD11ycUo7pJEN8mDPw6vsJ869Eq"
    redirectUri={window.location.origin}
    cacheLocation="localstorage"
  >
    <UserProvider>
    <ProductsProvider>
      <FilterProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </FilterProvider>
    </ProductsProvider>
    </UserProvider>
  </Auth0Provider>,
  document.getElementById("root")
);
