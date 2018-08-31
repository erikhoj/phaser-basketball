import Phaser from 'phaser';

class GameScene extends Phaser.Scene
{
	constructor()
	{
		super({
			key: 'gameScene',
			mapAdd:
			{
				game: 'game',
			}
		});
	}

	create()
	{
		const resize = () =>
		{
			const width = window.innerWidth;
			const height = window.innerHeight;

			this.physics.world.setBounds(0, 0, width, height, true, true, true, true);
			this.cameras.main.setSize(width, height);

			this.game.renderer.resize(width, height);
		}

		resize();
		window.addEventListener('resize', resize);
	}
}

export default GameScene;
