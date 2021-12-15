const hre = require("hardhat");
const { OWNER_ADDRESS, OHM_ADDRESS } = process.env;

async function main() {
  const NFT = await hre.ethers.getContractFactory("OlympusERC20Token");
  const contract = NFT.attach(OHM_ADDRESS);
  await contract.mint(OWNER_ADDRESS, 100000000000000);  //10w OHM
}
main().then(() => process.exit(0)).catch(error => {
  console.error(error);
  process.exit(1);
});