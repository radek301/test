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

  signIn = () => {
      const headers = new Headers();
      headers.append("Content-Type", "application/json");
      const options = {
        method: "POST",
        headers,
        body: JSON.stringify(this.state.user)
      }
      const request = new Request("http://localhost:3000/user", options);
      fetch(request)
  }

  logIn = () => {
    fetch("http://localhost:3000/db")
     .then(res => res.json())
     .then(e => {
       if (this.state.user.name.toLowerCase() === e.user.name.toLowerCase()) {
         this.props.log()
       }
     })
  }


  render () {
    return (
      <div>
        <input type="text" id="name" onKeyUp={this.typeEvent}></input>
        <button onClick={this.logIn}
          style={{backgroundColor:"lightblue"}}>Log In</button>
        <button onClick={this.signIn}
          style={{backgroundColor:"lightblue"}}>Sign In</button>
      </div>
    );
  }
}

export default LogPanel;
