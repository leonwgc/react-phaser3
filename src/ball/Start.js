import Phaser from 'phaser';
import bg from './assets/sky.png';
import apple from './assets/apple.png';
import ball from './assets/ball.png';

export default class Play extends Phaser.Scene {
  constructor() {
    super({ key: 'start' });
  }
  init() {
    if (this.game.device.os.desktop) {
      this.scale.scaleMode = Phaser.Scale.FIT;
    } else {
      this.scale.scaleMode = Phaser.Scale.CENTER_BOTH;
    }
  }

  preload() {
    this.load.image('bg', bg);
    this.load.image('apple', apple);
    this.load.image('ball', ball);

    var width = this.cameras.main.width;
    var height = this.cameras.main.height;

    var percentText = this.make
      .text({
        x: width / 2,
        y: height / 2 - 5,
        text: '0%',
        style: {
          font: '18px monospace',
          fill: '#ffffff',
        },
      })
      .setOrigin(0.5);

    this.load.on('progress', function (value) {
      percentText.setText('loading...');
    });

    this.load.on('complete', () => {
      percentText.destroy();
    });
  }
  create() {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    this.add.image(width / 2, height / 2, 'bg').setDisplaySize(width, height);
    var btn = this.add
      .text(width / 2, height / 2, '开始游戏', {
        fontSize: '32px',
        fill: 'red',
      })
      .setOrigin(0.5)
      .setInteractive();

    btn.on('pointerdown', () => {
      this.scene.start('play');
    });
  }
}
