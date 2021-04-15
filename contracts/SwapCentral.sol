pragma solidity ^0.5.0;
import "./CentralToken.sol";

contract SwapCentral{
  string public name = "SwapCentral Exchange";
  CentralToken public centralToken;
  uint public rate = 1000;

  event CentralTokensPurchased(
    address account,
    address token,
    uint amount,
    uint rate
  );
  event CentralTokensSold(
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
    emit CentralTokensPurchased(msg.sender, address(centralToken), tokenAmount, rate);
  }

  function sellTokens(uint _amount) public {
    //calculate ether to send
    uint etherAmount = _amount / rate;
    //check contract balance
    require(address(this).balance >= etherAmount);
    //user can't sell more than they have
    require(centralToken.balanceOf(msg.sender) >= _amount);
    //send ether to investor
    msg.sender.transfer(etherAmount);

    //receieve SCT Tokens
    centralToken.TransferFrom(msg.sender, address(this), _amount);
    emit CentralTokensSold(msg.sender, address(centralToken),_amount, rate);
  }
}
