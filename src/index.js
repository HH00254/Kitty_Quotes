//
//    Assignment 5
//    Name: Al Hochbaum
//    Date: 11/11/2023
//    Description: A bundle of cuteness!

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import AppHeader from "./AppHeader";
AppFooter;
import AppFooter from "./AppFooter";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <AppHeader />
    <App />
    <AppFooter />
  </StrictMode>
);
