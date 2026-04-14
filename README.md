# 🌿 Veridian: Blue Carbon Credit Registry

**Veridian** is a high-performance, blockchain-integrated platform designed to bring transparency, efficiency, and beauty to the blue carbon credit market. Built for NGOs, Governments, and Corporations, Veridian leverages the power of **Ethereum (Hardhat)** and **Supabase** to track the birth and lifecycle of carbon credits from coastal ecosystems.

![Veridian UI](https://img.shields.io/badge/Design-Glassmorphism-0D9488?style=for-the-badge&logo=tailwind-css)
![Blockchain](https://img.shields.io/badge/Blockchain-Ethereum/Hardhat-373737?style=for-the-badge&logo=ethereum)
![Backend](https://img.shields.io/badge/Backend-Node.js/Supabase-3ECF8E?style=for-the-badge&logo=supabase)

---

## ✨ Key Features

*   **Premium Glassmorphic UI**: A state-of-the-art interface built with React and Framer Motion, reflecting the clarity of the ecosystems we protect.
*   **Role-Based Dashboards**:
    *   **NGOs**: Submit restoration projects, track area coverage, and receive minted tokens upon approval.
    *   **Admin**: Oversee the registry, verify submissions, and trigger blockchain minting events.
    *   **Companies**: Purchase VCC (Veridian Carbon Credits) and track their 90-day validity for offsetting.
*   **Smart Contract Governance**:
    *   **Minting**: Triggered upon ecological verification.
    *   **Expiry Tracking**: ERC-20 tokens programmed with a 90-day expiry period to prevent hoarding and ensure active offsetting.

---

## 🛠️ Tech Stack

*   **Frontend**: React (Vite), Tailwind CSS v4, Framer Motion, Lucide React.
*   **Backend**: Node.js, Express.js.
*   **Database**: Supabase (PostgreSQL).
*   **Blockchain**: Solidity, Hardhat, Ethers.js.
*   **Authentication**: JWT-based with role encryption.

---

## 🚀 Getting Started

### 1. Prerequisites
*   Node.js (v18+)
*   MetaMask (for wallet interactions)
*   A Supabase Project

### 2. Blockchain Setup
```bash
cd blockchain
npm install
npx hardhat node
# In a new terminal
npx hardhat run scripts/deploy.js --network localhost
```
*Note the deployed contract address and update your backend `.env`.*

### 3. Backend Setup
1.  **Database**: Go to your Supabase SQL Editor and run the contents of `backend/supabase_schema.sql`.
2.  **Configure `.env`**:
    ```env
    PORT=5000
    SUPABASE_URL=your_supabase_url
    SUPABASE_KEY=your_supabase_anon_key
    JWT_SECRET=your_jwt_secret
    RPC_URL=http://127.0.0.1:8545
    PRIVATE_KEY=your_hardhat_private_key
    CONTRACT_ADDRESS=your_deployed_contract_addr
    ```
3.  **Run Server**:
    ```bash
    cd backend
    npm install
    npm run dev
    ```

### 4. Frontend Setup
```bash
cd veridian-frontend
npm install
npm run dev
```

---

## 📅 Platform Workflow

1.  **NGO**: Registers organization -> Submits Project (Area, Location, Documents) -> Status set to `Pending`.
2.  **Admin**: Logs in via `carboncredit@gmail.com` -> Reviews Queue -> Approves User/Project.
3.  **Blockchain Action**: Approval triggers the smart contract to **Mint** tokens to the NGO's wallet.
4.  **Company**: Registers -> Requests Tokens -> Admin Approves -> Tokens **Transferred** to Corporate Wallet.
5.  **Tracking**: All tokens are valid for 90 days as per the `CarbonToken.sol` logic.

---

## 🔒 Security

*   Admin access is hardcoded to a specific authorized email.
*   JWT payloads are signed and verified for all API requests.
*   Role-based middleware prevents cross-access between roles.

## 📄 License
This project is licensed under the MIT License - see the LICENSE file for details.
