// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

contract WebService {

    address payable public customer;
    uint public index = 0;

    struct Service {

        uint id;
        string account;
        address payable wallet;
    }


    event ViewVital(

        uint id,
        string account,
        address payable wallet
    );

    mapping(uint => Service) public service;


    function view_vital(string memory _account) public payable {

        customer = payable(msg.sender);

        index++;

        service[index] = Service(index, _account, customer);
        emit ViewVital(index, _account, customer);

        customer.transfer(msg.value);
    }
}
