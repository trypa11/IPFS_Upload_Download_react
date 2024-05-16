pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract CodeIPFS {
    mapping(uint => string) public ipfsHashes;
    mapping(address => uint) public shares;
    address[] public owners;
    mapping(uint => address) private projectOwners; // New mapping
    uint public projectId; // New variable

    function initialize(uint _projectId, address _ownerId, string memory _hash) public {
        projectId = _projectId;
        projectOwners[_projectId] = _ownerId;
        setHash(_projectId, _hash);
    }

    function setHash(uint _id, string memory _hash) public {
        ipfsHashes[_id] = _hash;
        projectOwners[_id] = msg.sender; // Set the sender as the owner of the project ID
        if (shares[msg.sender] == 0) {
            owners.push(msg.sender);
        }
        shares[msg.sender] += 1;
    }

    function getHash(uint _id) public view returns (string memory) {
        require(msg.sender == projectOwners[_id], "Only  owners can retrieve the IPFS hash."); // New requirement
        return ipfsHashes[_id];
    }

    function getOwners() public view returns (address[] memory) {
        return owners;
    }

    function buyContract() public payable {
        require(msg.value > 0, "Payment required to buy contract.");

        // Distribute fee to all owners according to their shares
        uint fee = msg.value / 10;
        for (uint i = 0; i < owners.length; i++) {
            payable(owners[i]).transfer(fee * shares[owners[i]] / owners.length);
        }

        // Update current owner
        setHash(owners.length, "");
    }

    function getAllHashes() public view returns (string[] memory) {
        string[] memory hashes = new string[](owners.length);
        for (uint i = 0; i < owners.length; i++) {
            hashes[i] = ipfsHashes[i];
        }
        return hashes;
    }

    function setProjectId(uint _projectId) public {
        projectId = _projectId;
    }
    
    function getProjectId() public view returns (uint) {
    return projectId;
    }
}
