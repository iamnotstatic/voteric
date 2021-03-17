// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./ElectionInterface.sol";
import "./Ownable.sol";

contract Election is Ownable, ElectionInterface {
    struct Candidate {
        uint256 id;
        string name;
        uint256 voteCount;
    }

    mapping(uint256 => Candidate) private candidates;
    uint256 public candidateCount;

    mapping(address => bool) private voters;

    function addCandidate(string memory name)
        public
        virtual
        override
        onlyOwner()
        returns (bool)
    {
        candidateCount++;
        candidates[candidateCount] = Candidate(candidateCount, name, 0);

        return true;
    }

    function getCandidate(uint256 candidateId)
        public
        view
        virtual
        override
        returns (
            uint256,
            string memory,
            uint256
        )
    {
        return (
            candidates[candidateId].id,
            candidates[candidateId].name,
            candidates[candidateId].voteCount
        );
    }

    function vote(uint256 candidateId) public virtual override returns (bool) {
        require(!voters[msg.sender], "Already voted");
        require(
            candidateId > 0 && candidateId <= candidateCount,
            "Invalid candidate"
        );

        voters[msg.sender] = true;
        candidates[candidateId].voteCount++;

        emit Vote(candidateId);

        return true;
    }
}
