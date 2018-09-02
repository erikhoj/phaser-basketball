import 'phaser';
import BaseScene from './phaserExtensions/BaseScene';

const config = {
	// For more settings see <https://github.com/photonstorm/phaser/blob/master/src/boot/Config.js>
	width: window.innerWidth,
	height: window.innerHeight,
	type: Phaser.AUTO,
	scene: BaseScene,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 300 },
			debug: false,
		},
	},
};

const game = new Phaser.Game(config);
