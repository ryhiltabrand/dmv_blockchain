import "./App.css";
import { Routes, Route } from "react-router-dom";
import React, { Component } from "react";
import OurNavbar from "./components/navbar/Navbar";

import Web3 from "web3";

import Services from './eth/contracts/Service.json'
import User from './eth/contracts/User.json'
import Redeem from './eth/contracts/Redeem.json'

import Account from './components/Account/Account'

//import [contract] from 'eth/contracts/[json]';

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
      isLoaded: false,
      services: null,
      user: null,
      redeem: null
    };
  }

  async componentDidMount() {

    let provider = window.ethereum;
    

    if (typeof provider !== 'undefined') {
      provider.request({ method: 'eth_requestAccounts' }).then((accounts) => {
        this.setState({ account: accounts[0], isLoaded: true })
        console.log(this.state)
      }).catch((err) => {
        console.log(err);
      });

      window.ethereum.on('accountsChanged', (accounts) => window.location.reload())
    }

    const web3 = new Web3(provider)
    const networkId = await web3.eth.net.getId();
    
    let serviceContract
    let userContract
    let redeemContract
    serviceContract = new web3.eth.Contract(Services.abi, Services.networks[networkId].address)
    this.setState({services:serviceContract})
    userContract = new web3.eth.Contract(User.abi, User.networks[networkId].address)
    this.setState({user:serviceContract})
    redeemContract = new web3.eth.Contract(Redeem.abi, Redeem.networks[networkId].address)
    this.setState({redeem:redeemContract})
  }


  render() {

    return (
      <div>
        <div>
          <OurNavbar />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/account" element={<Account account={this.state.account} services={this.state.services} user={this.state.user}/>} />
            <Route path="/test" element={<Test />} />
          </Routes>
        </div>

      </div>
    );
  }
}

export default App;
