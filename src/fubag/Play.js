import Phaser from 'phaser';

export default class Play extends Phaser.Scene {
  constructor() {
    super({ key: 'play' });
  }

  start() {
    this.cover.visible = false;
    this.scoreText.setVisible(true);
    this.moveFudai();
  }
  create() {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;
    this.bg = this.add.image(width / 2, height / 2, 'gameBg');

    this.player = this.physics.add
      .sprite(width / 2, height - 100, 'dude')
      .setDisplaySize(32 * 5, 48 * 5);

    // press key to start
    this.input.keyboard.on('keydown', () => {
      this.start();
    });

    this.score = 0;
    this.scoreText = this.add
      .text(width / 2, height / 2, 'score: 0', {
        fontSize: '32px',
        fill: 'red',
      })
      .setOrigin(0.5)
      .setVisible(false)
      .setInteractive()
      .on('pointerdown', (pointer, localX, localY, event) => {
        this.scene.pause();
        this.game.updateStore({ visible: true });
      });

    this.player.setInteractive();
    this.input.setDraggable(this.player);
    this.player.setCollideWorldBounds(true);

    //controlled with drag
    this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
      gameObject.x = dragX;
    });

    // 由键盘控制方向 Input Events
    this.cursors = this.input.keyboard.createCursorKeys();

    this.fudai = this.physics.add.group({
      key: 'fudai',
      repeat: 7,
      setXY: { x: 12, y: 0, stepX: 100 },
    });

    this.particles = this.add.particles('red');

    this.fudai.children.iterate((child) => {
      var emitter = this.particles.createEmitter({
        speed: 100,
        scale: { start: 1, end: 0.1 },
        blendMode: 'ADD',
      });

      emitter.startFollow(child.body, 20);
    });

    this.physics.add.overlap(this.player, this.fudai, (player, fudai) => {
      fudai.disableBody(true, true);
      this.sound.play('score');
      this.score += 10;
      this.game.updateStore({ score: this.score });

      this.scoreText.setText('score:' + this.score);
      if (this.fudai.countActive(true) === 0) {
        this.fudai.children.iterate(function (child) {
          child.enableBody(true, child.x, 0, true, true);
        });
      }
    });

    this.cover = this.add.sprite(width / 2, height / 2, 'cover').setInteractive();
    // click to start
    this.cover.on('pointerdown', () => {
      this.start();
    });

    // 由键盘控制方向 Input Events
    this.cursors = this.input.keyboard.createCursorKeys();

    // 将玩家的转身，走路以及停止设置动画 Our player animations, turning, walking left and walking right.
    // 向左走
    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1,
    });
    //转身
    this.anims.create({
      key: 'turn',
      frames: [{ key: 'dude', frame: 4 }],
      frameRate: 20,
    });
    //向右走
    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1,
    });
  }
  moveFudai() {
    this.fudai.children.iterate((child) => {
      child.body.gravity.y = Phaser.Math.Between(100, 500);
    });
  }

  update() {
    var that = this;
    var cursors = this.cursors;
    var player = this.player;
    this.fudai.children.iterate(function (child) {
      if (child.y > that.sys.canvas.height) {
        child.disableBody(true, true);

        if (that.fudai.countActive(true) === 0) {
          that.fudai.children.iterate(function (child) {
            child.enableBody(true, child.x, 0, true, true);
          });
        }
      }
    });

    // player move by keyboard
    if (cursors.left.isDown) {
      player.setVelocityX(-460);
      player.anims.play('left', true);
    } else if (cursors.right.isDown) {
      player.setVelocityX(460);
      player.anims.play('right', true);
    } else {
      player.setVelocityX(0);
      player.anims.play('turn');
    }
  }
}
