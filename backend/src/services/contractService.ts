import { JsonRpcProvider, Wallet, Contract } from "ethers";
import artifact from "../abi/vote.json" with { type: "json" };
import { ENV } from "../config/env.js";

const VotingABI = (artifact as any).abi ?? artifact;

export const provider = new JsonRpcProvider(ENV.RPC_URL);

export const wallet = new Wallet(ENV.PRIVATE_KEY, provider);

export const contract = new Contract(
  ENV.CONTRACT_ADDRESS.toLowerCase(),
  VotingABI,
  wallet
);