import { createAlchemyWeb3 } from "@alch/alchemy-web3";
import { writeFileSync } from "fs";

import { getDaoDepositors } from "./src/dao_hack";

import secrets from "./secrets";

const alchemyApiKey = secrets.alchemyApiKey;
const web3 = createAlchemyWeb3(
  `https://eth-mainnet.alchemyapi.io/v2/${alchemyApiKey}`
);

getDaoDepositors(web3).then((addresses) => {
  console.log(`${addresses.size} addresses found`);

  writeFileSync(
    "output/dao_hack_addresses.json",
    JSON.stringify(Array.from(addresses))
  );
});
