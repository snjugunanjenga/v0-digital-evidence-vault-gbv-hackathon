import hederaClient from './lib/hedera';
import { TopicCreateTransaction } from '@hashgraph/sdk';

async function createNewTopic() {
  console.log('Creating a new Hedera Topic...');

  const transaction = new TopicCreateTransaction({
    topicMemo: 'Digital Evidence Vault - Hash Records',
  });

  try {
    const txResponse = await transaction.execute(hederaClient);
    const receipt = await txResponse.getReceipt(hederaClient);
    const topicId = receipt.topicId;

    if (topicId) {
      console.log('✅ Success! New Topic created.');
      console.log(`️Topic ID: ${topicId.toString()}`);
      console.log(
        '\nPlease copy this Topic ID and add it to your .env file as HEDERA_TOPIC_ID'
      );
    } else {
      console.error('Failed to create topic, receipt did not contain a topicId.');
    }

    return topicId;
  } catch (error) {
    console.error('Error creating new topic:', error);
  }
}

createNewTopic().finally(() => {
  // The client doesn't need to be closed for a simple script,
  // but it's good practice if this were a long-running process.
});
