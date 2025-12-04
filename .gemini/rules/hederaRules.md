# 💡 AI Prompt: Integrate Hedera Consensus Service (HCS)

**Role:** You are an expert software agent specializing in decentralized applications and the Hedera network. Your task is to provide guidance and code snippets for using the Hedera Consensus Service (HCS) within a Node.js or Next.js backend environment.

**Purpose:** To provide a quick-reference guide for creating and interacting with Hedera Topics to build auditable, timestamped logs of application events, such as evidence hashing.

**Reference:** [Hedera Consensus Service Docs](https://docs.hedera.com/hedera/sdks-and-apis/hedera-api/consensus/consensus-service)

---

## 🛠️ Instructions

### 1. Install Dependencies

Install the Hedera Hashgraph SDK for JavaScript.

```bash
npm install @hashgraph/sdk
```

### 2. Configure Environment Variables

Securely store your Hedera account credentials in `.env.local`. These are required to pay for transaction fees.

```dotenv title=".env.local"
HEDERA_ACCOUNT_ID="0.0...."
HEDERA_PRIVATE_KEY="..."
```

### 3. Create a Centralized Hedera Client

Create a reusable module to configure and export a Hedera client. This avoids repeated setup and keeps credentials in one place.

**Create a new file at `lib/hedera.ts`:**

```typescript title="lib/hedera.ts"
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
```

---

## ✅ Core HCS Operations

### A. Create a New Topic

A Topic is a log on the Hedera network to which you can submit messages. For the Digital Evidence Vault, you could create a single Topic to record all evidence hash events.

**This is typically a one-time setup operation.**

```typescript
import hederaClient from "@/lib/hedera";
import { TopicCreateTransaction } from "@hashgraph/sdk";

async function createNewTopic() {
  const transaction = new TopicCreateTransaction({
    topicMemo: "Digital Evidence Vault - Hash Records",
  });

  const txResponse = await transaction.execute(hederaClient);
  const receipt = await txResponse.getReceipt(hederaClient);

  const topicId = receipt.topicId;

  console.log(`New topic created with ID: ${topicId}`);
  return topicId;
}
```

### B. Submit a Message to a Topic

This is the primary action. When a user hashes a file, you submit the hash to the HCS Topic. The network then timestamps and immutably orders the message.

```typescript
import hederaClient from "@/lib/hedera";
import { TopicMessageSubmitTransaction, TopicId } from "@hashgraph/sdk";

async function submitHashToTopic(topicId: string, fileHash: string) {
  if (!topicId) {
    throw new Error("Topic ID must be provided.");
  }

  const transaction = new TopicMessageSubmitTransaction({
    topicId: TopicId.fromString(topicId),
    message: fileHash, // Submit the SHA-256 hash as the message
  });

  const txResponse = await transaction.execute(hederaClient);
  const receipt = await txResponse.getReceipt(hederaClient);

  const transactionStatus = receipt.status;

  console.log(`Message submission status: ${transactionStatus.toString()}`);
  
  // The receipt contains the topic sequence number and running hash,
  // which can be stored for later verification.
  return {
    status: transactionStatus.toString(),
    sequenceNumber: receipt.topicSequenceNumber?.toString(),
    runningHash: receipt.topicRunningHash?.toString("hex"),
  };
}
```

### C. Querying a Topic (via Mirror Node)

To retrieve the ordered list of messages (hashes) from a Topic, you query a Hedera Mirror Node. This is how you can prove the evidence timeline.

```typescript
// Note: This is a simplified example of using a Mirror Node REST API.
// In a real app, you would use a dedicated library or fetch requests.

async function fetchTopicMessages(topicId: string) {
  const MIRROR_NODE_API = `https://testnet.mirrornode.hedera.com/api/v1/topics/${topicId}/messages`;

  try {
    const response = await fetch(MIRROR_NODE_API);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    
    // The `message` in each item is base64 encoded
    data.messages.forEach((msg: any) => {
      console.log(`Sequence: ${msg.sequence_number}`);
      console.log(`Consensus Timestamp: ${msg.consensus_timestamp}`);
      console.log(`Message (Decoded): ${Buffer.from(msg.message, 'base64').toString('utf8')}`);
    });

    return data.messages;
  } catch (error) {
    console.error("Could not fetch topic messages:", error);
  }
}
```
