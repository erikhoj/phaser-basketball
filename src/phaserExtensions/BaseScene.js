import Phaser from 'phaser';

class BaseScene extends Phaser.Scene
{
	create()
	{
		const resize = () =>
		{
			const width = window.innerWidth;
			const height = window.innerHeight;

			this.physics.world.setBounds(0, 0, width, height);
			this.cameras.main.setSize(width, height);

			this.sys.game.renderer.resize(width, height);
		}

		resize();
		window.addEventListener('resize', resize);
	}
}

export default BaseScene;
