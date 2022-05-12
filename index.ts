import { createAlchemyWeb3 } from "@alch/alchemy-web3";
import { getDaoHackXfers } from "./src/dao_hack";

import secrets from "./secrets";

const alchemyApiKey = secrets.alchemyApiKey;
const web3 = createAlchemyWeb3(
  `https://eth-mainnet.alchemyapi.io/v2/${alchemyApiKey}`
);

getDaoHackXfers(web3).then((transfers) => {
  console.log(`${transfers.length} transfers found`);
  // TODO: store in a json file
});
