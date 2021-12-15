const { OWNER_ADDRESS, OHM_ADDRESS, sOHM_ADDRESS, STAKING_ADDRESS, STAKING_HELPER_ADDRESS, WARM_UP_ADDRESS, TREASURY_ADDRESS, DAO_ADDRESS, BOND_ADDRESS, CACULATOR_ADDRESS } = process.env;
const main = async () => {
  let contractFactory = await hre.ethers.getContractFactory('OlympusERC20Token');
  const ohmContract = contractFactory.attach(OHM_ADDRESS);

  contractFactory = await hre.ethers.getContractFactory('sOlympus');
  const sOHMContract = contractFactory.attach(sOHM_ADDRESS);

  contractFactory = await hre.ethers.getContractFactory('OlympusStaking');
  const stakingContract = contractFactory.attach(STAKING_ADDRESS);

  await ohmContract.setVault(OWNER_ADDRESS);
  console.log("set ohm success");
  await sOHMContract.initialize(STAKING_ADDRESS);
  console.log("set sohm wool success");
  await stakingContract.setContract(1, WARM_UP_ADDRESS);
  console.log("set staking success");
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