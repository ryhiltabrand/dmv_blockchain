// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

contract ServiceInfo {

    // In units of wei
    uint256 price;
    uint public infoCount = 0;
    uint num_services;
    address payable public customer;
    mapping(uint => Information) public information;
    mapping(uint => Vital) public vital;

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
        uint times_ordered;
    }

    struct Information {
        uint Id;
        string name;
        string dob;
        string registration;
        string streetAddress;
        string license;
        string vehicles;
        string title;
        address payable person;
    }

    struct Vital {
        uint Id;
        string vhash;
        string birthCertificate;
        string deathCertificate;
        string marriageCertificate;
        string divorceCertificate;
        address payable person; 
    }


    //
    event InformationAdded(
        uint Id,
        string name,
        string dob,
        string registration,
        string streetAddress,
        string license,
        string vehicles,
        string title,
        address payable person
    );

    event VitalAdded(
        uint Id,
        string vhash,
        string birthCertificate,
        string deathCertificate,
        string marriageCertificate,
        string divorceCertificate,
        address payable person
    );

    function uploadInformation(string memory _name, string memory _dob, string memory _registration, string memory _streetAddress, string memory _license, string memory _vehicles,string memory _title) public{
        require(bytes(_name).length > 0);
        require(bytes(_dob).length > 0);
        require(bytes(_registration).length > 0);
        require(bytes(_streetAddress).length > 0);
        require(bytes(_license).length > 0);
        require(bytes(_title).length > 0);
        require(msg.sender != address(0));

        //string memory _birthCertificat, string memory _deathCertificate, string memory _marriageCertificate, string memory _divorceCertificate
        //string[2] memory Death = ['QmVUjJsi7cx1a4dAeGZQ6PMtTMjXmMr3TxvdZYbhZTB1sG',''];
        infoCount ++;
        information[infoCount] = Information(infoCount,_name, _dob, _registration,_streetAddress, _license, _vehicles, _title,payable(msg.sender));

        emit InformationAdded(infoCount,_name, _dob, _registration,_streetAddress, _license, _vehicles, _title, payable(msg.sender));
    }
    function uploadVital(string memory _vhash,  string memory _deathCertificate, string memory _marriageCertificate, string memory _divorceCertificate) public{
        require(bytes(_vhash).length > 0);

        require(msg.sender != address(0));

        //string memory _birthCertificat, string memory _deathCertificate, string memory _marriageCertificate, string memory _divorceCertificate
        //string[2] memory Death = ['QmVUjJsi7cx1a4dAeGZQ6PMtTMjXmMr3TxvdZYbhZTB1sG',''];
        vital[infoCount] = Vital(infoCount,_vhash,'QmNWRgSuJD3ggytUXdBQ4eNYq4iXvXHDJZWqJdGmvQ9yeJ', _deathCertificate, _marriageCertificate, _divorceCertificate ,payable(msg.sender));

        emit VitalAdded(infoCount,_vhash,'QmNWRgSuJD3ggytUXdBQ4eNYq4iXvXHDJZWqJdGmvQ9yeJ', _deathCertificate, _marriageCertificate, _divorceCertificate ,payable(msg.sender));
    }

    struct Orders {

        uint256 wallet_bal;
        uint order_count;
    }

    // Maps services to IDs (i.e. 1 => "Permit test")
    mapping(uint => Services) public services;
    mapping(address => Orders) public orders;

    function add_service(string memory _name) private {

        num_services++;
        services[num_services] = Services(num_services, _name, price, 0);
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

        orders[customer].order_count = _count;
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
