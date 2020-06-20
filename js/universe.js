class Universe {

	constructor() {
		this.bodies = [];
		this.camera = new Camera();
	}

	create() {
		this.bodies.push(new Body(
			[0,0,0],
			[0,0,0],
			[0,0,0],
			6960,
			1989000,
			textures.sun
		));
		this.bodies.push(new Body(
			[500000,0,0],
			[0,1.7,0],
			[0,0,0],
			24,
			0.3,
			textures.mercury
		));
		this.bodies.push(new Body(
			[-1080000,0,0],
			[0,-1.3,0],
			[0,0,0],
			60,
			4.8,
			textures.venus
		));
		this.bodies.push(new Body(
			[1500000,0,0],
			[0,1,0],
			[0,0,0],
			63,
			5.9,
			textures.earth
		));
		this.bodies.push(new Body(
			[-2490000,0,0],
			[0,-0.8,0],
			[0,0,0],
			33,
			0.6,
			textures.mars
		));
		this.bodies.push(new Body(
			[8160000,0,0],
			[0,0.4,0],
			[0,0,0],
			699,
			1898,
			textures.jupiter
		));
		this.bodies.push(new Body(
			[8001,0,0],
			[0,15.7,0],
			[0,0,0],
			10,
			0.1,
			textures.pluto
		));
	}

	remake() {
		this.bodies = [];
		this.create();
	}

	calculate() {
		let i, j, F, Fg, alives = [], max = this.bodies.length;
		for(i = 0; i < max; i++) {
			F = [0,0,0];
			for(j = 0; j < max; j++) {
				if(i !== j && this.bodies[i].alive) {
					if(collision(this.bodies[i].pos,this.bodies[j].pos,this.bodies[i].rad + this.bodies[j].rad)) {
						let fusion = new Body(
							[
								(this.bodies[i].pos[0]+this.bodies[j].pos[0])/2,
								(this.bodies[i].pos[1]+this.bodies[j].pos[1])/2,
								(this.bodies[i].pos[2]+this.bodies[j].pos[2])/2
							],
							[0,0,0],
							[0,0,0],
							this.bodies[i].rad*0.8 + this.bodies[j].rad*0.8,
							this.bodies[i].mass + this.bodies[j].mass,
							randColor(255)
						);
						this.bodies[i].alive = false;
						this.bodies[j].alive = false;
						this.bodies.push(fusion);
					}
					Fg = gravity(this.bodies[i],this.bodies[j]);
					F[0] += Fg[0];
					F[1] += Fg[1];
					F[2] += Fg[2];
				}
			}
			this.bodies[i].acc = [
				F[0]/this.bodies[i].mass,
				F[1]/this.bodies[i].mass,
				F[2]/this.bodies[i].mass
			];
		}
		for(i = 0; i < this.bodies.length; i++) {
			if(this.bodies[i].alive) alives.push(this.bodies[i]);
		}
		this.bodies = alives;
	}

	goto(idx = 0) {
		if(idx < 0 || idx > this.bodies.length) return;
		let pos = this.bodies[idx].pos;
		let rad = this.bodies[idx].rad;
		let target = [pos[0], pos[1], pos[2] + 1.2*rad];
		this.camera.goto(target, this.bodies[idx].vel);
	}

	run() {
		texture(textures.background);
		sphere(30000000);
		this.calculate();
		this.camera.run();
		for(const body of this.bodies) {
			body.run();
		}
	}
}