class Body {

	constructor(
			pos = [0,0,0],
			vel = [0,0,0],
			acc = [0,0,0],
			rad = 0,
			mass = 100,
			texture = textures.pluto,
			alive = true
		) {
		this.pos = pos;
		this.vel = vel;
		this.acc = acc;
		this.rad = rad;
		this.mass = mass;
		this.alive = alive;
		this.texture = texture;
	}

	move() {
		this.pos[0] += this.vel[0];
		this.pos[1] += this.vel[1];
		this.pos[2] += this.vel[2];
	}

	accelerate() {
		this.vel[0] += this.acc[0];
		this.vel[1] += this.acc[1];
		this.vel[2] += this.acc[2];
	}

	render() {
		translate(this.pos[0], this.pos[1], this.pos[2]);
		texture(this.texture);
		sphere(this.rad);
		translate(-this.pos[0], -this.pos[1], -this.pos[2]);
	}

	run() {
		this.accelerate();
		this.move();
		this.render();
	}
}