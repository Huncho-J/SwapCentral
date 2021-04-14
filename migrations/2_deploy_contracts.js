const SwapCentral = artifacts.require("SwapCentral.sol");
const CentralToken = artifacts.require("CentralToken.sol");

function tokens(n){
  return web3.utils.toWei(n, 'ether');
}

module.exports = async function (deployer) {
  //deploy central token
  await deployer.deploy(CentralToken);
  const centralToken = await CentralToken.deployed()

  //deploy exchange contract
  await deployer.deploy(SwapCentral,centralToken.address);
  const swapCentral = await SwapCentral.deployed()

  await centralToken.transfer(swapCentral.address, tokens('1000000'))
};
