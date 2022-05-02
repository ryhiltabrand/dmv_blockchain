// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;
contract Ownable {
    //address private owner;
    address payable owner;
    uint256 totalDonations;

    constructor() {
        owner = payable(msg.sender);
    }

    function getTotalDonations() public view returns (uint256) {
        return totalDonations;
    }

    function donate() public payable {
        (bool success, ) = owner.call{value: msg.value}("");
        require(success, "Failed to send money");
    }

    function rowner() public view returns (address) {
        return owner;
    }

    /*function transferOwnership(address _newOwner) public onlyOwner {
        owner = _newOwner;
    }*/
}

contract ServiceInfo is Ownable {
    // In units of wei
    address[] peeps;
    uint256 price;
    uint256 public infoCount = 0;
    uint256 num_services;
    address payable public customer;
    mapping(address => Information) public information;
    mapping(address => Vital) public vital;
    mapping(address => License) public license;
    mapping(address => Address) public streetAddress;



    struct Information {
        address person;
        string name;
        string dob;
    }

    struct Address {
        address person;
        string street;
        string state;
        string zipcode;
    }

    struct License {
        address person;
        string customerIDNum;
        string experationDate;
    }

    struct Vital {
        string birthCertificate;
        string deathCertificate;
        string marriageCertificate;
        string divorceCertificate;
        address person;
    }

    //
    event InformationAdded(address person, string name, string dob);

    event AddressAdded(
        address payable person,
        string street,
        string state,
        string zipcode
    );

    event VitalAdded(
        string birthCertificate,
        string deathCertificate,
        string marriageCertificate,
        string divorceCertificate,
        address person
    );

    function stringsEquals(string memory s1, string memory s2)
        private
        pure
        returns (bool)
    {
        bytes memory b1 = bytes(s1);
        bytes memory b2 = bytes(s2);
        uint256 l1 = b1.length;
        if (l1 != b2.length) return false;
        for (uint256 i = 0; i < l1; i++) {
            if (b1[i] != b2[i]) return false;
        }
        return true;
    }

    function uploadInformation(string memory _name, string memory _dob, string memory street, string memory state, string memory zip) public {
        require(bytes(_name).length > 0);
        require(bytes(_dob).length > 0);
        require(msg.sender != address(0));
        //require(!stringsEquals(information[msg.sender].name, "none"));
        //peeps.push(msg.sender);
        information[msg.sender] = Information(msg.sender, _name, _dob);
        streetAddress[msg.sender] = Address(msg.sender, street, state, zip);
        emit InformationAdded(payable(msg.sender), _name, _dob);
    }

    function isOwner() public view returns (bool) {
        
        return msg.sender == information[msg.sender].person;
    }

    modifier onlyOwner() {
        require(isOwner(), "Function accessible only by the owner !!");
        _;
    }

    function uploadVital(
        string memory _deathCertificate,
        string memory _marriageCertificate,
        string memory _divorceCertificate,
        string memory _license,
        string memory _exp
    ) public {

        require(msg.sender != address(0));
        
        vital[msg.sender] = Vital(
            "QmNWRgSuJD3ggytUXdBQ4eNYq4iXvXHDJZWqJdGmvQ9yeJ",
            _deathCertificate,
            _marriageCertificate,
            _divorceCertificate,
            payable(msg.sender)
        );

        license[msg.sender] = License(msg.sender, _license, _exp);

        emit VitalAdded(
            "QmNWRgSuJD3ggytUXdBQ4eNYq4iXvXHDJZWqJdGmvQ9yeJ",
            _deathCertificate,
            _marriageCertificate,
            _divorceCertificate,
            payable(msg.sender)
        );
    }

    function updateLicense(string memory number, string memory date) public onlyOwner{
        license[msg.sender]=License(msg.sender, number, date);
    }
    function updateAddress(string memory street, string memory state, string memory zip) public onlyOwner{
        streetAddress[msg.sender]=Address(msg.sender, street, state, zip);
    }

    function getInfo(address id) public view returns(string memory, string memory){
        return(information[id].name, information[id].dob);
    }
    function getVital(address id) public view returns(string memory, string memory, string memory, string memory){
        
        return(vital[id].birthCertificate, vital[id].deathCertificate, vital[id].marriageCertificate, vital[id].divorceCertificate);
    }
    function pay() public payable {
        require(msg.value == .03 ether);
        totalDonations += msg.value;
    }
    function getLicense(address id) public view returns(string memory, string memory){
        return(license[id].customerIDNum, license[id].experationDate);
    }
    function getAddress(address id) public view returns(string memory, string memory, string memory){
        return(streetAddress[id].street, streetAddress[id].state, streetAddress[id].zipcode);
    }
}

