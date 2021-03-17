// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

/** 
* Election Interface 
*/

interface ElectionInterface {

    function addCandidate(string memory name) external returns (bool);

    function authorize(address person) external returns (bool);

    function vote(uint candidateId) external returns (bool);

    function end() external;




    /** Events */
    event Vote(uint indexed candidateId);
    event ElectionResult(string indexed candidateName, uint voteCount);

}