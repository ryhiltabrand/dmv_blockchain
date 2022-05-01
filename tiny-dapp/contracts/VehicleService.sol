// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

contract Ownable {
    address private owner;

    constructor() {
        owner = msg.sender;
    }

    function rowner() public view returns (address) {
        return owner;
    }

    modifier onlyOwner() {
        require(isOwner(), "Function accessible only by the owner !!");
        _;
    }

    function isOwner() public view returns (bool) {
        return msg.sender == owner;
    }

    function transferOwnership(address _newOwner) public onlyOwner {
        owner = _newOwner;
    }
}

contract VehicleServices is Ownable {
    bytes32[] vins;
    mapping(bytes32 => Vehicle) vehicleMap;

    event NewVehicle(bytes32 _vin, string vowner);

    struct Vehicle {
        bytes32 vin;
        string year;
        string model;
        string make;
        string vehicleOwner;
        int8 registrationStatus; //0 not registered, 1 registered...
        string registrationYear;
        int8 status; //  0 not exist, 1 created, 2 transferred...
    }

    function TitleVehicle(
        bytes32 _vin,
        string memory _year,
        string memory _model,
        string memory _make,
        string memory _vonwer
    ) public {
        require(!isVehicle(_vin), "Not your vehicle");
        vins.push(_vin);
        vehicleMap[_vin] = Vehicle(
            _vin,
            _year,
            _model,
            _make,
            _vonwer,
            0,
            "0000",
            1
        );
    }

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

    function RegisterVehicle(bytes32 _vin, string memory _regYear)
        public
        onlyOwner
    {
        //require(isVehicle(_vin));
        Vehicle storage vehicle = vehicleMap[_vin];
        string memory curr = vehicleMap[_vin].registrationYear;
        //require(!isVehicle(_vin));
        if (stringsEquals(curr, _regYear)) {
            vehicle.registrationYear = _regYear;
            vehicle.registrationStatus = 1;
        }
    }

    function isVehicle(bytes32 _id) public view returns (bool) {
        if (vehicleMap[_id].status != 0) {
            return true;
        }
        return false;
    }

    function transferVehicle(bytes32 _vin, address _voner)
        public
        onlyOwner
        returns (string memory)
    {
        require(isVehicle(_vin));
        transferOwnership(_voner);
    }

    function getVehicleOnwer(bytes32 _id) public view returns (string memory) {
        require(isVehicle(_id));
        string storage name = vehicleMap[_id].vehicleOwner;
        return name;
    }

    function returnVins(bytes32 _vin)
        public
        view
        returns (
            address,
            bytes32,
            string memory,
            string memory,
            string memory,
            string memory
        )
    {
        require(isVehicle(_vin));
        //vehicle memory u = Vehicle[uuid];

        //return (u.vin, u.vehicleOwner, u.year, u.make, u.model, u.registrationStatus, u.registrationYear);
        return (
            rowner(),
            vehicleMap[_vin].vin,
            vehicleMap[_vin].year,
            vehicleMap[_vin].make,
            vehicleMap[_vin].model,
            vehicleMap[_vin].registrationYear
        );
        //return (vin, name, year, make, model, registrationStatus, registrationYear);
    }
}

/*contract VehicleServices {
    address private owner;
    bytes32[] vins;
    mapping(bytes32 => Vehicle) vehicleMap;


    event NewVehicle(bytes32 _vin, string vowner);

    struct Vehicle {
        bytes32 vin;
        string year;
        string model;
        string make;
        string vehicleOwner;
        int8 registrationStatus; //0 not registered, 1 registered...
        string registrationYear;
        int8 status; //  0 not exist, 1 created, 2 transferred...
    }

    modifier isOwner(address sender) {
        if (owner != sender) {
            revert();
        } else {
            _;
        }
    }

    function TitleVehicle(
        bytes32 _vin,
        string memory _year,
        string memory _model,
        string memory _make,
        string memory _vonwer
    ) public {
        require(!isVehicle(_vin), "Not your vehicle");
        vins.push(_vin);
        vehicleMap[_vin] = Vehicle(
            _vin,
            _year,
            _model,
            _make,
            _vonwer,
            0,
            "0000",
            1
        );
    }

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

    function RegisterVehicle(bytes32 _vin, string memory _regYear)
        public
        isOwner(msg.sender)
    {
        //require(isVehicle(_vin));
        string memory curr = vehicleMap[_vin].registrationYear;
        if (stringsEquals(curr, _regYear)) {
            vehicleMap[_vin].registrationYear = _regYear;
            vehicleMap[_vin].registrationStatus = 1;
        }
    }

    function isVehicle(bytes32 _id) public view returns (bool) {
        if (vehicleMap[_id].status != 0) {
            return true;
        }
        return false;
    }

    function transferVehicle(bytes32 _vin, string memory _voner)
        public
        isOwner(msg.sender)
        returns (string memory)
    {
        require(isVehicle(_vin));
        vehicleMap[_vin].vehicleOwner = _voner;
        vehicleMap[_vin].status = 2;
    }

    function getVehicleOnwer(bytes32 _id) public view returns (string memory) {
        require(isVehicle(_id));
        string storage name = vehicleMap[_id].vehicleOwner;
        return name;
    }

    function returnVins(bytes32 _vin)
        public
        view
        returns (
            bytes32,
            string memory,
            string memory,
            string memory,
            string memory
        )
    {
        require(isVehicle(_vin));
        //vehicle memory u = Vehicle[uuid];


        //return (u.vin, u.vehicleOwner, u.year, u.make, u.model, u.registrationStatus, u.registrationYear);
        return (
            vehicleMap[_vin].vin,
            vehicleMap[_vin].year,
            vehicleMap[_vin].make,
            vehicleMap[_vin].model,
            vehicleMap[_vin].registrationYear
        );
        //return (vin, name, year, make, model, registrationStatus, registrationYear);
    }
}*/
