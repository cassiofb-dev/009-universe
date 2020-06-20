class Camera {

	constructor(position = [10000,10000,10000], center = [0,0,0], direction = [0,0,-1], velocity = [0,0,0]) {
		this.cen = center;
		this.pos = position;
		this.dir = direction;
		this.vel = velocity;
		this.teta = PI/4;
		this.beta = -PI/2 - 0.5;
	}

	goto(target, vel = [0,0,0]) {
		this.pos = target;
		this.vel = [vel[0],vel[1],vel[2]];
	}

	acc(c = 1) {
		this.vel[0] += (this.cen[0] - this.pos[0])*c;
		this.vel[1] += (this.cen[1] - this.pos[1])*c;
		this.vel[2] += (this.cen[2] - this.pos[2])*c;
	}

	move() {
		this.pos[0] += this.vel[0];
		this.pos[1] += this.vel[1];
		this.pos[2] += this.vel[2];
	}

	rotation() {
		this.teta -= map(mouseX, 0, width, -PI/360, PI/360)*this.dir[2];
		let signal = (this.beta > 0) ? 1 : -1;
		this.beta -= map(mouseY, 0, height, -PI/360, PI/360);
		signal += (this.beta > 0) ? 1 : -1;
		if(!signal) {
			this.dir[2] = -this.dir[2];
		}
		if(this.beta > PI || this.beta < - PI) {
			this.beta = -this.beta;
			this.dir[2] = -this.dir[2];
		}
		this.cen[0] = this.pos[0] + cos(this.teta)*sin(this.beta);
		this.cen[1] = this.pos[1] + sin(this.teta)*sin(this.beta);
		this.cen[2] = this.pos[2] + cos(this.beta);
	}

	run() {
		this.move();
		this.rotation();
		camera(
			this.pos[0], this.pos[1], this.pos[2],
			this.cen[0], this.cen[1], this.cen[2],
			this.dir[0], this.dir[1], this.dir[2]
		);
	}
}