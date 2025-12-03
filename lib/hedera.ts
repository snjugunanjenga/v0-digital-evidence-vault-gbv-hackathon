import { Client, AccountId, PrivateKey } from "@hashgraph/sdk";

// Ensure environment variables are not undefined
if (!process.env.HEDERA_ACCOUNT_ID || !process.env.HEDERA_PRIVATE_KEY) {
  throw new Error("Hedera environment variables are not set!");
}

// Configure the client for the Hedera testnet
const client = Client.forTestnet();

// Set the operator (the account that will pay for transactions)
client.setOperator(
  AccountId.fromString(process.env.HEDERA_ACCOUNT_ID),
  PrivateKey.fromString(process.env.HEDERA_PRIVATE_KEY)
);

export default client;
