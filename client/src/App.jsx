import React, { createContext, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./components/Login";
import Dashboard from "./pages/Dashboard";
import SearchResults from "./components/SearchResult";
import Register from "./components/Register";
// import Nav from "./components/Nav";
import LandingPage from "./pages/LandingPage"


export const store = createContext();

const App = () => {
  const [token, setToken] = useState(null);
  return (
    <store.Provider value={[token, setToken]}>
      <BrowserRouter>
        {/* <Nav /> */}
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/landing" exact element={<LandingPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/search" element={<SearchResults />} />
        </Routes>
      </BrowserRouter>
    </store.Provider>
  );
};

export default App;
