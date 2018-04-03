import React from "react";
import ReactDOM from "react-dom";
import LogPanel from "./LogPanel"

  class BookOfHealth extends React.Component{
    constructor(props) {
      super(props);
      this.state = {
                    serverStatus: false,
                    isLoged: false,
                    serverData: null,
                    serverError: "zaloguj się"};

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

    checkLogIn = (val) => {
        this.setState({
        serverData: val,
        isLoaded: true
      })
    }

    checkError = (val) => {
        this.setState({
        serverError: val,
        isLoaded: false
      })
    }

    render () {
      return (
        <div>
          <LogPanel data={this.checkLogIn} error={this.checkError}/>
          {this.state.serverStatus
            ?
              <h1 style={{"display": this.state.isLoaded?"none":"block"}}>{this.state.serverError}</h1>
            :
            <h1>serwer nie odpowiada</h1>}
          <h1>{this.state.isLoaded?this.state.serverData:""}</h1>
        </div>
      );
    }
  }







ReactDOM.render(<BookOfHealth />,document.getElementById('root'));
