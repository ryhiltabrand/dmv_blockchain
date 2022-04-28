import React, { Component } from "react";

 export default class Account extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        account: this.props.account,
        services: this.props.services,
        user: this.props.user,
      };
    }
  
    componentWillReceiveProps(props) {
      this.setState({account: props.account, services: props.services, user: props.user});
    }
  
  
    user = () => {
      console.log(this.state.user.methods.getOwner().send({from: this.state.account}))
    }
  
    render() {
  
      return (
        <div>
          {console.log(this.state)}
          {this.state.account}
          {this.state.user !== null ? (
            <button onClick={()=>this.user("f")}>get account</button>
          ) :
          (<p>Error</p>)}
        </div>
      )
    }
  }