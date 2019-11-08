import React from "react";
import Header from "./components/Header.jsx";
import Router from "./router.jsx";

import "./App.css";

function App() {
  return (
    <div className="container">
      <Header />
      <Router />
    </div>
  );
}

export default App;
