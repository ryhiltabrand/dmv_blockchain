// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

contract User {

   // Private state variable
    address private owner;
  
    // Defining a constructor   
    constructor() public{   
        owner=msg.sender;
    }
  
    // Function to get 
    // address of owner
    function getOwner(
    ) public view returns (address) {    
        return owner;
    }
  
    // Function to return 
    // current balance of owner
    function getBalance(
    ) public view returns(uint256){
        return owner.balance;
    }
}
