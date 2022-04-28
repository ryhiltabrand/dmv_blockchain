import React, { Component } from "react";

 export default class ServicesF extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        account: this.props.account,
        services: this.props.services,
        
      };
    }
  
    componentWillReceiveProps(props) {
      this.setState({account: props.account, services: props.services});
    }
  
  
    user = () => {
      return(this.state.user.methods.getOwner().send({from: this.state.account}).then(function(res){
          console.log(res);
      }).catch(function(err){
          console.log(err)
      }))
    }
  
    render() {
  
      return (
        <div>
          {console.log(this.state)}
          {this.state.account}
          {this.state.user !== null ? (
            <button onClick={()=>this.user()}>get account</button>
          ) :
          (<p>Error</p>)}
        </div>
      )
    }
  }