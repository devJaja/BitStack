import { generateWallet, getStxAddress } from '@stacks/wallet-sdk';

const mnemonic = "rare glow wheel hole illness undo split twelve skull awful dish install flower toy shock narrow lake immense ancient label barely unusual certain victory";

const wallet = await generateWallet({
  secretKey: mnemonic,
  password: ''
});

const address = getStxAddress({ account: wallet.accounts[0], transactionVersion: 0x00 });
console.log(address);
