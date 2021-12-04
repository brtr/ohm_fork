# 在合约上输入数量比例是1比1000000000，即如果需要stake 1个OHM，amount需要填1000000000 (9个0)

## 发布流程

1. 首先发布OHM和sOHM两个合约，不需要参数
2. 然后是Staking，发布需要传OHM_ADDRESS和sOHM_ADDRESS, EPOCH_LENGTH, FIRST_EPOCH_NUMBER, FIRST_EPOCH_BLOCK， 暂时没发现后三个参数有什么影响
3. 再是StakingHelper，发布需要OHM_ADDRESS和STAKING_ADDRESS
4. 最后是StakingWarmUp，发布需要STAKING_ADDRESS和sOHM_ADDRESS
5. 更新sOHM合约里面STAKING_ADDRESS
6. 在Staking合约的write页面找到setContract，contract填1，address填Warmup合约地址

## Mint

在OHM合约write页面找到mint，填入需要mint的地址和数量即可

## Stake

1. 如果是第一次stake需要在OHM合约write页面找到approve，spender填入StakingHelper的合约地址，amount填入一个比较大的数字避免下次重复这个步骤
2. 打开StakingHelper合约write页面找到stake，amount填入你想要stake的OHM数量

## Unstake

1. 如果是第一次stake需要在sOHM合约write页面找到approve，spender填入Staking的合约地址，amount填入一个比较大的数字避免下次重复这个步骤
2. 打开Staking合约write页面找到unstake，amount填入你想要unstake的sOHM数量
