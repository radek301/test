import React from "react";
import ReactDOM from "react-dom";
import LogPanel from "./LogPanel"

  class BookOfHealth extends React.Component{
    constructor(props) {
      super(props);
      this.state = {
                    serverStatus: false,
                    isLoaded: false,
                    serverData: null};

    }

    componentWillMount() {
     console.log("willMount")
     fetch("http://localhost:8080")
     .then(res => {if (res.status === 200) {
       this.setState({
         serverStatus: true
       })
     }})
    }

  componentDidMount() {
    console.log("did mount")
    }

    getData = (val) => {
      this.setState({
        serverData: val,
        isLoaded: true
      })
    }

    render () {
      return (
        <div>
          <LogPanel sendData={this.getData}/>
          {this.state.serverStatus
            ?
              <h1 style={{"display": this.state.isLoaded?"none":"block"}}>zaloguj się</h1>
            :
            <h1>serwer nie odpowiada</h1>}
          <h2>{this.state.serverData}</h2>
        </div>
      );
    }
  }







ReactDOM.render(<BookOfHealth />,document.getElementById('root'));
