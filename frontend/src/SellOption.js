import React, {Component} from 'react';
import Identicon from 'identicon.js';
import Web3 from 'web3';

class SellOption extends Component {
  constructor(props) {
      super(props)
      this.state = {
        output: '0'
      }
    }
  render(){
  return (

        <form className="mb-3" onSubmit={(event) => {
          event.preventDefault()
          let centralTokenAmount = this.input.value.toString()
          centralTokenAmount = window.web3.utils.toWei(centralTokenAmount, 'Ether')
          this.props.sellTokens(centralTokenAmount)
        }}>
          <div>
            <label className="float-left"> <b>Input</b> </label>
            <span className="float-right text-muted">
             Balance: {window.web3.utils.fromWei((this.props.centralTokenBalance),'Ether')}
            </span>
          </div>
          <div className="input-group mb-4">
           <input
              type="text"
              onChange={(event)=> {
                const centralTokenAmount = this.input.value.toString()
                this.setState({
                  output: centralTokenAmount / 1000
                })
              }}
              ref={(input) => {this.input = input}}
              className="form-control form-control-lg"
              placeholder="0"
              required />
           <div className="input-group-append">
            <div className="input-group-text">
             <img src="" height='32' alt=""/>
             &nbsp;&nbsp;&nbsp; SCT
           </div>
         </div>
        </div>
         <div>
          <label className="float-left"> <b>Output</b> </label>
          <span className="float-right text-muted">
          Balance: {window.web3.utils.fromWei((this.props.ethBalance),'Ether')}
          </span>
        </div>
        <div className="input-group mb-2">
          <input
           type="text"
           className="form-control form-control-lg"
           placeholder="0"
           value ={this.state.output}
           disabled
          />
      <div className="input-group-append">
        <div className="input-group-text">
          <img src="" height='32' alt=""/>
            &nbsp; ETH
          </div>
        </div>
      </div>
      <div className="mb-5">
         <span className="float-left text-muted">Exchange Rate</span>
        <span className="float-right text-muted">1000 SCT = 1 ETH </span>
    </div>
      <button type="submit" className="btn btn-primary btn-block btn-lg green">SWAP</button>
    </form>

  );
}
}



export default SellOption;
