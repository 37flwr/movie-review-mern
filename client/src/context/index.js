import React from "react";
import AuthProvider from "./AuthProvider";
import NotificationProvider from "./NotificationProvider";
import SearchProvider from "./SearchProvider";
import ThemeProvider from "./ThemeProvider";

const ContextProviders = ({ children }) => {
  return (
    <NotificationProvider>
      <AuthProvider>
        <SearchProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </SearchProvider>
      </AuthProvider>
    </NotificationProvider>
  );
};

export default ContextProviders;
