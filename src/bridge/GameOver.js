import Phaser from 'phaser';
import Play from './Play';

export default class GameOver extends Phaser.Scene {
  constructor() {
    super({ key: 'gameover' });
  }

  create() {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    this.add.image(width / 2, height / 2, 'bg1').setDisplaySize(width, height);
    var text = this.add
      .text(width / 2, 180, 'Game over!!', {
        fontSize: '60px',
        fill: '#fff',
        scale: 0.1,
      })
      .setOrigin(0.5, 0);

    this.tweens.add({
      targets: text,
      scale: 1.5,
      ease: 'Cubic.easeOut',
      duration: 400,
    });

    var btn = this.add
      .text(width / 2, height / 2, '重新开始', {
        fontSize: '40px',
        fill: '#fff',
      })
      .setOrigin(0.5)
      .setInteractive();

    btn.on('pointerdown', () => {
      this.scene.stop();
      this.scene.start('play', Play);
    });
  }
}
