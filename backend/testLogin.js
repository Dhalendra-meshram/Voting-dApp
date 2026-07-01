import { ethers } from "ethers";
import axios from "axios";
import { SiweMessage } from "siwe";

const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");
const privateKey = "0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d";
const wallet = new ethers.Wallet(privateKey, provider);

async function login() {
  const { data } = await axios.get("http://localhost:5000/api/auth/nonce");
  const nonce = data.nonce;

  const message = new SiweMessage({
    domain: "localhost",
    address: wallet.address,
    statement: "Sign in with Ethereum",
    uri: "http://localhost:5000",
    version: "1",
    chainId: 31337,
    nonce
  });

  const messageToSign = message.prepareMessage();

  const signature = await wallet.signMessage(messageToSign);

  const response = await axios.post(
    "http://localhost:5000/api/auth/verify",
    {
      message: messageToSign,
      signature
    }
  );

  console.log(response.data);
}

login();