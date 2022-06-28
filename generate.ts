import { readFileSync, writeFileSync } from "fs";

import { buildTreePoseidon } from "./src/merklePoseidon";

const groupId = "dfwinners";
const buffer = readFileSync(`input/${groupId}_setup.json`);
const data = JSON.parse(buffer.toString());

// data.addresses can be a filename or a list of strings
let addresses = data.addresses;
if (typeof addresses === "string") {
  addresses = readFileSync(addresses, "utf8").split(/\r?\n/);
}

buildTreePoseidon(addresses, 7, 30, 0n).then((res) => {
  console.log(`Constructed tree with root ${res.root}`);

  res["groupId"] = data.groupId;
  res["groupName"] = data.groupName;
  res["twitterAccount"] = data.twitterAccount;
  res["description"] = data.description;
  res["whyUseful"] = data.whyUseful;
  res["howGenerated"] = data.howGenerated;
  res["secretIndex"] = data.secretIndex;

  writeFileSync(
    `output/${groupId}.json`,
    JSON.stringify(res, (k, v) => (typeof v == "bigint" ? v.toString() : v), 2)
  );
});
