import React, { useEffect } from 'react';
import Phaser from 'phaser';
import Start from './Start';
import Play from './Play';

const App = () => {
  const width = 750;
  const height = 1335;
  useEffect(() => {
    var config = {
      type: Phaser.AUTO,
      width,
      height,
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 300 },
          debug: true,
        },
      },
      scene: [Start, Play],
    };

    var game = new Phaser.Game(config);
  }, []);

  return <div id="c1"></div>;
};

export default App;
