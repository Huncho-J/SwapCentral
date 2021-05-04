import React, {Component} from 'react';
import Identicon from 'identicon.js';
import Web3 from 'web3';
import BuyOption from './BuyOption'
import SellOption from './SellOption'


class Main extends Component {
  constructor(props) {
      super(props)
      this.state = {
        currentForm: 'buy'
      }
    }

  render(){
    let content
    if(this.state.currentForm ==='buy'){
      content = <BuyOption
                  ethBalance={this.props.ethBalance}
                  centralTokenBalance={this.props.centralTokenBalance}
                  buyTokens={this.props.buyTokens}
                />
    }else{
      content = <SellOption
                  ethBalance={this.props.ethBalance}
                  centralTokenBalance={this.props.centralTokenBalance}
                  sellTokens={this.props.sellTokens}
                />
    }
  return (
    <div id="content ">
    <p> Swap Central Exchange</p>
      <div className="d-flex justify-content-between mb-3">
        <button className="btn btn-light"
                onClick={(event) => {
                  this.setState({currentForm: 'buy'})
                }}
        >
          Buy
        </button>
      <span className="text-muted"> &lt; &nbsp; &gt;</span>
      <button className="btn btn-light"
              onClick={(event) => {
              this.setState({currentForm: 'sell'})
      }}
      >
        Sell
      </button>
      </div>
      <div className="card mb-4">
       <div className="card-body">
        {content}
  </div>
    </div>

    </div>

  );
}
}



export default Main;
