import React from 'react';
import './App.css';
import { init } from './flappy-bird';

class FlappyBird extends React.Component {
  constructor(props: {} | Readonly<{}>) {
    super(props);
    this.handleLoad = this.handleLoad.bind(this);
  }

  componentDidMount() {
    window.addEventListener('load', this.handleLoad);
  }

  componentWillUnmount() {
    window.removeEventListener('load', this.handleLoad);
  }

  handleLoad() {
    init();
  }
  render() {
    return (
      <div className="flappy-bird">
        <div className="score">
          <span></span>
        </div>
        <canvas id="flappyBird"></canvas>
      </div>
    );
  }
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <FlappyBird />
      </header>
    </div>
  );
}

export default App;
