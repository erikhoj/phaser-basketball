import Phaser from 'phaser';

class GameScene extends Phaser.Scene
{
	player;
	cursors;
	gameOver = false;

	constructor()
	{
		super('bootScene');
	}

	preload()
	{
		this.load.image('sky', 'assets/sprites/sky.png');
		this.load.image('ground', 'assets/sprites/platform.png');
		this.load.image('star', 'assets/sprites/star.png');
		this.load.image('bomb', 'assets/sprites/bomb.png');

		this.load.spritesheet('dude',
			'assets/sprites/dude.png',
			{ frameWidth: 32, frameHeight: 48 });
	}

	create()
	{
		this.add.image(400, 300, 'sky');

		const platforms = this.physics.add.staticGroup();

		platforms.create(400, 568, 'ground').setScale(2).refreshBody();

		platforms.create(600, 400, 'ground');
		platforms.create(50, 250, 'ground');
		platforms.create(750, 220, 'ground');

		this.player = this.physics.add.sprite(100, 450, 'dude');
		this.player.setBounce(0.2);
		this.player.setCollideWorldBounds(true);

		this.anims.create({
			key: 'left',
			frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
			frameRate: 10,
			repeat: -1,
		});

		this.anims.create({
			key: 'turn',
			frames: [{ key: 'dude', frame: 4 }],
			frameRate: 20,
		});

		this.anims.create({
			key: 'right',
			frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
			frameRate: 10,
			repeat: -1,
		});

		this.physics.add.collider(this.player, platforms);
		this.cursors = this.input.keyboard.createCursorKeys();

		const stars = this.physics.add.group({
			key: 'star',
			repeat: 11,
			setXY: { x: 12, y: 0, stepX: 70 },
		});

		stars.children.iterate(child => child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8)));

		this.physics.add.collider(stars, platforms);
		let score = 0;

		const scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill:'#000' });

		const bombs = this.physics.add.group();

		const collectStar = (player, star) => 
		{
			star.disableBody(true, true);

			score += 10;
			scoreText.setText('Score: ' + score)

			if(stars.countActive(true) === 0)
			{
				stars.children.iterate((child) => child.enableBody(true, child.x, 0, true, true));
				var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

				var bomb = bombs.create(x, 16, 'bomb');
				bomb.setBounce(1);
				bomb.setCollideWorldBounds(true);
				bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
				bomb.allowGravity = false;
			}
		}

		this.physics.add.overlap(this.player, stars, collectStar, null, this);
		this.physics.add.collider(bombs, platforms);

		const hitBomb = (player, bomb) =>
		{
			this.physics.pause();
			this.player.setTint(0xff0000);
			this.player.anims.play('turn');
			this.gameOver = true;
		};

		this.physics.add.overlap(this.player, bombs, hitBomb, null, this);
	}

	update()
	{
		if (this.cursors.left.isDown)
		{
			this.player.setVelocityX(-300);
			this.player.anims.play('left', true);
		}
		else if (this.cursors.right.isDown)
		{
			this.player.setVelocityX(300);
			this.player.anims.play('right', true);
		}
		else
		{
			this.player.setVelocityX(0);
			this.player.anims.play('turn');
		}

		if (this.cursors.up.isDown && this.player.body.touching.down)
		{
			this.player.setVelocityY(-330);
		}
	}
}

export default GameScene;
