import React, { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Cards from "./components/Cards";

function App() {
  const [search, setSearch] = useState("");

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  return (
    <div className="App bg-slate-100">
      <Header onSearchChange={handleSearchChange} />
      <Cards search={search} />
    </div>
  );
}

export default App;
