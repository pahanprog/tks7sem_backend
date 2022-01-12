import React from "react";
import ReactDOM from "react-dom";
import { MemoryRouter } from "react-router-dom";
import { createClient, Provider } from "urql";
import AuthProvider from "./context/Auth";
import HomeProvider from "./context/Home";
import Router from "./Router";
import "./styles/index.css";

let client: any;

try {
  client = createClient({
    url: "http://localhost:4040/graphql",
    fetchOptions: {
      credentials: "include",
    },
  });
} catch (e) {
  console.error(e);
}

function render() {
  ReactDOM.render(
    <Provider value={client}>
      <AuthProvider>
        <HomeProvider>
          <MemoryRouter>
            <Router />
          </MemoryRouter>
        </HomeProvider>
      </AuthProvider>
    </Provider>,
    document.getElementById("root")
  );
}

render();
