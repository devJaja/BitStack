import { generateWallet } from '@stacks/wallet-sdk';
import { createTask, acceptTask, submitWork, approveWork, getTask } from './interact.mjs';

const mnemonic = "rare glow wheel hole illness undo split twelve skull awful dish install flower toy shock narrow lake immense ancient label barely unusual certain victory";

const wallet = await generateWallet({
  secretKey: mnemonic,
  password: ''
});

const privateKey = wallet.accounts[0].stxPrivateKey;

console.log('Creating task...');
const createResult = await createTask(
  privateKey,
  'Build landing page',
  'Need a responsive landing page with modern design and contact form',
  5000000, // 5 STX
  Math.floor(Date.now() / 1000) + 86400 * 7 // 7 days
);

console.log('Transaction ID:', createResult.txid);
console.log('View at: https://explorer.hiro.so/txid/' + createResult.txid);
