# CS 764 Final Project - DMV Website

## Abstract

This project aims to emulate the services typically provided by the DMV. These sevices
include registering vehicles, renewing driver's licenses, and hosting practice exams.
Normally, these services would require a human agent; however, this project makes use
of blockchain technology, so authentication and transactions are able to take place
without these agents.

## Required Software

### Node.js

Node.js can be downloaded from [here](https://nodejs.org/en/).\
Further steps are provided below.

### Ganache

Ganache allows for developers to run a simulated blockchain to test their application.
The application also allows for developers to see what contracts are being called when
a transaction is made.

Ganache can be downloaded [here](https://trufflesuite.com/ganache/).

*Optional*: In settings, provide the **absolute path** to the `truffle-config.js` file
in this project to see more transaction details.

### Metamask

Metamask is an in-browser cryptocurrency wallet that can also be used to handle
transactions. It can be downloaded [here](https://metamask.io/).

**Important**: Connect Metamask with Ganache
- Create a new network within Metamask; ensure the `RPC URL` is the **same** as the one
  configured in Ganache
- Get the **private key** to one of the accounts created when you set up Ganache and
  import the account on Metamask

## Execution

### Compiling and Deploying Smart Contracts

`cd` into the `tiny-dapp` directory; this is where all the smart contracts are.\
Then, while ensuring **Ganache server is running**, run the following commands:

1. `truffle migrate --reset`
2. `truffle compile`

These commands allow for us to connect the smart contracts to Ganache, which is important
for when we go to make transactions.

### Deploying the Application

Clone this repository: `git clone https://github.com/ryhiltabrand/dmv_blockchain`

Then `cd` into the directory (`dmv_blockchain`) and run `npm install`.\
This will install the dependencies for this project, which are located in `package.json`.

Then in the main project directory, run `npm start` and a web application will appear
at the following address: [http://localhost:3000](http://localhost:3000)

**Make sure the Ganache server is running or you will not be able to connect Metamask to it**
