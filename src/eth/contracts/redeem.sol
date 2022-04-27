// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

contract Redeem {

    address public customer;


}

contract ExternalServices{

    // Same as in services.sol; allows us to link files
    // Used to track msg.sender's balance
    struct Orders {

        uint256 wallet_bal;
    }

    mapping(address => Orders) public orders;
}
