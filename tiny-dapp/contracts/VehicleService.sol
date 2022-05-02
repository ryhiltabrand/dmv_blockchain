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
    mapping(bytes32 => Vehicle) public vehicleMap;

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
        address vowner;
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
            1,
            msg.sender
        );
    }

    modifier maponlyOwner(bytes32 _vin) {
        require(mapisOwner(_vin), "Function accessible only by the owner !!");
        _;
    }

    function mapisOwner(bytes32 _vin) public view returns (bool) {
        return msg.sender == vehicleMap[_vin].vowner;
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
        maponlyOwner(_vin)
    {
        //require(isVehicle(_vin));
        //Vehicle storage vehicle = vehicleMap[_vin];
        string memory curr = vehicleMap[_vin].registrationYear;
        //require(!isVehicle(_vin));
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
            vehicleMap[_vin].vowner,
            vehicleMap[_vin].vin,
            vehicleMap[_vin].year,
            vehicleMap[_vin].make,
            vehicleMap[_vin].model,
            vehicleMap[_vin].registrationYear
        );
        //return (vin, name, year, make, model, registrationStatus, registrationYear);
    }
    function getMap(bytes32 _vin) public view returns(address) {
        return(vehicleMap[_vin].vowner);
    }
}

contract VehicleOwner {
    
    mapping(bytes32 => Vowner) VehicleOwnerMap;

    struct Vowner {
        bytes32 vin;
        address owner;
    }

    function isOwner(bytes32 _vin, address testa) public view returns (bool) {
        
        return msg.sender == VehicleServices(testa).getMap(_vin);
    }
    modifier onlyOwner(bytes32 _vin, address testa) {
        require(isOwner(_vin, testa), "Function accessible only by the owner !!");
        _;
    }

    function OriginalOwner(bytes32 _vin, address testa) public onlyOwner(_vin, testa) {
       
        VehicleOwnerMap[_vin]=Vowner(_vin, msg.sender);
    }

    function changeOwner(bytes32 _vin) public {
        require(VehicleOwnerMap[_vin].owner == msg.sender);
        VehicleOwnerMap[_vin]=Vowner(_vin, msg.sender);
    }

    function getVowner(bytes32 _vin) public view returns(bytes32, address){
        return(
            VehicleOwnerMap[_vin].vin, VehicleOwnerMap[_vin].owner
        );
    }
    function test(address testa,bytes32 _vin) external view returns(address x){

        x =VehicleServices(testa).getMap(_vin);
        
    }
}
contract registrationService {
    
    mapping(bytes32 => Registration) registrationeMap;
    

    struct Registration {
        bytes32 vin;
        address vowner;
        string year;
    }

    function isOwner(bytes32 _vin, address testa) public view returns (bool) {
        
        return msg.sender == VehicleServices(testa).getMap(_vin);
    }
    modifier onlyOwner(bytes32 _vin, address testa) {
        require(isOwner(_vin, testa), "Function accessible only by the owner !!");
        _;
    }

    function registerCar(bytes32 _vin, string memory _year, address testa) public  onlyOwner(_vin, testa) {
       
        registrationeMap[_vin]=Registration(_vin, msg.sender,_year);
    }

    function getRegistration(bytes32 _vin) public view returns(bytes32, address, string memory){
        return(
            registrationeMap[_vin].vin, registrationeMap[_vin].vowner, registrationeMap[_vin].year
        );
    }
    function test(address testa,bytes32 _vin) external view returns(address x){
        //VehicleServices _v;
        //address testa = 0x3e196087A91318AdA8A5fE63E227400406eA8Fd9;
        x =VehicleServices(testa).getMap(_vin);
        
    }
}