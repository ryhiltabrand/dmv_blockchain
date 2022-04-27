// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

contract Service {

    // In units of wei
    uint256 price;

    uint num_services;
    address payable public customer;

    constructor() {

        price = 100000000000;   // 100,000,000,000 Wei (100 Gwei)
        num_services = 0;

        // Online Services
        add_service("Vehicle Registration Renewal");
        add_service("Address Change");
        add_service("Driver's License Renewal");
        add_service("Update Vehicle Ownership");

        // Driver / ID services
        add_service("Practice Exams");
        add_service("Real ID");
        add_service("Apply for a Driver's License");
        add_service("Medical Information");

        // Vehicle services
        add_service("Sell / Donate a Vehicle");
        add_service("Title a Vehicle in Virginia");
    }


    struct Services {

        uint id;
        string name;
        uint256 cost;
    }


    struct Orders {

        uint256 wallet_bal;
        uint service_count;
    }

    // Maps services to IDs (i.e. 1 => "Permit test")
    mapping(uint => Services) public services;
    mapping(address => Orders) public orders;

    function add_service(string memory _name) private {

        num_services++;
        services[num_services] = Services(num_services, _name, price);
    }


    function get_price() public view returns (uint256) {

        return price;
    }


    function set_price(uint256 _price) public {

        price = _price;
        set_service_cost();
    }


    function set_service_cost() private {

        for (uint i = 0; i < num_services; i++) {

            services[i].cost = price;
        }
    }


    // Function allows for the customer to deposit funds into the contract
    function deposit() public payable returns (uint256, uint256) {

        require(
            msg.value >= price,
            "Error: Insufficient funds deposited. Please check the cost of the service"
        );

        customer = payable(msg.sender);
        orders[customer].wallet_bal += msg.value;

        return (address(this).balance, orders[customer].wallet_bal);
    }


    // User payment
    function make_payment(uint256 _total_cost) private {

        orders[customer].wallet_bal -= _total_cost;
    }


    function customer_selection(uint _serviceID, uint _count) public payable returns (bool) {

        customer = payable(msg.sender);
        uint256 total_cost = _count * services[_serviceID].cost;

        // Ensure the customer can afford to make the purchase
        require(
            orders[customer].wallet_bal >= total_cost,
            "Error: Insufficient funds. Please check the cost of the service"
        );

        require(
            (_serviceID > 0 && _serviceID < num_services),
            "Error: Invalid selection"
        );

        orders[customer].service_count = _count;
        make_payment(total_cost);

        return true;
    }


    function return_overpay() public payable {

        customer = payable(msg.sender);

        require(
            orders[customer].wallet_bal > 0,
            "Error: No funds to return"
        );

        customer.transfer(orders[customer].wallet_bal);
        orders[customer].wallet_bal = 0;
    }
}
