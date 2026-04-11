const hre = require("hardhat");

async function main() {
  const CarbonToken = await hre.ethers.getContractFactory("CarbonToken");
  const token = await CarbonToken.deploy();

  await token.waitForDeployment();

  console.log(`CarbonToken deployed to: ${await token.getAddress()}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
