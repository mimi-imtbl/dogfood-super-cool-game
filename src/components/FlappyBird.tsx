import React from 'react';
import { init } from '../flappy-bird';

export class FlappyBird extends React.Component {
  componentDidMount() {
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
