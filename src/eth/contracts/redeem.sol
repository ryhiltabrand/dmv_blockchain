// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

contract Redeem {

    address public customer;

    struct NumOrders {

        uint service_count;
    }

    mapping(address => NumOrders) public redeemable_orders;
    mapping(address => NumOrders) public orders_to_date;

    // Allows us to know if the service contract was connected
    bool contract_connected = false;
    ExternalServices service_contract;

    // May want to change to public later
    function determine_redeemable() private {

        require(
            contract_connected,
            "Error: The service contract must be connected first"
        );

        customer = msg.sender;
        
    }


    function connect_service_contract(address _address) public {

        service_contract = ExternalServices(_address);
        contract_connected = true;

        // TODO find redeemable
    }


    function read_orders() private returns (uint256 wallet, uint count) {

        require(
            contract_connected,
            "Error: The service contract must be connected first"
        );

        customer = msg.sender;
        return (service_contract.orders(customer));
    }
}

contract ExternalServices {

    // Same as in services.sol; allows us to link files
    // Used to track msg.sender's balance
    struct Orders {

        uint256 wallet_bal;
        uint service_count;
    }

    mapping(address => Orders) public orders;
}
