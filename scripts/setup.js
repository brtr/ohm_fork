const { OWNER_ADDRESS, OHM_ADDRESS, sOHM_ADDRESS, STAKING_ADDRESS, STAKING_HELPER_ADDRESS, WARM_UP_ADDRESS, TREASURY_ADDRESS, BOND_ADDRESS } = process.env;
const main = async () => {
  let contractFactory = await hre.ethers.getContractFactory('OlympusERC20Token');
  const ohmContract = contractFactory.attach(OHM_ADDRESS);

  contractFactory = await hre.ethers.getContractFactory('sOlympus');
  const sOHMContract = contractFactory.attach(sOHM_ADDRESS);

  contractFactory = await hre.ethers.getContractFactory('OlympusStaking');
  const stakingContract = contractFactory.attach(STAKING_ADDRESS);

  contractFactory = await hre.ethers.getContractFactory('OlympusTreasury');
  const treasuryContract = contractFactory.attach(TREASURY_ADDRESS);

  contractFactory = await hre.ethers.getContractFactory('OlympusBondDepository');
  const bondContract = contractFactory.attach(BOND_ADDRESS);

  await ohmContract.setVault(TREASURY_ADDRESS);
  await ohmContract.approve(STAKING_ADDRESS);
  console.log("set ohm success");
  await treasuryContract.queue(0, BOND_ADDRESS);
  console.log("set treasury queue success");
  await sOHMContract.initialize(STAKING_ADDRESS);
  console.log("set sohm success");
  await stakingContract.setContract(1, WARM_UP_ADDRESS);
  console.log("set staking success");
  await treasuryContract.toggle(0, BOND_ADDRESS, BOND_ADDRESS);
  console.log("set treasury queue success");
  await bondContract.setStaking(STAKING_HELPER_ADDRESS, true);
  await bondContract.initializeBondTerms(300, 33110, 26000, 50, 10000, 600000000000000, 450000000000000);
  console.log("set dai bond success");
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