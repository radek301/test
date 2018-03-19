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
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          document.getElementById("demo").innerHTML = this.responseText;
        }
      };
      xhttp.open("POST", "http://localhost:3000/db", true);
      xhttp.send(JSON.stringify(this.state.user));
      console.log(JSON.stringify(this.state))
  }

  render () {
    return (
      <div>
        <input onKeyUp={this.typeEvent}></input>
        <button onClick={this.clickEvent}
          style={{backgroundColor:"lightblue"}}>Log In</button>
        <p>{this.props.name}</p>
      </div>
    );
  }
}

export default LogPanel;
