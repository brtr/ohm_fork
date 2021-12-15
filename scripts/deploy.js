const main = async () => {
  let contractFactory = await hre.ethers.getContractFactory('OlympusERC20Token');
  const ohmContract = await contractFactory.deploy();
  await ohmContract.deployed();
  console.log("OHM Contract deployed to:", ohmContract.address);

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