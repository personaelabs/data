import { createAlchemyWeb3 } from "@alch/alchemy-web3";

import secrets from "../secrets";

const alchemyApiKey = secrets.alchemyApiKey;
export const web3 = createAlchemyWeb3(
  `https://eth-mainnet.alchemyapi.io/v2/${alchemyApiKey}`
);

export async function getTxReceipt(txHash: string) {
  return await web3.eth.getTransactionReceipt(txHash);
}
