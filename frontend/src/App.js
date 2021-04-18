
import React, {Component} from 'react';
import Web3 from 'web3';
import CentralToken from './contracts/CentralToken.json'
import SwapCentral from './contracts/SwapCentral.json'
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

      //Get Network ID
      const networkId = await web3.eth.net.getId()

      //load smart SwapCentral contract proper
      const swapCentralData = SwapCentral.networks[networkId]
      if(swapCentralData){
       const swapCentral = new web3.eth.Contract(SwapCentral.abi, swapCentralData.address)
        //set TodoList state
        this.setState({swapCentral: swapCentral})
      }

      const centralTokenData = CentralToken.networks[networkId]
      if(centralTokenData){
       const swapCentral = new web3.eth.Contract(CentralToken.abi, centralTokenData.address)
        //set TodoList state
        this.setState({centralToken: CentralToken})
      }else{
     window.alert('contract was not deployed to test network.')
   }

   this.setState({loading:  false})

  }
  constructor(props) {
      super(props)
      this.state = {
        account: '',
        swapCentral:null,
        loading: true
      }
    }
  render(){
  return (
    <div className="App">
      <header className="App-header">

        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>

      </header>
    </div>
  );
}
}

export default App;
