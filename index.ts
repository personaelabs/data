import { writeFileSync } from "fs";

import { getDaoDepositors } from "./src/dao_hack";

getDaoDepositors().then((addresses) => {
  console.log(`${addresses.size} addresses found`);

  writeFileSync(
    "output/dao_hack_addresses.json",
    JSON.stringify(Array.from(addresses))
  );
});
