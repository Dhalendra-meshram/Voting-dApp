# Smart Contracts

This directory contains the Solidity smart contracts for the decentralized voting application.

Built using Foundry for development, testing, and deployment.

---

## Features

- Proposal creation
- Secure on-chain voting
- Double-vote prevention
- Event-based vote tracking
- Gas-optimized Solidity patterns

---

## Tech Stack

- Solidity
- Foundry
- OpenZeppelin

---

## Project Structure

```txt
src/
script/
test/
```

---

## Install Dependencies

```bash
forge install
```

---

## Build Contracts

```bash
forge build
```

---

## Run Tests

```bash
forge test -vvv
```

---

## Run Gas Snapshot

```bash
forge snapshot
```

---

## Deploy Contracts

Start local Anvil node:

```bash
anvil
```

Deploy:

```bash
forge script script/Deploy.s.sol --broadcast
```

---

## Security Considerations

- Access control validation
- Double-voting prevention
- Solidity custom errors
- Event emission for indexing
- Input validation

---

## Future Improvements

- DAO governance integration
- Upgradeable contracts
- Snapshot voting support
- zk-proof anonymous voting