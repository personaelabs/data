import { writeFileSync } from "fs";

import { testAddresses } from "./src/addresses";
import { buildTree } from "./src/merkle";

buildTree(testAddresses).then((res) => {
  console.log(`Constructed tree with root ${res.root}`);

  writeFileSync(
    "output/dao_hack/test_merkle.json",
    JSON.stringify(res, (k, v) => (typeof v == "bigint" ? v.toString() : v), 2)
  );
});
