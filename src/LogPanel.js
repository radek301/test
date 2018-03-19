import React from "react";
import BookOfHealth from "./index"

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
    console.log(this.state.user)
  }

  clickEvent = () => {
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

  render () {
    return (
      <div>
        <input type="text" id="name" onKeyUp={this.typeEvent}></input>
        <button onClick={this.clickEvent}
          style={{backgroundColor:"lightblue"}}>Log In</button>
        <p>{this.props.name}</p>
      </div>
    );
  }
}

export default LogPanel;
