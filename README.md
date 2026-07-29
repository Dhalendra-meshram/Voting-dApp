# Decentralized Voting DApp

A production-ready full-stack **Decentralized Voting DApp** built with
**Solidity**, **Foundry**, **Next.js**, **TypeScript**, **Node.js**,
**MongoDB Atlas**, **IPFS**, and **Sign-In with Ethereum (SIWE)**.

The application demonstrates a secure blockchain-based voting system
where users authenticate using Ethereum wallets, register as voters,
register candidates (admin only), and cast votes on-chain. Candidate
metadata is stored on IPFS, while authentication and application data
are managed through a modern backend API.

------------------------------------------------------------------------

# 🚀 Live Demo

### Frontend

https://voting-d-app-neon.vercel.app

### Backend API

https://voting-dapp-tngg.onrender.com

------------------------------------------------------------------------

# 📖 Overview

This project demonstrates how modern decentralized applications combine
blockchain technology with traditional web infrastructure.

The application includes:

-   Ethereum wallet authentication
-   Sign-In with Ethereum (SIWE)
-   Secure JWT authentication
-   Ethereum Sepolia smart contract
-   MongoDB Atlas database
-   IPFS metadata storage using Pinata
-   Modern React frontend
-   Express.js backend API
-   Production deployment on Vercel and Render

------------------------------------------------------------------------

# ✨ Features

## Authentication

-   Connect Wallet using RainbowKit
-   Sign-In with Ethereum (SIWE)
-   JWT-based session management
-   Secure backend authentication

## Voting

-   Register as a voter
-   Register candidates (Admin only)
-   Store candidate metadata on IPFS
-   Cast votes securely
-   Prevent double voting
-   Display live vote counts
-   View election results

## Blockchain

-   Smart contracts written in Solidity
-   Ethereum Sepolia deployment
-   Event-driven architecture
-   Gas-efficient contract design
-   Foundry unit testing

------------------------------------------------------------------------

# 🏗 Architecture

``` text
                     User
                      │
         Next.js Frontend (Vercel)
                      │
        ┌─────────────┴─────────────┐
        │                           │
 Ethereum Wallet              Backend API
(RainbowKit + Wagmi)      (Express + TypeScript)
        │                           │
        │                     MongoDB Atlas
        │
 Ethereum Sepolia Network
        │
 Voting Smart Contract
        │
 Candidate Metadata
        │
     IPFS (Pinata)
```

------------------------------------------------------------------------

# 🛠 Tech Stack

## Smart Contracts

-   Solidity
-   Foundry
-   OpenZeppelin

## Frontend

-   Next.js 16
-   React 19
-   TypeScript
-   Tailwind CSS
-   Wagmi
-   RainbowKit
-   Viem
-   Axios

## Backend

-   Node.js
-   Express.js
-   TypeScript
-   MongoDB Atlas
-   Mongoose
-   JWT
-   SIWE

## Storage

-   IPFS
-   Pinata

## Blockchain

-   Ethereum Sepolia

## Deployment

-   Vercel
-   Render
-   MongoDB Atlas

------------------------------------------------------------------------

# 📂 Project Structure

``` text
Voting-dApp
├── backend/
├── contract/
├── frontend/
├── docs/
├── .github/
└── README.md
```

------------------------------------------------------------------------

# 📜 Smart Contract

**Network:** Ethereum Sepolia

**Contract Address**

``` text
0xBC86354297832b262DCc8297B859e06Bb1e32706
```

------------------------------------------------------------------------

# 📸 Screenshots

``` text
docs/screenshots/admin_dashboard.png
docs/screenshots/registered.png
docs/screenshots/result.png
```

------------------------------------------------------------------------

# ⚙ Local Development

## Clone Repository

``` bash
git clone https://github.com/Dhalendra-meshram/Voting-dApp.git
cd Voting-dApp
```

## Smart Contract

``` bash
cd contract
forge install
forge build
forge test
```

## Backend

``` bash
cd backend
npm install
npm run dev
```

## Frontend

``` bash
cd frontend
npm install
npm run dev
```

------------------------------------------------------------------------

# 🌐 Environment Variables

## Backend

``` env
RPC_URL=
CONTRACT_ADDRESS=
PRIVATE_KEY=
JWT_SECRET=
MONGO_URI=
PINATA_JWT=
DOMAIN=
ADMIN_ADDRESS=
FRONTEND_URL=
```

## Frontend

``` env
NEXT_PUBLIC_API_URL=
NEXT_PUBLIC_CONTRACT_ADDRESS=
NEXT_PUBLIC_CHAIN_ID=
NEXT_PUBLIC_DEPLOYMENT_BLOCK=
NEXT_PUBLIC_RPC_URL=
```

------------------------------------------------------------------------

# 🚀 Production Deployment

  Component          Platform
  ------------------ ------------------
  Frontend           Vercel
  Backend            Render
  Database           MongoDB Atlas
  Smart Contract     Ethereum Sepolia
  Metadata Storage   IPFS (Pinata)

------------------------------------------------------------------------

# 🧪 Testing

-   Smart contract tests with Foundry
-   Wallet connection
-   SIWE authentication
-   Voter registration
-   Candidate registration
-   Vote casting
-   Vote counting
-   Production deployment verification

------------------------------------------------------------------------

# 🔐 Security Features

-   Sign-In with Ethereum (SIWE)
-   JWT authentication
-   Admin-only candidate registration
-   Smart contract access control
-   Protected backend routes

------------------------------------------------------------------------

# 📈 Future Improvements

-   Automatic image upload to IPFS
-   Multiple elections
-   Election scheduling
-   Real-time updates
-   Analytics dashboard
-   Mobile optimization

------------------------------------------------------------------------

# 📄 License

MIT License

------------------------------------------------------------------------

# 👨‍💻 Author

**Dhalendra Meshram**

-   GitHub: https://github.com/Dhalendra-meshram
-   Repository: https://github.com/Dhalendra-meshram/Voting-dApp

⭐ If you found this project useful, consider giving it a star on
GitHub.
