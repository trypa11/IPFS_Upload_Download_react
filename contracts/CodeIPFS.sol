pragma solidity ^0.8.0;

contract CodeIPFS {
    mapping(uint => string) public ipfsHashes;

    function setHash(uint _id, string memory _hash) public {
        ipfsHashes[_id] = _hash;
    }

    function getHash(uint _id) public view returns (string memory) {
        return ipfsHashes[_id];
    }
}
