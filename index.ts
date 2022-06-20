import { writeFileSync } from "fs";

import { testAddresses } from "./src/addresses";
import { buildTreeMimc } from "./src/merkleMimc";
import { buildTree } from './src/merkle';

buildTree(testAddresses, 7, 30, 0n).then((res) => {
  console.log(`Constructed tree with root ${res.root}`);

  writeFileSync(
    "output/dizkus_test.json",
    JSON.stringify(res, (k, v) => (typeof v == "bigint" ? v.toString() : v), 2)
  );
});