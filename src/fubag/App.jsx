import React, { useEffect, useRef } from 'react';
import Phaser from 'phaser';
import Start from './Start';
import { Modal, Cell, Button, Select } from 'zarm';
import { useSelector } from 'react-redux';
import useUpdateStore from '~/hooks/useUpdateStore';

const App = () => {
  const app = useSelector((state) => state.app);
  const updateStore = useUpdateStore();
  const gameRef = useRef();

  const width = 750;
  const height = 1206;

  useEffect(() => {
    var config = {
      type: Phaser.AUTO,
      width,
      height,
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 0 },
          debug: false,
        },
      },
      // scene: [Start, Play],
    };

    var game = (gameRef.current = new Phaser.Game(config));
    game.updateStore = updateStore;

    game.scene.add('start', Start, true);
  }, []);

  return (
    <div id="c1">
      <Modal
        title="score"
        visible={app.visible}
        footer={
          <Button
            block
            theme="primary"
            onClick={() => {
              gameRef.current.scene.resume('play');
              updateStore({ visible: false });
            }}
          >
            确认
          </Button>
        }
      >
        <p>your scores {app.score}</p>
      </Modal>
    </div>
  );
};

export default App;
