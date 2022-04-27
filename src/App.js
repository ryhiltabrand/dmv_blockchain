import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import React, { Component, useEffect } from "react";
import OurNavbar from "./components/Navbar";
import ShoppingList from "./components/dmv/test";
import Web3 from "web3";
import { render } from "@testing-library/react";

//import [contract] from 'eth/contracts/[json]';


class Account extends Component {
  constructor(props) {
    super(props);

    this.state = {
      account: this.props.account

    };
  }

  componentWillReceiveProps(props) {
    this.setState({ account: props.account });
  }

  render() {
    
    return (
      <div>
        {this.state.account}
      </div>
    )
  }
}

function Test() {
  return (
    <div>
      Hi
    </div>
  )
}
function Home() {
  return (
    <div>
      Home
    </div>
  )
}

class App extends Component {
  constructor(props) {
    super(props);
    const web3 = new Web3('http://localhost:7545');
    this.state = {
      account: "loading",
      isLoaded: false
    };
  }

  componentDidMount() {

    let provider = window.ethereum;

    if (typeof provider !== 'undefined') {
      provider.request({ method: 'eth_requestAccounts' }).then((accounts) => {
        this.setState({ account: accounts[0], isLoaded: true})
        console.log(this.state)
      }).catch((err) => {
        console.log(err);
      });

      window.ethereum.on('accountsChanged', (accounts) => window.location.reload() )


      const web3 = new Web3(provider)
    }
  }


  render() {
    
    return (
      <div>
        <div>
          <OurNavbar />
          <Routes>
            <Route exact path="/home" element={<Home />} />
            <Route exact path="/account" element={<Account account={this.state.account} />} />
            <Route path="/test" element={<Test />} />
          </Routes>
        </div>
        
      </div>
    );
  }
}

export default App;
