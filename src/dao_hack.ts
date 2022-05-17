import { AssetTransfersResponse } from "@alch/alchemy-web3";
import { getAssetTransfers, getTxReceipt } from "./web3";

const daoAddress = "0xbb9bc244d798123fde783fcc1c72d3bb8c189413";
const daoHackBlock = `0x${(1718497).toString(16)}`;

/**
 * get all qualifying txes for each address to test separately!
 */
export async function addressToCandidateTxes() {
  const addrToTxes = new Map();

  function addRespXfersToMap(resp: AssetTransfersResponse) {
    console.log(`Adding ${resp.transfers.length} new xfers`);
    for (const xfer of resp.transfers) {
      if (addrToTxes.has(xfer.from)) {
        addrToTxes[xfer.from].push(xfer.hash);
      } else {
        addrToTxes[xfer.from] = [xfer.hash];
      }
    }

    return addrToTxes;
  }

  let resp = await getAssetTransfers({
    fromBlock: "0x0",
    toBlock: daoHackBlock,

    toAddress: daoAddress,
  });
  addRespXfersToMap(resp);

  let nextPageKey = resp.pageKey;
  while (nextPageKey != null) {
    console.log(`Next page key: ${nextPageKey}`);
    resp = await getAssetTransfers({
      fromBlock: "0x0",
      toBlock: daoHackBlock,

      toAddress: daoAddress,
      pageKey: nextPageKey,
    });
    addRespXfersToMap(resp);

    nextPageKey = resp.pageKey;
  }

  return addrToTxes;
}

/**
 * return true if this tx represnets a valid DAO deposit
 *
 * @param txHash
 * @returns
 */
export async function txIsValidDeposit(txHash: string): Promise<boolean> {
  let txReceipt = await getTxReceipt(txHash);

  // TODO: predicate on logs too? Not yet
  return txReceipt.status === true;
}

/**
 * Takes a mapping of address -> candidate txes and returns all addresses that fit hte 'dao hack' set
 *
 * @param addressToTxes address to all candidate txes that may indicate membership in the DAO hack set
 */
export async function filterAddresses(addressToTxes) {
  let validAddresses = new Set([]);
  console.log(
    `Filtering through ${Object.keys(addressToTxes).length} addresses`
  );
  let i = 0;
  for (const address in addressToTxes) {
    const txHashes = addressToTxes[address];

    for (const txHash of txHashes) {
      let valid = await txIsValidDeposit(txHash);
      if (valid) {
        validAddresses.add(address);
        break;
      }
    }

    if (i % 100 == 0) {
      console.log(`Processed ${i} addresses`);
    }

    i++;
  }

  console.log(`Filtered down to ${validAddresses.size} addresses`);

  return validAddresses;
}
