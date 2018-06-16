class SingleBullet extends Phaser.Group {
	constructor(game) {
		super(game, game.world, 'Single Bullet', false, true, Phaser.Physics.ARCADE);
		this.nextFire = 0;
		this.bulletSpeed = 600;
		this.fireRate = 100;

		for (var i = 0; i < 64; i++)
		{
			this.add(new Bullet({ game, key: 'bullet5' }), true);
		}
	}
	
	fire(source) {
		if (this.game.time.time < this.nextFire) { return; }

		var x = source.x + 10;
		var y = source.y + 10;

		this.getFirstExists(false).fire({ x, y, angle: 0, speed: this.bulletSpeed });

		this.nextFire = this.game.time.time + this.fireRate;
	}
}

class FrontAndBack extends Phaser.Group {
	constructor(game) {
		super(game, game.world, 'Front And Back', false, true, Phaser.Physics.ARCADE);
		
		this.nextFire = 0;
		this.bulletSpeed = 600;
		this.fireRate = 100;

		for (var i = 0; i < 64; i++)
		{
			this.add(new Bullet({ game, key: 'bullet5' }), true);
		}
	}
	
	fire(source) {
		if (this.game.time.time < this.nextFire) { return; }

		var x = source.x + 10;
		var y = source.y + 10;

		this.getFirstExists(false).fire({ x, y, angle: 0, speed: this.bulletSpeed });
		this.getFirstExists(false).fire({ x, y, angle: 180, speed: this.bulletSpeed });

		this.nextFire = this.game.time.time + this.fireRate;
	}
}

class ThreeWay extends Phaser.Group {
	constructor(game) {
		super(game, game.world, 'Three Way', false, true, Phaser.Physics.ARCADE);

		this.nextFire = 0;
		this.bulletSpeed = 600;
		this.fireRate = 200;

		for (var i = 0; i < 96; i++)
		{
			this.add(new Bullet({ game, key: 'bullet7' }), true);
		}
	}
	
	fire (source) {

		if (this.game.time.time < this.nextFire) { return; }

		var x = source.x + 10;
		var y = source.y + 10;

		this.getFirstExists(false).fire({ x, y, angle: 270, speed: this.bulletSpeed });
		this.getFirstExists(false).fire({ x, y, angle: 0, speed: this.bulletSpeed });
		this.getFirstExists(false).fire({ x, y, angle: 90, speed: this.bulletSpeed });

		this.nextFire = this.game.time.time + this.fireRate;

	}
}

class EightWay extends Phaser.Group {
	constructor (game) {

		super(game, game.world, 'Eight Way', false, true, Phaser.Physics.ARCADE);

		this.nextFire = 0;
		this.bulletSpeed = 600;
		this.fireRate = 300;

		for (var i = 0; i < 96; i++)
		{
			this.add(new Bullet({ game, key: 'bullet5' }), true);
		}
	}
	
	fire(source) {

		if (this.game.time.time < this.nextFire) { return; }

		var x = source.x + 16;
		var y = source.y + 10;

		this.getFirstExists(false).fire({ x, y, angle: 0, speed: this.bulletSpeed });
		this.getFirstExists(false).fire({ x, y, angle: 45, speed: this.bulletSpeed });
		this.getFirstExists(false).fire({ x, y, angle: 90, speed: this.bulletSpeed });
		this.getFirstExists(false).fire({ x, y, angle: 135, speed: this.bulletSpeed });
		this.getFirstExists(false).fire({ x, y, angle: 180, speed: this.bulletSpeed });
		this.getFirstExists(false).fire({ x, y, angle: 225, speed: this.bulletSpeed });
		this.getFirstExists(false).fire({ x, y, angle: 270, speed: this.bulletSpeed });
		this.getFirstExists(false).fire({ x, y, angle: 315, speed: this.bulletSpeed });

		this.nextFire = this.game.time.time + this.fireRate;

	}
}

class ScatterShot extends Phaser.Group {
	constructor (game) {

		super(game, game.world, 'Scatter Shot', false, true, Phaser.Physics.ARCADE);

		this.nextFire = 0;
		this.bulletSpeed = 600;
		this.fireRate = 60;

		for (var i = 0; i < 32; i++)
		{
			this.add(new Bullet({ game, key: 'bullet5' }), true);
		}
	}
	
	fire (source) {
		if (this.game.time.time < this.nextFire) { return; }

		var x = source.x + 16;
		var y = (source.y + source.height / 2) + this.game.rnd.between(-10, 10);

		this.getFirstExists(false).fire({ x, y, angle: 0, speed: this.bulletSpeed });

		this.nextFire = this.game.time.time + this.fireRate;
	}
}

const Weapon = {
	SingleBullet: SingleBullet,
	FrontAndBack: FrontAndBack,
	ThreeWay: ThreeWay,
	EightWay: EightWay,
	ScatterShot: ScatterShot,
};

	//////////////////////////////////////////////////////////////////////////
	//  Fires a streaming beam of lazers, very fast, in front of the player //
	//////////////////////////////////////////////////////////////////////////

	Weapon.Beam = function (game) {

		Phaser.Group.call(this, game, game.world, 'Beam', false, true, Phaser.Physics.ARCADE);

		this.nextFire = 0;
		this.bulletSpeed = 1000;
		this.fireRate = 45;

		for (var i = 0; i < 64; i++)
		{
			this.add(new Bullet({ game, key: 'bullet11' }), true);
		}

		return this;

	};

	Weapon.Beam.prototype = Object.create(Phaser.Group.prototype);
	Weapon.Beam.prototype.constructor = Weapon.Beam;

	Weapon.Beam.prototype.fire = function (source) {

		if (this.game.time.time < this.nextFire) { return; }

		var x = source.x + 40;
		var y = source.y + 10;

		this.getFirstExists(false).fire({ x, y, angle: 0, speed: this.bulletSpeed });

		this.nextFire = this.game.time.time + this.fireRate;

	};

	///////////////////////////////////////////////////////////////////////
	//  A three-way fire where the top and bottom bullets bend on a path //
	///////////////////////////////////////////////////////////////////////

	Weapon.SplitShot = function (game) {

		Phaser.Group.call(this, game, game.world, 'Split Shot', false, true, Phaser.Physics.ARCADE);

		this.nextFire = 0;
		this.bulletSpeed = 700;
		this.fireRate = 200;

		for (var i = 0; i < 84; i++)
		{
			this.add(new Bullet({ game, key: 'bullet8' }), true);
		}

		return this;

	};

	Weapon.SplitShot.prototype = Object.create(Phaser.Group.prototype);
	Weapon.SplitShot.prototype.constructor = Weapon.SplitShot;

	Weapon.SplitShot.prototype.fire = function (source) {

		if (this.game.time.time < this.nextFire) { return; }

		var x = source.x + 20;
		var y = source.y + 10;

		this.getFirstExists(false).fire({ x, y, angle: 0, speed: this.bulletSpeed, gy: -500 });
		this.getFirstExists(false).fire({ x, y, angle: 0, speed: this.bulletSpeed });
		this.getFirstExists(false).fire({ x, y, angle: 0, speed: this.bulletSpeed, gy: 500 });

		this.nextFire = this.game.time.time + this.fireRate;

	};

	///////////////////////////////////////////////////////////////////////
	//  Bullets have Gravity.y set on a repeating pre-calculated pattern //
	///////////////////////////////////////////////////////////////////////

	Weapon.Pattern = function (game) {

		Phaser.Group.call(this, game, game.world, 'Pattern', false, true, Phaser.Physics.ARCADE);

		this.nextFire = 0;
		this.bulletSpeed = 600;
		this.fireRate = 140;

		this.pattern = Phaser.ArrayUtils.numberArrayStep(-800, 800, 200);
		this.pattern = this.pattern.concat(Phaser.ArrayUtils.numberArrayStep(800, -800, -200));

		this.patternIndex = 0;

		for (var i = 0; i < 64; i++)
		{
			this.add(new Bullet({ game, key: 'bullet4' }), true);
		}

		return this;

	};

	Weapon.Pattern.prototype = Object.create(Phaser.Group.prototype);
	Weapon.Pattern.prototype.constructor = Weapon.Pattern;

	Weapon.Pattern.prototype.fire = function (source) {

		if (this.game.time.time < this.nextFire) { return; }

		var x = source.x + 20;
		var y = source.y + 10;

		this.getFirstExists(false).fire({ x, y, angle: 0, speed: this.bulletSpeed, gy: this.pattern[this.patternIndex] });

		this.patternIndex++;

		if (this.patternIndex === this.pattern.length)
		{
			this.patternIndex = 0;
		}

		this.nextFire = this.game.time.time + this.fireRate;

	};

	///////////////////////////////////////////////////////////////////
	//  Rockets that visually track the direction they're heading in //
	///////////////////////////////////////////////////////////////////

	Weapon.Rockets = function (game) {

		Phaser.Group.call(this, game, game.world, 'Rockets', false, true, Phaser.Physics.ARCADE);

		this.nextFire = 0;
		this.bulletSpeed = 400;
		this.fireRate = 250;

		for (var i = 0; i < 32; i++)
		{
			this.add(new Bullet({ game, key: 'bullet10' }), true);
		}

		this.setAll('tracking', true);

		return this;

	};

	Weapon.Rockets.prototype = Object.create(Phaser.Group.prototype);
	Weapon.Rockets.prototype.constructor = Weapon.Rockets;

	Weapon.Rockets.prototype.fire = function (source) {

		if (this.game.time.time < this.nextFire) { return; }

		var x = source.x + 10;
		var y = source.y + 10;

		this.getFirstExists(false).fire({ x, y, angle: 0, speed: this.bulletSpeed, gy: -700 });
		this.getFirstExists(false).fire({ x, y, angle: 0, speed: this.bulletSpeed, gy: 700 });

		this.nextFire = this.game.time.time + this.fireRate;

	};

	////////////////////////////////////////////////////////////////////////
	//  A single bullet that scales in size as it moves across the screen //
	////////////////////////////////////////////////////////////////////////

	Weapon.ScaleBullet = function (game) {

		Phaser.Group.call(this, game, game.world, 'Scale Bullet', false, true, Phaser.Physics.ARCADE);

		this.nextFire = 0;
		this.bulletSpeed = 800;
		this.fireRate = 100;

		for (var i = 0; i < 32; i++)
		{
			this.add(new Bullet({ game, key: 'bullet9' }), true);
		}

		this.setAll('scaleSpeed', 0.05);

		return this;

	};

	Weapon.ScaleBullet.prototype = Object.create(Phaser.Group.prototype);
	Weapon.ScaleBullet.prototype.constructor = Weapon.ScaleBullet;

	Weapon.ScaleBullet.prototype.fire = function (source) {

		if (this.game.time.time < this.nextFire) { return; }

		var x = source.x + 10;
		var y = source.y + 10;

		this.getFirstExists(false).fire({ x, y, angle: 0, speed: this.bulletSpeed });

		this.nextFire = this.game.time.time + this.fireRate;

	};

	/////////////////////////////////////////////
	//  A Weapon Combo - Single Shot + Rockets //
	/////////////////////////////////////////////

	Weapon.Combo1 = function (game) {

		this.name = "Combo One";
		this.weapon1 = new Weapon.SingleBullet(game);
		this.weapon2 = new Weapon.Rockets(game);

	};

	Weapon.Combo1.prototype.reset = function () {

		this.weapon1.visible = false;
		this.weapon1.callAll('reset', null, 0, 0);
		this.weapon1.setAll('exists', false);

		this.weapon2.visible = false;
		this.weapon2.callAll('reset', null, 0, 0);
		this.weapon2.setAll('exists', false);

	};

	Weapon.Combo1.prototype.fire = function (source) {

		this.weapon1.fire(source);
		this.weapon2.fire(source);

	};

	/////////////////////////////////////////////////////
	//  A Weapon Combo - ThreeWay, Pattern and Rockets //
	/////////////////////////////////////////////////////

	Weapon.Combo2 = function (game) {

		this.name = "Combo Two";
		this.weapon1 = new Weapon.Pattern(game);
		this.weapon2 = new Weapon.ThreeWay(game);
		this.weapon3 = new Weapon.Rockets(game);

	};

	Weapon.Combo2.prototype.reset = function () {

		this.weapon1.visible = false;
		this.weapon1.callAll('reset', null, 0, 0);
		this.weapon1.setAll('exists', false);

		this.weapon2.visible = false;
		this.weapon2.callAll('reset', null, 0, 0);
		this.weapon2.setAll('exists', false);

		this.weapon3.visible = false;
		this.weapon3.callAll('reset', null, 0, 0);
		this.weapon3.setAll('exists', false);

	};

	Weapon.Combo2.prototype.fire = function (source) {

		this.weapon1.fire(source);
		this.weapon2.fire(source);
		this.weapon3.fire(source);

	};