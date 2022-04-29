// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

contract PracticeTest {

    address private customer;
    uint public index = 0;

    mapping(uint => TestInfo) public submission;

    constructor() {

        customer = msg.sender;
    }


    struct TestInfo {

        uint id;
        string customer_name;
        uint score;
        address payable wallet;
    }

    event Submission (

        uint id,
        string customer_name,
        uint score,
        address payable wallet
    );


    function upload_score(string memory _name, uint _score) public {

        require(bytes(_name).length > 0);

        index++;

        submission[index] = TestInfo(index, _name, _score, payable(msg.sender));
        emit Submission(index, _name, _score, payable(msg.sender));
    }
}
