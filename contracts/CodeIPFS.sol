pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract CodeIPFS {
    mapping(uint => string) public ipfsHashes;
    mapping(address => uint) public shares;
    address[] public owners;

    function setHash(uint _id, string memory _hash) public {
        ipfsHashes[_id] = _hash;
        if (shares[msg.sender] == 0) {
            owners.push(msg.sender);
        }
        shares[msg.sender] += 1;
    }

    function getHash(uint _id) public view returns (string memory) {
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
}
