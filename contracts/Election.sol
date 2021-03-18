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

    struct Voter {
        bool authorized;
        bool voted;
    }

    mapping(uint256 => Candidate) public candidates;
    uint256 public candidateCount;

    mapping(address => Voter) public voters;
    string public electionName;
    

    constructor(string memory _electionName) {
        electionName = _electionName;
    }

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

    function authorize(address person)
        public
        virtual
        override
        onlyOwner()
        returns(bool)
    {
        voters[person].authorized = true;

        return true;
    }

    function vote(uint256 candidateId) public virtual override returns (bool) {
        require(!voters[msg.sender].voted, "Already voted");
        require(voters[msg.sender].authorized, "Unauthorized");
        require(
            candidateId > 0 && candidateId <= candidateCount,
            "Invalid candidate"
        );

        voters[msg.sender].voted = true;
        candidates[candidateId].voteCount++;

        emit Vote(candidateId);

        return true;
    }


    function end() public override virtual onlyOwner()  {
        //announce each candidates results
        for(uint i=0; i < candidateCount; i++) {
            emit ElectionResult(candidates[i].name, candidates[i].voteCount);
        }    
    }
    
}
