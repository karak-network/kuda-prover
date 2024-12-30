# KUDA Prover

This is a prover for the Karak Universal Data Availability (KUDA) DSS.
It listens to incoming challenges on the KUDA contract and tries to prove the availability of the data if possible.
It's essentially just a Ponder indexer with handlers for events from the KUDA contract.

## Download the Docker image

```bash
docker pull ghcr.io/karak-network/kuda-prover:latest
```

## Running the prover

To run the prover, you can simply provide the following environment variables to the docker container:

```bash
DATABASE_URL
PONDER_RPC_URL_1
BLOBSTREAMX_CONTRACT_ADDRESS
KUDA_CONTRACT_ADDRESS
START_BLOCK
```

The `DATABASE_URL` should be a valid postgres connection string for indexing relevant `KUDA` contract events as well as `BlobstreamX` events for Celestia tasks.

You can find the appropriate `BLOBSTREAMX_CONTRACT_ADDRESS` for the chain you're running the prover on in [this](https://docs.celestia.org/how-to-guides/blobstream#deployed-contracts) page.
