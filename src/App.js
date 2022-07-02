import React from "react";
import axios from "axios";
import "./styles.css";

const colors = [
  "#1abc9c",
  "#2ecc71",
  "#3498db",
  "#9b59b6",
  "#34495e",
  "#f39c12",
  "#e67e22",
  "#e74c3c",
  "#95a5a6",
  "#bdc3c7"
];

class App extends React.Component {
  state = {
    quote: "",
    background: colors[0],
    counter: 0
  };

  componentDidMount() {
    this.getQuote();
  }

  getQuote = () => {
    this.changeBackground();
    axios
      .get("https://api.adviceslip.com/advice")
      .then((response) => {
        //console.log(response.data.slip.advice);
        this.setState({
          quote: response.data.slip.advice
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  changeBackground = () => {
    console.log("test");
    if (this.state.counter + 1 === 10) {
      this.setState({
        background: colors[this.state.counter]
      });
      this.setState({
        counter: 0
      });
    } else {
      this.setState({
        counter: this.state.counter + 1
      });
      this.setState({
        background: colors[this.state.counter]
      });
    }
  };

  render() {
    return (
      <div className="App" style={{ background: this.state.background }}>
        <div className="wrapper">
          <p className="quote">"{this.state.quote}"</p>
          <button
            style={{ background: this.state.background }}
            className="newQuoteButton"
            onClick={this.getQuote}
          >
            New Quote
          </button>
        </div>
      </div>
    );
  }
}

export default App;
