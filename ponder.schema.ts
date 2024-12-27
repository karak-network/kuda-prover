import { createSchema } from '@ponder/core';

export default createSchema((p) => ({
  HeaderRange: p.createTable(
    {
      id: p.string(),
      startBlock: p.bigint(),
      endBlock: p.bigint(),
      proofNonce: p.bigint(),
    },
    {
      rangeIndex: p.index(['startBlock', 'endBlock']),
    },
  ),
  Challenge: p.createTable(
    {
      id: p.string(),
      daLayer: p.string(),
      context: p.hex(),
    },
    {
      index: p.index(['daLayer']),
    },
  ),
}));
