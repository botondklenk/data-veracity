# Dataspace quality assurance

This project is meant to check the veracity of the data sent by the participants in the dataspace.

![Alt text](./docs/figures/architecture.png)

Questions to answer:
- where should the CONFIG for the checks come from?
    - maybe should be a part of the CONTRACT?
    - then the checker api should be able to read the contract
- a contract can be used for multible data transfer?
- can CONRATCT ID be used to identify the data transfer and the checks?
- is QUERY important? leveldb cannot be queried

