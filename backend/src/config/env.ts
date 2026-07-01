import dotenv from "dotenv";

dotenv.config();

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`${name} not defined`);
  }
  return value;
}

export const ENV = {
  RPC_URL: requireEnv("RPC_URL"),
  CONTRACT_ADDRESS: requireEnv("CONTRACT_ADDRESS"),
  PRIVATE_KEY: requireEnv("PRIVATE_KEY"),
  JWT_SECRET: requireEnv("JWT_SECRET"),
  MONGO_URI: requireEnv("MONGO_URI"),
  PINATA_JWT: requireEnv("PINATA_JWT"),
  DOMAIN: requireEnv("DOMAIN"),
  ADMIN_ADDRESS: requireEnv("ADMIN_ADDRESS"),
  FRONTEND_URL: requireEnv("FRONTEND_URL"),
};