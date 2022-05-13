import { AlchemyWeb3 } from "@alch/alchemy-web3";

const daoAddress = "0xbb9bc244d798123fde783fcc1c72d3bb8c189413";
const daoHackBlock = `0x${(1718497).toString(16)}`;

async function getDaoDepositors(web3: AlchemyWeb3) {
  const resp = await web3.alchemy.getAssetTransfers({
    fromBlock: "0x0",
    toBlock: daoHackBlock,

    toAddress: daoAddress,
  });

  const addresses = new Set<string>([]);
  // NOTE: could keep track of big deposits here
  for (const xfer of resp.transfers) {
    addresses.add(xfer.from);
  }
  console.log(`${addresses.size} addresses total`);

  let nextPageKey = resp.pageKey;
  while (nextPageKey != null) {
    console.log(`Next page key: ${nextPageKey}`);
    const resp = await web3.alchemy.getAssetTransfers({
      fromBlock: "0x0",
      toBlock: daoHackBlock,

      toAddress: daoAddress,
      pageKey: nextPageKey,
    });
    for (const xfer of resp.transfers) {
      addresses.add(xfer.from);
    }
    console.log(`${addresses.size} addresses total`);

    nextPageKey = resp.pageKey;
  }

  return addresses;
}

export { getDaoDepositors };
