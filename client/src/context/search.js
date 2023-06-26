import { useState, createContext, useContext } from "react";

// Creating a context for the search functionality
const SearchContext = createContext();

// Creating a provider component that manages the state of the search functionality
const SearchProvider = ({ children }) => {
  // Using the useState hook to create state variables and a function to update them
  const [values, setValues] = useState({
    keyword: "", // Stores the search keyword
    results: [], // Stores the search results
  });

  // Rendering the provider component and passing the state and update function as the context value
  return (
    <SearchContext.Provider value={[values, setValues]}>
      {children}
    </SearchContext.Provider>
  );
};

// Custom hook that allows accessing the search context values and update function
const useSearch = () => useContext(SearchContext);

// Exporting the custom hook and the provider component
export { useSearch, SearchProvider };
