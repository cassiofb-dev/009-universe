let width = screen.width, height = screen.height;
let uni, textures, number;

function preload() {
	textures = {
		sun: loadImage('009-universe/assets/sun.jpg'),
		mercury: loadImage('009-universe/assets/mercury.jpg'),
		venus: loadImage('009-universe/assets/venus.jpg'),
		earth: loadImage('009-universe/assets/earth.jpg'),
		mars: loadImage('009-universe/assets/mars.jpg'),
		jupiter: loadImage('009-universe/assets/jupiter.jpg'),
		pluto: loadImage('009-universe/assets/pluto.jpg'),
		background: loadImage('009-universe/assets/hudf.jpg')
	};
}

function setup() {
	createCanvas(width, height, WEBGL);
	perspective(PI / 3.0, width / height, 0.1, 10000000);
	noStroke();
	uni = new Universe();
	uni.create();
}

function draw() {
	background(0);
	lights();
	uni.run();
}

function keyTyped() {
	switch(key) {
		case 'w':
			uni.camera.acc(2);
			break;
		case 's':
			uni.camera.acc(-1);
			break;
		case 'p':
			uni.camera.vel = [0,0,0];
			break;
	}
	number = Number(key);
	if(number === NaN) return;
	uni.goto(number);
}