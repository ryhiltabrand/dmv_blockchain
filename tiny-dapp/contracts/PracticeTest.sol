// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

contract Practice_Test {

    address payable public customer;
    uint public index = 0;

    // In units of wei
    uint256 price;

    constructor() {

        price = 100000000000;   // 100,000,000,000 Wei (100 Gwei)
    }


    struct Submission {

        uint id;
        string account;
        uint score;
        address payable wallet;
    }


    event NewSubmission(

        uint id,
        string account,
        uint score,
        address payable wallet
    );

    mapping(uint => Submission) public submission;


    function upload_score(string memory _account, uint _score) public payable {

        require(msg.sender != address(0));

        index++;

        submission[index] = Submission(index, _account, _score, payable(msg.sender));
        emit NewSubmission(index, _account, _score, payable(msg.sender));
    }
}
