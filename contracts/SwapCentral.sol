pragma solidity ^0.5.0;
import "./CentralToken.sol";

contract SwapCentral{
  string public name = "SwapCentral Exchange";
  CentralToken public centralToken;
  uint public rate = 1000;

  event CentralTokenPurchased(
    address account,
    address token,
    uint amount,
    uint rate
  );

  constructor(CentralToken _centralToken) public {
    centralToken = _centralToken;
  }

  //redemtion rate = # of tokens they receieve for 1 ether
  //tokemAmount = amount of eth * redemtion rate
  function buyTokens() public payable {
    //Get how much centralTokens to be sent based on rate
    uint tokenAmount = msg.value * rate;
    //ensure exchange has enough centralTokens stored
    require(centralToken.balanceOf(address(this)) >= tokenAmount);

    centralToken.transfer(msg.sender,tokenAmount);

    //Emit purchase event
    emit CentralTokenPurchased(msg.sender, address(centralToken), tokenAmount, rate);
  }
}
