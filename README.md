# 在合约上输入数量比例是1比1000000000，即如果需要stake 1个OHM，amount需要填1000000000 (9个0)

## 发布准备

复制env_sample到.env并修改已有参数

## 发布合约

```
npx hardhat run scripts/deploy.js --network rinkeby
```

## 配置合约
```
npx hardhat run scripts/setup.js --network rinkeby
```

## 验证合约 (国内网络可能会超时，在服务器上验证过没问题)

```
npx hardhat verify --network rinkeby 合约地址
```

## Mint

在OHM合约write页面找到mint，填入需要mint的地址和数量即可, 或者
```
npx hardhat run scripts/mint.js --network rinkeby  // 代码默认数量是10w，可以修改
```

## Stake

1. 如果是第一次stake需要在OHM合约write页面找到approve，spender填入StakingHelper的合约地址，amount填入一个比较大的数字避免下次重复这个步骤
2. 打开StakingHelper合约write页面找到stake，amount填入你想要stake的OHM数量

## Unstake

1. 如果是第一次stake需要在sOHM合约write页面找到approve，spender填入Staking的合约地址，amount填入一个比较大的数字避免下次重复这个步骤
2. 打开Staking合约write页面找到unstake，amount填入你想要unstake的sOHM数量
