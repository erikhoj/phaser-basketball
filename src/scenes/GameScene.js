import BaseScene from '../phaserExtensions/BaseScene';

class GameScene extends BaseScene
{
	score = 0;

	constructor()
	{
		super('gameScene');
	}

	preload()
	{
		this.load.image('basketball', 'assets/sprites/basketball.png');
	}

	create()
	{
		super.create();

		this.physics.world.setBoundsCollision(true, true, false, false);

		const basketball = this.physics.add.image(window.innerWidth / 2, window.innerHeight / 1.5, 'basketball');
		basketball.setScale(0.5, 0.5);
		basketball.body.setAllowGravity(false);
		basketball.body.setBounce(0.9, 0.9);
		basketball.body.setAngularDrag(0.1);

		const scoreText = this.add.text(window.innerWidth / 2, window.innerHeight / 1.3, '0', { fontSize: '64px', align: 'center' });
		scoreText.setOrigin(0.5, 0.5);

		const onHit = (pointer) =>
		{
			const basketBallCenter = basketball.getCenter();
			const clickPos = new Phaser.Math.Vector2(pointer.position.x, pointer.position.y);

			const clickDiff = basketBallCenter.subtract(clickPos);

			if (clickDiff.length() > 200)
			{
				return;
			}

			basketball.body.setAllowGravity(true);

			const velocityDir = clickDiff.normalize();
			const velocity = velocityDir.scale(800);

			basketball.body.setVelocityX(velocity.x);
			basketball.body.setVelocityY(velocity.y);

			basketball.body.setAngularVelocity(velocity.x / 2);

			this.score = this.score + 1;
			scoreText.setText(this.score);
		};

		this.input.on('pointerdown', onHit);

		basketball.body.setCollideWorldBounds(true);

		const bottom = this.physics.add.image(window.innerWidth / 2, window.innerHeight + 10, '');
		bottom.body.setAllowGravity(false);
		bottom.displayWidth = window.innerWidth;
		bottom.displayHeight = 20;
		bottom.body.updateBounds();

		this.physics.add.overlap(basketball, bottom, () => basketball.destroy());
	}
}

export default GameScene;
