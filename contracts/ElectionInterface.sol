// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

/** 
* Election Interface 
*/

interface ElectionInterface {

    function addCandidate(string memory name) external returns (bool);

    function getCandidate(uint candidateId) external view returns (uint256, string memory, uint256);

    function vote(uint candidateId) external returns (bool);


    /** Events */
    event Vote(uint indexed candidateId);
}