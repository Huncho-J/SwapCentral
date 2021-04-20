import React, {Component} from 'react';
import Identicon from 'identicon.js';

class Navbar extends Component {

  render(){
  return (
    <nav className="navbar navbar-inverse bg-dark shadow">
    <div className="container-fluid">
      <div className="navbar-header">
        <a className="navbar-brand" href="#">SwapCentral Exchange</a>
      </div>
      <ul className="nav navbar-nav navbar-right">
        <li>
        <small className="text-secondary">
        <span id="account"className="glyphicon glyphicon-user bg-success"></span>{this.props.account}
        </small>
        {this.props.account
         ? <img className="ml-2"
            width='30'
            height='30'
            src={`data:image/png;base64, ${new Identicon(this.props.account,30).toString()}`}
          />
          :<span></span>
        }

      </li>
      </ul>
    </div>
  </nav>
  );
}
}



export default Navbar;
