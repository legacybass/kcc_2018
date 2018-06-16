const game = new Phaser.Game(800, 600, Phaser.AUTO, 'game');
const numbers = ['Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten'];

class PhaserGame {
	constructor() {
		this.background = null;
		this.foreground = null;

		this.player = null;
		this.playerHealth = null;
		
		this.cursors = null;
		this.speed = 300;

		this.weapons = [];
		this.currentWeapon = 0;
		this.weaponName = null;
		
		this.swarms = [];
		this.currentSwarm = 0;
		
		this.playing = true;
	}
	
	init() {
		this.game.renderer.renderSession.roundPixels = true;
		this.physics.startSystem(Phaser.Physics.ARCADE);
	}
	
	preload() {
		this.load.image('background', '/images/layer8.png');
		this.load.image('midground', '/images/layer4.png');
		this.load.image('foreground', '/images/layer3.png');
		this.load.image('player', '/images/ship.png');
		this.load.bitmapFont('shmupfont', '/images/shmupfont.png', '/images/shmupfont.xml');
		game.load.atlasJSONHash('dragon', 'dragon.png', '/images/dragon.json');

		for (var i = 1; i <= 11; i++)
		{
			this.load.image(`bullet${i}`, `/images/bullet${i}.png`);
		}
	}
	
	create() {
		this.background = this.add.tileSprite(0, 0, 1920, 1080, 'background');
		this.background.autoScroll(-40, 0);
		this.background.scale.setTo(0.8, 0.8);
		
		this.midground = this.add.tileSprite(0, 0, 1920, 1080, 'midground');
		this.midground.autoScroll(-80, 0);
		this.midground.scale.setTo(0.8, 0.8);
		
		this.foreground = this.add.tileSprite(0, 0, 1920, 1080, 'foreground');
		this.foreground.autoScroll(-120, 0);
		this.foreground.scale.setTo(0.8, 0.8);

		this.weapons.push(new Weapon.SingleBullet(this.game));
		this.weapons.push(new Weapon.FrontAndBack(this.game));
		this.weapons.push(new Weapon.ThreeWay(this.game));
		this.weapons.push(new Weapon.EightWay(this.game));
		this.weapons.push(new Weapon.ScatterShot(this.game));
		this.weapons.push(new Weapon.Beam(this.game));
		this.weapons.push(new Weapon.SplitShot(this.game));
		this.weapons.push(new Weapon.Pattern(this.game));
		this.weapons.push(new Weapon.Rockets(this.game));
		this.weapons.push(new Weapon.ScaleBullet(this.game));

		this.currentWeapon = 0;

		for (var i = 1; i < this.weapons.length; i++)
		{
			this.weapons[i].visible = false;
		}
		
		this.swarms.push(new EnemySwarm(this.game));
		this.swarms.forEach(s => s.visible = true);

		this.player = this.add.sprite(64, 200, 'player');
		this.physics.arcade.enable(this.player);
		this.player.body.collideWorldBounds = true;
		this.player.health = 5;
		this.player.invulnerableTime = 1000;
		this.player.lastHitTime = 0;
		

		this.weaponName = this.add.bitmapText(8, 564, 'shmupfont', "ENTER = Next Weapon", 24);
		this.playerHealth = this.add.bitmapText(8, 0, 'shmupfont', `Health: ${numbers[this.player.health]}`, 24);

		//  Cursor keys to fly + space to fire
		this.cursors = this.input.keyboard.createCursorKeys();

		this.input.keyboard.addKeyCapture([ Phaser.Keyboard.SPACEBAR ]);

		var changeKey = this.input.keyboard.addKey(Phaser.Keyboard.ENTER);
		changeKey.onDown.add(this.nextWeapon, this);
	}
	
	nextWeapon() {
		if (this.currentWeapon > 9)
		{
			this.weapons[this.currentWeapon].reset();
		}
		else
		{
			this.weapons[this.currentWeapon].visible = false;
			this.weapons[this.currentWeapon].callAll('reset', null, 0, 0);
			this.weapons[this.currentWeapon].setAll('exists', false);
		}

		//  Activate the new one
		this.currentWeapon++;

		if (this.currentWeapon === this.weapons.length)
		{
			this.currentWeapon = 0;
		}

		this.weapons[this.currentWeapon].visible = true;

		this.weaponName.text = this.weapons[this.currentWeapon].name;
	}
	
	update() {
		this.player.body.velocity.set(0);
		
		this.game.physics.arcade.collide(this.weapons[this.currentWeapon], this.swarms[this.currentSwarm], null, (weapon, enemy) => {
			// handle collision
			weapon.kill();
			enemy.kill();
		});
		
		if(this.player.alive) {
			const time = this.player.lastHitTime + this.player.invulnerableTime;
			
			if(time < this.game.time.time && this.game.physics.arcade.collide(this.player, this.swarms[this.currentSwarm])) {
				this.player.damage(1);
				this.playerHealth.text = `Health: ${numbers[this.player.health]}`;
				this.player.lastHitTime = this.game.time.time;
				
				if(!this.player.alive || this.player.health <= 0)
					this.player.body.gravity.set(400, 10000);
			}

			if (this.cursors.left.isDown)
			{
				this.player.body.velocity.x = -this.speed;
			}
			else if (this.cursors.right.isDown)
			{
				this.player.body.velocity.x = this.speed;
			}

			if (this.cursors.up.isDown)
			{
				this.player.body.velocity.y = -this.speed;
			}
			else if (this.cursors.down.isDown)
			{
				this.player.body.velocity.y = this.speed;
			}

			if (this.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR))
			{
				this.weapons[this.currentWeapon].fire(this.player);
			}
		}
		else {
			this.player.visible = true;
			this.player.exists = true;
			this.playing = false;
		}
		
		if(!this.playing) {
			this.weaponName.text = "Game Over";
		}
		else {
			this.swarms[this.currentSwarm].spawn();
		}
	}
}

game.state.add('Game', PhaserGame, true);