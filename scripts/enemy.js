class Enemy extends Phaser.Sprite {
	constructor({ game, key, frame }) {
		super(game, 0, 0, key, frame);
		
		this.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;

		this.anchor.set(0.5, 0.5);

		this.checkWorldBounds = true;
		this.outOfBoundsKill = true;
		this.exists = false;

		this.tracking = false;
		this.scaleSpeed = 0;
	}
	
	spawn({ x, y, scale = 1, speed, gx = 0, gy = 0 }) {
		window.enemy = this;
		this.reset(x, y);
		this.scale.set(scale);
		this.scale.y *= -1;
		this.body.velocity.x = speed;
		this.body.gravity.set(gx, gy);
	}
}

class EnemySwarm extends Phaser.Group {
	constructor(game) {
		super(game, game.world, 'Enemy Swarm', false, true, Phaser.Physics.ARCADE);
		this.nextFire = 0;
		this.fireRate = 200;

		for (var i = 0; i < 64; i++)
		{
			const enemy = new Enemy({ game, key: 'dragon', frame: 9 });
			enemy.animations.add('fly', [9,10,11,12], 5, true, true);
			this.add(enemy, true);
		}
	}
	
	spawn() {
		if (this.game.time.time < this.nextFire) { return; }
		
		const y = this.game.rnd.between(20, this.game.height - 20);
		const x = this.game.width - 1;
		const speed = this.game.rnd.between(20, 500);
		const scale = this.game.rnd.realInRange(0.5, 1.2);
		
		const sprite = this.getFirstExists(false);
		if(sprite) {
			sprite.animations.play('fly');
			sprite.spawn({ x, y, speed: -speed, scale: -scale });
		}

		this.nextFire = this.game.time.time + this.fireRate;
	}
}