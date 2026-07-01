// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {Pausable} from "@openzeppelin/contracts/utils/Pausable.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/*
 * Voting Contract
 * - Ownable (OZ v5)
 * - Pausable
 * - ReentrancyGuard
 * - Custom errors
 * - Clean architecture
 */

contract Vote is Ownable, Pausable, ReentrancyGuard {
    constructor() Ownable(msg.sender) {}

    // -------------------------------------------------
    // Custom Errors
    // -------------------------------------------------

    error NotRegistered();
    error AlreadyRegistered();
    error AlreadyVoted();
    error InvalidCandidate();
    error VotingNotActive();
    error VotingAlreadyScheduled();
    error NoCandidates();
    error WinnerAlreadyDeclared();
    error VotingNotEnded();
    error InvalidAge();

    // -------------------------------------------------
    // Events
    // -------------------------------------------------

    event CandidateRegistered(uint256 indexed candidateId, address indexed candidateAddress, string metadataCid);

    event VoterRegistered(address indexed voter, string name, uint256 age, Gender gender);

    event VoteCast(address indexed voter, uint256 indexed candidateId);
    event VotingPeriodSet(uint256 startTime, uint256 endTime);
    event WinnerAnnounced(uint256 candidateId, address winner, bool isTie);

    // -------------------------------------------------
    // Enums
    // -------------------------------------------------

    enum Gender {
        NotSpecified,
        Male,
        Female,
        Other
    }
    enum VotingStatus {
        NotStarted,
        InProgress,
        Ended
    }

    // -------------------------------------------------
    // Structs
    // -------------------------------------------------

    struct Candidate {
        address candidateAddress;
        string metadataCid;
        uint256 voteCount;
    }

    struct Voter {
        string name;
        uint256 age;
        Gender gender;
        uint256 votedCandidateId;
    }

    // -------------------------------------------------
    // State
    // -------------------------------------------------

    uint256 public startTime;
    uint256 public endTime;
    uint256 public nextCandidateId;

    uint256 public winningCandidateId;
    address public winner;
    bool public winnerDeclared;
    bool public isTie;

    mapping(uint256 => Candidate) private candidates;
    mapping(address => bool) public isCandidateRegistered;
    mapping(address => bool) public isVoterRegistered;
    mapping(address => Voter) private voters;

    // -------------------------------------------------
    // Candidate Management
    // -------------------------------------------------

    function registerCandidate(address _candidate, string calldata _metadataCid) external onlyOwner {
        if (_candidate == address(0)) revert InvalidCandidate();
        if (isCandidateRegistered[_candidate]) revert AlreadyRegistered();
        if (startTime != 0) revert VotingAlreadyScheduled();

        nextCandidateId++;

        candidates[nextCandidateId] = Candidate({candidateAddress: _candidate, metadataCid: _metadataCid, voteCount: 0});

        isCandidateRegistered[_candidate] = true;

        emit CandidateRegistered(nextCandidateId, _candidate, _metadataCid);
    }

    function getVoteCount(uint256 _id) external view returns (uint256) {
        if (_id == 0 || _id > nextCandidateId) revert InvalidCandidate();
        return candidates[_id].voteCount;
    }

    // -------------------------------------------------
    // Voter Registration
    // -------------------------------------------------

    function registerVoter(string calldata _name, uint256 _age, Gender _gender) external {
        if (isVoterRegistered[msg.sender]) revert AlreadyRegistered();
        if (_age < 18) revert InvalidAge();
        if (bytes(_name).length == 0) revert NotRegistered();

        voters[msg.sender] = Voter({name: _name, age: _age, gender: _gender, votedCandidateId: 0});

        isVoterRegistered[msg.sender] = true;

        emit VoterRegistered(msg.sender, _name, _age, _gender);
    }

    // -------------------------------------------------
    // Voting
    // -------------------------------------------------

    function castVote(uint256 _candidateId) external whenNotPaused nonReentrant {
        if (!_isVotingActive()) revert VotingNotActive();
        if (!isVoterRegistered[msg.sender]) revert NotRegistered();
        if (_candidateId == 0 || _candidateId > nextCandidateId) revert InvalidCandidate();

        Voter storage voter = voters[msg.sender];
        if (voter.votedCandidateId != 0) revert AlreadyVoted();

        voter.votedCandidateId = _candidateId;
        candidates[_candidateId].voteCount++;

        emit VoteCast(msg.sender, _candidateId);
    }

    function getCandidate(uint256 _id)
        external
        view
        returns (address candidateAddress, string memory metadataCid, uint256 voteCount)
    {
        if (_id == 0 || _id > nextCandidateId) revert InvalidCandidate();

        Candidate memory c = candidates[_id];
        return (c.candidateAddress, c.metadataCid, c.voteCount);
    }

    // -------------------------------------------------
    // Voting Period
    // -------------------------------------------------

    function setVotingPeriod(uint256 _startOffset, uint256 _duration) external onlyOwner {
        if (nextCandidateId == 0) revert NoCandidates();
        if (startTime != 0) revert VotingAlreadyScheduled();
        require(_duration >= 1 hours, "Min 1 hour");

        startTime = block.timestamp + _startOffset;
        endTime = startTime + _duration;

        emit VotingPeriodSet(startTime, endTime);
    }

    function getVotingStatus() external view returns (VotingStatus) {
        if (startTime == 0) return VotingStatus.NotStarted;
        if (_isVotingActive()) return VotingStatus.InProgress;
        return VotingStatus.Ended;
    }

    function _isVotingActive() internal view returns (bool) {
        return (block.timestamp >= startTime && block.timestamp <= endTime);
    }

    // -------------------------------------------------
    // Results
    // -------------------------------------------------

    function announceWinner() external onlyOwner {
        if (winnerDeclared) revert WinnerAlreadyDeclared();
        if (block.timestamp <= endTime) revert VotingNotEnded();

        uint256 maxVotes;
        uint256 winnerId;
        uint256 tieCount;

        for (uint256 i = 1; i <= nextCandidateId; i++) {
            uint256 votes = candidates[i].voteCount;

            if (votes > maxVotes) {
                maxVotes = votes;
                winnerId = i;
                tieCount = 1;
            } else if (votes == maxVotes && votes != 0) {
                tieCount++;
            }
        }

        winnerDeclared = true;

        if (maxVotes == 0 || tieCount > 1) {
            isTie = true;
            winner = address(0);
            winningCandidateId = 0;
        } else {
            winner = candidates[winnerId].candidateAddress;
            winningCandidateId = winnerId;
        }

        emit WinnerAnnounced(winningCandidateId, winner, isTie);
    }

    // -------------------------------------------------
    // Emergency Controls
    // -------------------------------------------------

    function pauseVoting() external onlyOwner {
        _pause();
    }

    function resumeVoting() external onlyOwner {
        _unpause();
    }
}
