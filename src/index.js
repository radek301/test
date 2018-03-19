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
      fetch("http://localhost:3000/db")
      .then(res => res.json())
      .then(resolve => this.setState({
        isLoaded: true,
        serverData: resolve
      }))
    }


    render () {
      console.log("render", this.state)
      return (
        <div>
          <LogPanel name={this.state.serverData && this.state.serverData.user.name}/>
        </div>

      );
    }
  }



ReactDOM.render(<BookOfHealth />,document.getElementById('root'));
