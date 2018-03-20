import React from "react";
import ReactDOM from "react-dom";
import LogPanel from "./LogPanel"


  class BookOfHealth extends React.Component{
    constructor(props) {
      super(props);
      this.state = {isLoaded: false,
                    serverData: null};
    }


    componentWillMount() {
     console.log("willMount")
    }

    componentDidMount() {
      console.log("did mount")
      fetch("http://localhost:3000/db")
      .then(res => res.json())
      .then(resolve => this.setState({
        serverData: resolve
      }))
    }

    clickChild = () => {
      this.setState({
        isLoaded: true
      })
    }

    render () {
      return (
        <div>
          <LogPanel log={this.clickChild} />
          <h1>{this.state.isLoaded?this.state.serverData.user.name:"zaloguj się"}</h1>
        </div>

      );
    }
  }



ReactDOM.render(<BookOfHealth />,document.getElementById('root'));
