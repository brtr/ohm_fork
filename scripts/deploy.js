const { DAI_ADDRESS, UNISWAP_ROUTER_ADDRESS, DAO_ADDRESS } = process.env;

const main = async () => {
  let contractFactory = await hre.ethers.getContractFactory('OlympusERC20Token');
  const ohmContract = await contractFactory.deploy();
  await ohmContract.deployed();
  console.log("OHM Contract deployed to:", ohmContract.address);

  contractFactory = await hre.ethers.getContractFactory('OlympusTreasury');
  const treasuryContract = await contractFactory.deploy(ohmContract.address, DAI_ADDRESS, UNISWAP_ROUTER_ADDRESS, 1); //change needed block for queue
  await treasuryContract.deployed();
  console.log("Treasury Contract deployed to:", treasuryContract.address);

  contractFactory = await hre.ethers.getContractFactory('OlympusBondDepository');
  const bondContract = await contractFactory.deploy(ohmContract.address, DAI_ADDRESS, treasuryContract.address, DAO_ADDRESS, "0x0000000000000000000000000000000000000000");
  await bondContract.deployed();
  console.log("Dai Bond Contract deployed to:", bondContract.address);

  contractFactory = await hre.ethers.getContractFactory('sOlympus');
  const sOHMContract = await contractFactory.deploy();
  await sOHMContract.deployed();
  console.log("sOHM Contract deployed to:", sOHMContract.address);

  contractFactory = await hre.ethers.getContractFactory('OlympusStaking');
  const stakingContract = await contractFactory.deploy(ohmContract.address, sOHMContract.address, 2200, 737, 9749041); //change start block
  await stakingContract.deployed();
  console.log("Staking Contract deployed to:", stakingContract.address);

  contractFactory = await hre.ethers.getContractFactory('StakingHelper');
  const stakingHelperContract = await contractFactory.deploy(ohmContract.address, stakingContract.address);
  await stakingHelperContract.deployed();
  console.log("StakingHelper Contract deployed to:", stakingHelperContract.address);

  contractFactory = await hre.ethers.getContractFactory('StakingWarmup');
  const warmUpContract = await contractFactory.deploy(stakingContract.address, sOHMContract.address);
  await warmUpContract.deployed();
  console.log("Staking warmup Contract deployed to:", warmUpContract.address);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();