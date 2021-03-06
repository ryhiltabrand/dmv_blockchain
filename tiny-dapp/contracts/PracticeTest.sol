// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

contract Practice_Test {

    address payable public customer;
    uint public index = 0;

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

        customer = payable(msg.sender);

        index++;

        submission[index] = Submission(index, _account, _score, customer);
        emit NewSubmission(index, _account, _score, customer);

        customer.transfer(msg.value);
    }
}
