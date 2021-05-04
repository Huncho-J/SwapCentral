
import React, {Component} from 'react';
import Web3 from 'web3';
import Navbar from './Navbar';
import Main from './Main';
import 'bootstrap/dist/css/bootstrap.min.css';
import Identicon from 'identicon.js';
import CentralToken from './contracts/CentralToken.json';
import SwapCentral from './contracts/SwapCentral.json';
//import Main from './main'

class App extends Component {

  async componentWillMount() {
      await this.loadWeb3()
      await this.loadBlockChainData()
    }
  async loadWeb3() {
      if (window.ethereum) {
        window.web3 = new Web3(window.ethereum)
        await window.ethereum.enable()
    }
      else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider)
    }
      else{
        window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
    }
    async loadBlockChainData(){
      const web3 = window.web3

      //load accounts
      const accounts = await web3.eth.getAccounts()
      this.setState({account: accounts[0]})
      const ethBalance = await web3.eth.getBalance(this.state.account)
      this.setState({ethBalance: ethBalance})

      //Get Network ID
      const networkId = await web3.eth.net.getId()

      //load smart SwapCentral contract proper
      const swapCentralData = SwapCentral.networks[networkId]
      if(swapCentralData){
       const swapCentral = new web3.eth.Contract(SwapCentral.abi, swapCentralData.address)
        //set contract state
        this.setState({swapCentral: swapCentral})
      }
      //Load CentralToken contract
      const centralTokenData = CentralToken.networks[networkId]
      if(centralTokenData){
       const centralToken = new web3.eth.Contract(CentralToken.abi, centralTokenData.address)
        //set contract state
        this.setState({centralToken: centralToken})
        //set current user account CentralToken balance
        let centralTokenBalance = await centralToken.methods.balanceOf(this.state.account).call()
        this.setState({centralTokenBalance})

        //let sctBal = await centralToken.methods.balanceOf(this.state.swapCentral.address).call()
        //console.log(sctBa)

      }
     else{
     window.alert('contract was not deployed to test network.')
   }
   this.setState({loading:false})
  }

  buyTokens = (etherAmount) =>{
    this.setState({loading: true})
    this.state.swapCentral.methods.buyTokens().send({
      from:this.state.account,
      value: etherAmount}).on('transactionHash', (hash) =>{
        this.setState({loading: false})
      })
  }

  sellTokens = (centralTokenAmount) =>{
    this.setState({loading: true})
    this.state.centralToken.methods.approve('0x3EBDa8aBE340060668422B423eE3720765a183Db', centralTokenAmount).send({from:this.state.account}).on('transactionHash', (hash) =>{
      this.state.swapCentral.methods.sellTokens(centralTokenAmount).send({from: this.state.account}).on('transactionHash', (hash) =>{
          this.setState({loading: false})
      })
    })

  }

  constructor(props) {
      super(props)
      this.state = {
        account: '',
        swapCentral:null,
        centralToken:null,
        ethBalance:'0',
        centralTokenBalance:'0',
        loading: true
      }
    }

  render(){
    let content
    if(this.state.loading){
      content = <p id="loader" className="text-center">Loading..</p>
    }else{
      console.log(this.state.ethBalance)

      content = <Main ethBalance = {this.state.ethBalance}
                      centralTokenBalance={this.state.centralTokenBalance}
                      buyTokens ={this.buyTokens}
                      sellTokens = {this.sellTokens}

                />
    }
  return (
    <div>
      <Navbar account = {this.state.account} />
      <div className="container-fluid mt-5">
        <div className="row">
         <main role="main" className="col-lg-12 d-flex text-center">
          <div className="content mr-auto ml-auto">
            {content}
          </div>
        </main>
        </div>
      </div>

    </div>

  );
}
}

export default App;
