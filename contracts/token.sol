// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

contract Token {
    string public name = "Phala";
    string public symbol = "phl";
    address private deployer;
    mapping(address => uint) public balances;

    
    constructor() {
        deployer = msg.sender;
    }
  
    function mintToken(uint value) public  {
        require(msg.sender == deployer, "Not the contract owner");
        balances[msg.sender] += value;
    }

    function balancesOf(address account) public view returns(uint){
        return balances[account];
    }

    function transfer(uint value,address recv) public {
        require(balances[msg.sender] >= value, "Insufficient balance");
        balances[msg.sender] -= value;
        balances[recv] += value;
    }
}