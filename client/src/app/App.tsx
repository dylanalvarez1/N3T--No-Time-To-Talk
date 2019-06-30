import React from 'react';
import logo from '../logo.svg';
import './App.css';


interface Props {

}

interface State {
  user: string
}

class App extends React.Component {
  state = {
    user: ""
  }

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // No longer need to cast to any - hooray for react!
    e.preventDefault();
    let input = e.currentTarget;
    console.log(e);
    this.setState({ user: input.value });
  }

  render() {
    return (
      <div className="App">
        <input placeholder="test" onChange={this.handleChange} value={this.state.user} />
      </div>
    );
  }

}

export default App;
