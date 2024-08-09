import React, { useState } from "react";
import "./App.css";
import SearchBar from "./components/SearchbBar";
import SearchResults from "./components/SearchResults";

const App: React.FC = () => {
  const [results, setResults] = useState<any[]>([]);

  return (
    <div className="App">
      <h1>Price Comparison Tool</h1>
      <SearchBar setResults={setResults} />;
      <SearchResults results={results} />
    </div>
  );
};

export default App;
