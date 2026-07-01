import axios from "axios";
import https from "https";
import { ENV } from "../config/env.js";

const PINATA_URL = "https://api.pinata.cloud/pinning/pinJSONToIPFS";

// Force IPv4
const agent = new https.Agent({
  family: 4
});

export async function uploadToIPFS(
  data: Record<string, any>
): Promise<string> {
  try {
    const response = await axios.post(
      PINATA_URL,
      data,
      {
        httpsAgent: agent,
        headers: {
          Authorization: `Bearer ${ENV.PINATA_JWT}`,
          "Content-Type": "application/json"
        },
        timeout: 10000
      }
    );

    return response.data.IpfsHash;

  } catch (error: any) {
    console.error("IPFS upload failed:", error?.code);
    throw new Error("Failed to upload metadata to IPFS");
  }
}