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

    getServerData = (val) => {
      if (val === this.state.user.name) {
        this.props.data(val);
      } else {
        this.props.error(val)
      }

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
    fetch(request).then(res => res.json()).then(resolve => this.getServerData(resolve))
  }

  signIn = () => {
    //do poprawki
      const headers = new Headers();
      headers.append("Content-Type", "application/json");
      const options = {
        method: "POST",
        headers,
        body: JSON.stringify(this.state)
      }
      const request = new Request("http://localhost:8080/sign", options);
      fetch(request).then(res => res.json()).then(resolve => this.props.error(resolve))
  }

  render () {
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
