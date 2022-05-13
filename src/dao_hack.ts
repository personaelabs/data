import { web3 } from "./web3";

const daoAddress = "0xbb9bc244d798123fde783fcc1c72d3bb8c189413";
const daoHackBlock = `0x${(1718497).toString(16)}`;

export async function getDaoDepositorsPage(
  pageKey: string
): Promise<[Set<string>, string]> {
  const resp = await web3.alchemy.getAssetTransfers({
    fromBlock: "0x0",
    toBlock: daoHackBlock,

    toAddress: daoAddress,
    pageKey,
  });

  const addresses = new Set<string>();
  for (const xfer of resp.transfers) {
    addresses.add(xfer.from);
  }
  console.log(`${addresses.size} addresses total`);
  return [addresses, resp.pageKey];
}

export async function getDaoDepositors(): Promise<Set<string>> {
  const resp = await web3.alchemy.getAssetTransfers({
    fromBlock: "0x0",
    toBlock: daoHackBlock,

    toAddress: daoAddress,
  });

  const addresses = new Set<string>();
  // NOTE: could keep track of big deposits here
  for (const xfer of resp.transfers) {
    addresses.add(xfer.from);
  }
  console.log(`${addresses.size} addresses total`);

  let nextPageKey = resp.pageKey;
  let newAddresses = new Set<string>();
  while (nextPageKey != null) {
    console.log(`Next page key: ${nextPageKey}`);
    [newAddresses, nextPageKey] = await getDaoDepositorsPage(nextPageKey);
    for (const address of newAddresses) {
      addresses.add(address);
    }
  }

  return addresses;
}
