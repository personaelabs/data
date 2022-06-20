import { writeFileSync } from "fs";

import { testAddresses } from "./src/addresses";
import { buildTreeMimc } from "./src/merkleMimc";

buildTreeMimc(testAddresses, 7, 1n).then((res) => {
  console.log(`Constructed tree with root ${res.root}`);

  writeFileSync(
    "output/vivek_lakshman_test.json",
    JSON.stringify(res, (k, v) => (typeof v == "bigint" ? v.toString() : v), 2)
  );
});