import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./app/pages/Home";
import Error from "./app/pages/Error";
import Nav from "./app/components/Nav";
import Footer from "./app/components/Footer";
import Login from "./app/pages/Login";
import Profile from "./app/pages/Profile";

function App() {
  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route
          path="/*"
          element={
            <Error
              title={"Erreur 404"}
              content={"La page que vous recherchez est introuvable..."}
            />
          }
        />
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
