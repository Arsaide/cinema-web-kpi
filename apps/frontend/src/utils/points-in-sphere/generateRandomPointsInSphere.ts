export const generateRandomPointsInSphere = (
	count: number,
	minRadius: number,
	maxRadius: number,
): Float32Array => {
	const points = new Float32Array(count * 3);
	for (let i = 0; i < count; i++) {
		const theta = Math.random() * Math.PI * 2;
		const phi = Math.acos(2 * Math.random() - 1);
		const r = Math.cbrt(
			Math.random() * (Math.pow(maxRadius, 3) - Math.pow(minRadius, 3)) + Math.pow(minRadius, 3),
		);
		const x = r * Math.sin(phi) * Math.cos(theta);
		const y = r * Math.sin(phi) * Math.sin(theta);
		const z = r * Math.cos(phi);
		points[i * 3] = x;
		points[i * 3 + 1] = y;
		points[i * 3 + 2] = z;
	}

	return points;
};
