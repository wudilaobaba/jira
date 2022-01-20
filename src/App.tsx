import React from "react";
import "./App.css";
import { AuthenticatedApp } from "./authenticated-app";
import { UnauthenticatedApp } from "unauthenticated-app";
import { useAuth } from "./context/auth-context";

function App() {
  const { user } = useAuth();
  return !user ? <UnauthenticatedApp /> : <AuthenticatedApp />;
}

export default App;
