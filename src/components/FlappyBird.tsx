import React from "react";
import { init } from "../flappy-bird";

export type FlappyBirdProps = {
  playerAsset?: string;
};
export class FlappyBird extends React.Component<FlappyBirdProps> {
  componentDidMount() {
    const { playerAsset } = this.props;
    init({ playerAsset });
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
