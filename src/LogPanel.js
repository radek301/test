import React from "react";

class LogPanel extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
                    user: {
                      name: ""
                    }
                  }
  }

  typeEvent = (e) => {
    this.setState({user: {
      name: e.target.value
    }})
  }

    demoMethod = (val) => {
     this.props.sendData(val);
   }

  signIn = () => {
    //do poprawki
      const headers = new Headers();
      headers.append("Content-Type", "application/json");
      const options = {
        method: "POST",
        headers,
        body: JSON.stringify(this.state.user)
      }
      const request = new Request("http://localhost:8080/sign", options);
      fetch(request).then(res => res.json()).then(resolve => console.log(resolve))
  }

  logIn = () => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    const options = {
      method: "POST",
      headers,
      body: JSON.stringify(this.state.user)
    }
    const request = new Request("http://localhost:8080/log", options);
    fetch(request).then(res => res.json()).then(resolve => this.demoMethod(resolve))
  }


  render () {
    console.log("LogPanel", this.state)
    return (
      <div>
        <input type="text" onKeyUp={this.typeEvent}></input>
        <button onClick={this.logIn}
          style={{backgroundColor:"lightblue"}}>Log In</button>
        <button onClick={this.signIn}
          style={{backgroundColor:"lightblue"}}>Sign In</button>
      </div>
    );
  }
}

export default LogPanel;
