import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import React, { Component } from "react";
import OurNavbar from "./components/Navbar";
import ShoppingList from "./components/dmv/test";

class Home extends Component {
  render(){
    return(
      <div>
        <h>Home</h>
      </div>
    )
  }
}

class App extends Component {
  render() {
    

    return (
      <div>
        <OurNavbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/test" element={<ShoppingList />} />
        </Routes>
      </div>
    );
  }
}

export default App;
