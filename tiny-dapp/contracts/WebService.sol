// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

contract WebService {

    address payable public customer;
    uint public index = 0;


    struct ViewVital {

        uint id;
        string account;
        address payable wallet;
    }


    event VitalViewed(

        uint id,
        string account,
        address payable wallet
    );


    struct RealID {

        uint id;
        string identifier;
        string name;
        string addr;
        uint issue_year;
        uint expire_year;
        string dob;

        address customer;
    }

    mapping(uint => ViewVital) public viewing;
    mapping(address => RealID) public real_id;


    function view_vital(string memory _account) public payable {

        customer = payable(msg.sender);

        index++;

        viewing[index] = ViewVital(index, _account, customer);
        emit VitalViewed(index, _account, customer);

        customer.transfer(msg.value);
    }

    function paycontract() public payable {
        require(msg.value <= 1 ether, "not enough");

    }

    function create_realID(string memory _name, string memory _identity,
                           string memory _addr, uint _issue, string memory _dob)
    public payable {

        require(_issue < 2023, "License has not expired!");

        index++;
        customer = payable(msg.sender);

        real_id[msg.sender] = RealID(index, _identity, _name, _addr,
                                     _issue, 2023, _dob, customer);

        customer.transfer(msg.value);
    }
}
