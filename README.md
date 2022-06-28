# dizkus-data

Repository to generate trees for all dizkus applications, including heyanon!

## build merkle tree for group

First, create a configuration file for your group using the format in [`input/template_setup.json`](input/template_setup.json). For an example, see [our test configuration](input/heyanontest_setup.json).

Then, add our groupID in [`generate.ts`](generate.ts#L5) and run `npm run generate` to generate all tree JSON.
