import "./App.css";
import { Routes, Route } from "react-router-dom";
import React, { Component } from "react";
import OurNavbar from "./components/navbar/Navbar";

import Web3 from "web3";

import Services from './eth/contracts/ServiceInfo.json'
import User from './eth/contracts/User.json'
import Redeem from './eth/contracts/Redeem.json'
import Account from './components/Account/Account'
import PracticeTest from './components/PracticeTest/PracticeTest';

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
    <div style={{ width: '50%', height: '50%', margin: '0 auto', textAlign: 'center', padding: '250px' }}>
      <div style={{ background: 'white', borderRadius: '10px', padding: '10px' }}>
        <h1>Welcome to the DMV!</h1>
        <p>
          Ensure the <a href={'https://trufflesuite.com/ganache/'} target={'_blank'}>Ganache</a> server is running
          <br></br>
          and
          <br></br>
          it has been connected to <a href={'https://metamask.io/'} target={'_blank'}>Metamask</a>
        </p>
      </div>
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
      redeem: null,
      web3: null,
      info: []
    };
  }

  async componentDidMount() {

    let provider = window.ethereum;


    if (typeof provider !== 'undefined') {
      provider.request({ method: 'eth_requestAccounts' }).then((accounts) => {
        this.setState({ account: accounts[0], isLoaded: true })
        //console.log(this.state)
      }).catch((err) => {
        console.log(err);
      });

      window.ethereum.on('accountsChanged', (accounts) => window.location.reload())
    }

    const web3 = new Web3(provider)
    this.setState({ web3: web3 })
    const networkId = await web3.eth.net.getId();

    let serviceContract
    let userContract
    let redeemContract
    serviceContract = new web3.eth.Contract(Services.abi, Services.networks[networkId].address)
    this.setState({ services: serviceContract })
    userContract = new web3.eth.Contract(User.abi, User.networks[networkId].address)
    this.setState({ user: userContract })
    redeemContract = new web3.eth.Contract(Redeem.abi, Redeem.networks[networkId].address)
    this.setState({ redeem: redeemContract })

    const infoCount = await serviceContract.methods.infoCount().call()
    //console.log(infoCount)
    this.setState({ infoCount: infoCount })
    for (var i = 1; i <= infoCount; i++) {
      const info = await serviceContract.methods.information(i).call()
      this.setState({ info: [...this.state.info, info] })
    }
  }


  render() {

    return (
      <div>

        <div>
          <OurNavbar />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/account" element={<Account account={this.state.account} services={this.state.services} user={this.state.user} web3={this.state.web3} info={this.state.info}/>}  />
            <Route exact path="/PracticeTest" element={<PracticeTest account={this.state.account} services={this.state.services} user={this.state.user} web3={this.state.web3}/>}  />
            <Route path="/test" element={<Test />} />
          </Routes>
        </div>

      </div>
    );
  }
}

export default App;
