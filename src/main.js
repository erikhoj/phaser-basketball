import 'phaser';
import GameScene from './scenes/GameScene';

const config = {
	// For more settings see <https://github.com/photonstorm/phaser/blob/master/src/boot/Config.js>
	width: window.innerWidth,
	height: window.innerHeight,
	type: Phaser.AUTO,
	scene: GameScene,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 1000 },
			debug: false,
		},
	},
};

const game = new Phaser.Game(config);
