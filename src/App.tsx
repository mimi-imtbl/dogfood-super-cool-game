import React from 'react';
import './App.css';
import { init } from './flappy-bird';

class FlappyBird extends React.Component {
  constructor(props: {} | Readonly<{}>) {
    super(props);
  }

  componentDidMount() {
    window.addEventListener('load', init);
  }

  componentWillUnmount() {
    window.removeEventListener('load', init);
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
