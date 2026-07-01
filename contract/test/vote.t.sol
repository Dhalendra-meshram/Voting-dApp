// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import {Test} from "forge-std/Test.sol";
import {Vote} from "../src/vote.sol";

contract VoteTest is Test {
    Vote vote;

    address owner = address(1);
    address candidate1 = address(2);
    address voter1 = address(3);

    function setUp() public {
        vm.prank(owner);
        vote = new Vote();
    }

    function testOwnerIsSetCorrectly() public view {
        assertEq(vote.owner(), owner);
    }

    function testRegisterCandidate() public {
        vm.prank(owner);
        vote.registerCandidate(candidate1, "cid1");

        assertEq(vote.nextCandidateId(), 1);
    }

    function testRegisterVoter() public {
        vm.prank(voter1);
        vote.registerVoter("Alice", 25, Vote.Gender.Female);

        assertTrue(vote.isVoterRegistered(voter1));
    }

    function testVotingFlow() public {
        vm.prank(owner);
        vote.registerCandidate(candidate1, "cid1");

        vm.prank(voter1);
        vote.registerVoter("Alice", 25, Vote.Gender.Female);

        vm.prank(owner);
        vote.setVotingPeriod(0, 1 hours);

        vm.prank(voter1);
        vote.castVote(1);

        assertEq(vote.getVoteCount(1), 1);
    }

    function testAnnounceWinner() public {
        vm.prank(owner);
        vote.registerCandidate(candidate1, "cid1");

        vm.prank(voter1);
        vote.registerVoter("Alice", 25, Vote.Gender.Female);

        vm.prank(owner);
        vote.setVotingPeriod(0, 1 hours);

        vm.prank(voter1);
        vote.castVote(1);

        vm.warp(block.timestamp + 2 hours);

        vm.prank(owner);
        vote.announceWinner();

        assertEq(vote.winningCandidateId(), 1);
        assertEq(vote.winner(), candidate1);
    }
}
