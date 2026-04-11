const { ethers } = require('ethers');

// ABI of the CarbonToken contract - normally loaded from artifacts
const ABI = [
  "function mint(address to, uint256 amount) public",
  "function transferWithExpiry(address to, uint256 amount, uint256 durationInDays) public",
  "function balanceOf(address account) public view returns (uint256)"
];

class BlockchainService {
  constructor() {
    this.provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
    this.wallet = new ethers.Wallet(process.env.PRIVATE_KEY, this.provider);
    this.contract = new ethers.Contract(process.env.CONTRACT_ADDRESS, ABI, this.wallet);
  }

  async mintTokens(to, amount) {
    try {
      const tx = await this.contract.mint(to, ethers.parseEther(amount.toString()));
      await tx.wait();
      return tx.hash;
    } catch (error) {
      console.error('Minting failed:', error);
      throw error;
    }
  }

  async transferTokens(to, amount, days = 90) {
    try {
      const tx = await this.contract.transferWithExpiry(to, ethers.parseEther(amount.toString()), days);
      await tx.wait();
      return tx.hash;
    } catch (error) {
      console.error('Transfer failed:', error);
      throw error;
    }
  }

  async getBalance(address) {
    const balance = await this.contract.balanceOf(address);
    return ethers.formatEther(balance);
  }
}

module.exports = new BlockchainService();
