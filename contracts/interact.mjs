import { makeContractCall, broadcastTransaction, AnchorMode, PostConditionMode, stringUtf8CV, uintCV } from '@stacks/transactions';
import { STACKS_MAINNET } from '@stacks/network';

const NETWORK = STACKS_MAINNET;
const CONTRACT_ADDRESS = 'SP19PS42C7R7BR4VCX2YN8KPHXSB0ZC19K6PFEKTC';
const CONTRACT_NAME = 'BitStack';

// Create a task
export async function createTask(senderKey, title, description, amount, deadline) {
  const txOptions = {
    contractAddress: CONTRACT_ADDRESS,
    contractName: CONTRACT_NAME,
    functionName: 'create-task',
    functionArgs: [
      stringUtf8CV(title),
      stringUtf8CV(description),
      uintCV(amount),
      uintCV(deadline)
    ],
    senderKey,
    network: NETWORK,
    anchorMode: AnchorMode.Any,
    postConditionMode: PostConditionMode.Allow,
    fee: 2000n,
  };
  
  const transaction = await makeContractCall(txOptions);
  const broadcast = await broadcastTransaction({ transaction, network: NETWORK });
  return broadcast;
}

// Accept a task
export async function acceptTask(senderKey, taskId) {
  const txOptions = {
    contractAddress: CONTRACT_ADDRESS,
    contractName: CONTRACT_NAME,
    functionName: 'accept-task',
    functionArgs: [uintCV(taskId)],
    senderKey,
    network: NETWORK,
    anchorMode: AnchorMode.Any,
    postConditionMode: PostConditionMode.Allow,
  };
  
  const transaction = await makeContractCall(txOptions);
  return broadcastTransaction(transaction, NETWORK);
}

// Submit work
export async function submitWork(senderKey, taskId, submissionDetails) {
  const txOptions = {
    contractAddress: CONTRACT_ADDRESS,
    contractName: CONTRACT_NAME,
    functionName: 'submit-work',
    functionArgs: [
      uintCV(taskId),
      stringUtf8CV(submissionDetails)
    ],
    senderKey,
    network: NETWORK,
    anchorMode: AnchorMode.Any,
    postConditionMode: PostConditionMode.Allow,
  };
  
  const transaction = await makeContractCall(txOptions);
  return broadcastTransaction(transaction, NETWORK);
}

// Approve work
export async function approveWork(senderKey, taskId) {
  const txOptions = {
    contractAddress: CONTRACT_ADDRESS,
    contractName: CONTRACT_NAME,
    functionName: 'approve-work',
    functionArgs: [uintCV(taskId)],
    senderKey,
    network: NETWORK,
    anchorMode: AnchorMode.Any,
    postConditionMode: PostConditionMode.Allow,
  };
  
  const transaction = await makeContractCall(txOptions);
  return broadcastTransaction(transaction, NETWORK);
}

// Get task details (read-only)
export async function getTask(taskId) {
  const response = await fetch(`https://api.mainnet.hiro.so/v2/contracts/call-read/${CONTRACT_ADDRESS}/${CONTRACT_NAME}/get-task`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      sender: CONTRACT_ADDRESS,
      arguments: [`0x${Buffer.from(uintCV(taskId).serialize()).toString('hex')}`]
    })
  });
  return response.json();
}
