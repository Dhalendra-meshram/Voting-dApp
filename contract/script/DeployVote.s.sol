// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import {Script} from "forge-std/Script.sol";
import {console} from "forge-std/console.sol";
import {Vote} from "src/vote.sol";

contract DeployVote is Script {
    function run() external {
        console.log("====================================");
        console.log("Starting Vote Contract Deployment...");
        console.log("====================================");

        vm.startBroadcast(); // uses --private-key automatically

        Vote vote = new Vote();

        vm.stopBroadcast();

        console.log("Vote Contract Deployed Successfully!");
        console.log("Contract Address:", address(vote));
        console.log("Chain ID:", block.chainid);

        console.log("====================================");
        console.log("Deployment Completed");
        console.log("====================================");
    }
}