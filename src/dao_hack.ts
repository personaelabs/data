import { AlchemyWeb3 } from "@alch/alchemy-web3";

const daoAddress = "0xbb9bc244d798123fde783fcc1c72d3bb8c189413";
const daoHackBlock = `0x${(1718497).toString(16)}`;

async function getDaoHackXfers(web3: AlchemyWeb3) {
  const resp = await web3.alchemy.getAssetTransfers({
    fromBlock: "0x0",
    toBlock: daoHackBlock,

    toAddress: daoAddress,
  });

  let nextPageKey = resp.pageKey;
  const xfers = resp.transfers;

  //   while (nextPageKey != null) {
  //     console.log(`Next page key: ${nextPageKey}`);
  //     const resp = await web3.alchemy.getAssetTransfers({
  //       fromBlock: "0x0",
  //       toBlock: daoHackBlock,

  //       toAddress: daoAddress,
  //       pageKey: nextPageKey,
  //     });

  //     nextPageKey = resp.pageKey;
  //     xfers.push(...resp.transfers);
  //   }

  return xfers;
}

export { getDaoHackXfers };
