import React from "react";

interface Props {
  results: any[];
}

const SearchResults: React.FC<Props> = ({ results }) => {
  return (
    <div>
      {results.map((result, index) => (
        <div key={index}>
          <h3>{result.title}</h3>
          <p>{result.price}</p>
          <a href={result.link} target="_blank" rel="noopener noreferrer"></a>
        </div>
      ))}
    </div>
  );
};

export default SearchResults;
