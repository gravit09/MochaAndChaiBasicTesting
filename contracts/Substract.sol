// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

contract Substract{
    function substract(uint num1,uint num2) public pure returns(uint){
        require(num1>num2,"Num2should be greater then Num2");
        return num1-num2;
    }
}