function rand(max, min = 0) {
	return random([random(min,max),-random(min,max)]);
}

function rand3(max, min = 0) {
	return [rand(max, min),rand(max, min),rand(max, min)];
}

function randColor(range) {
	return [random(range),random(range),random(range)];
}

function distance(pos1, pos2) {
	return Math.sqrt(
			Math.pow(pos1[0] - pos2[0], 2)+
			Math.pow(pos1[1] - pos2[1], 2)+
			Math.pow(pos1[2] - pos2[2], 2)
		);
}

function gravity(body1, body2) {
	let F = [
		body2.pos[0] - body1.pos[0],
		body2.pos[1] - body1.pos[1],
		body2.pos[2] - body1.pos[2]
	];
	let K = body1.mass * body2.mass / Math.pow(distance(body1.pos, body2.pos), 3);
	return [F[0]*K, F[1]*K, F[2]*K];
}

function collision(pos1, pos2, d){
	return distance(pos1, pos2) < d;
}