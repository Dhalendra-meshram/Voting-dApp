# Backend

This backend handles authentication and API services for the decentralized voting application.

The application uses SIWE (Sign-In with Ethereum) for wallet-based authentication.

---

## Features

- SIWE authentication
- Nonce generation
- Signature verification
- Session handling
- API routing

---

## Tech Stack

- Node.js
- Express
- TypeScript
- SIWE

---

## API Routes

### Generate Nonce

```http
POST /auth/nonce
```

---

### Verify Wallet Signature

```http
POST /auth/verify
```

---

### Get User Session

```http
GET /profile
```

---

## Install Dependencies

```bash
npm install
```

---

## Start Development Server

```bash
npm run dev
```

---

## Environment Variables

Create `.env` using `.env.example`.

---

## Security Considerations

- Wallet signature verification
- Session validation
- Nonce replay protection
- Secure authentication flow