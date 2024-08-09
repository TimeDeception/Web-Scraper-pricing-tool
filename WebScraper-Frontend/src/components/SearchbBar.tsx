import React, { useState } from "react";
import axios from "axios";

interface Props {
  setResults: (Results: any[]) => void;
}

const SearchBar: React.FC<Props> = ({ setResults }) => {
  const [Query, setQuery] = useState("");

  const handleSearch = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/search", {
        Query,
      });
      setResults(response.data);
    } catch (error) {
      console.error("Error fetching search results", error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={Query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for a product"
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;
