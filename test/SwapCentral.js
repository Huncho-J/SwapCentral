const CentralToken = artifacts.require("./CentralToken.sol");
const SwapCentral = artifacts.require("./SwapCentral.sol");

require('chai')
  .use(require('chai-as-promised'))
  .should()

  function tokens(n){
    return web3.utils.toWei(n, 'ether');
  }

contract('SwapCentral', ([deployer, investor]) => {
  let centralToken, swapCentral

  before(async () => {
    centralToken = await CentralToken.deployed()
     swapCentral = await SwapCentral.deployed(centralToken.address)

  })
  describe('SwapCentral deployment',async () => {
    it('deploys successfully',async () => {
      const address = await swapCentral.address
      assert.notEqual(address, 0x0)
      assert.notEqual(address, '')
      assert.notEqual(address, null)
      assert.notEqual(address, undefined)
    })
    it('has a name',async () => {
      const name = await swapCentral.name()
      assert.equal(name, "SwapCentral Exchange")
    })
    it('Contract has Tokens', async() => {
      let balance = await centralToken.balanceOf(swapCentral.address)
      assert.equal(balance.toString(), tokens('1000000'))
    })

  })
  describe('buyTokens()', async() => {
    let result

    before(async () => {
      //purchase tokens before each test
    result = await swapCentral.buyTokens({from: investor, value: web3.utils.toWei('1', 'ether')})
    })
    it('allows user to purchase tokens at set rate', async() => {
      let investorBalance = await centralToken.balanceOf(investor)
      assert.equal(investorBalance.toString(), tokens('1000'))

      let swapCentralBalance
      swapCentralBalance = await centralToken.balanceOf(swapCentral.address)
      assert.equal(swapCentralBalance.toString(), tokens('999000'))

      //check eth was recieved
      swapCentralBalance = await web3.eth.getBalance(swapCentral.address)
      assert.equal(swapCentralBalance.toString(), web3.utils.toWei('1', 'ether'))

      const event = result.logs[0].args
      assert.equal(event.account, investor, 'Logs the correct  account')
      assert.equal(event.token, centralToken.address, 'central token bought')
      assert.equal(event.amount.toString(), tokens('1000'), 'amount purchased is correct')
      assert.equal(event.rate.toString(), 1000, 'rate is correct')

    })
  })

})
