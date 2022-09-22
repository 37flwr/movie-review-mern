import React, { createContext } from "react";

const SearchContext = createContext();

const SearchProvider = ({ children }) => {
  return <SearchContext.Provider>{children}</SearchContext.Provider>;
};

export default SearchProvider;
