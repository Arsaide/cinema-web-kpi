import { PointMaterial, Points } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import React, { useRef, useState } from 'react';
import { Points as ThreePoints } from 'three';

import { generateRandomPointsInSphere } from '@/utils/points-in-sphere/generateRandomPointsInSphere';

const StarsBackground = () => {
	const ref = useRef<ThreePoints>(null);
	const [sphere] = useState<Float32Array>(() => generateRandomPointsInSphere(1200, 0.2, 1));

	useFrame((_, delta) => {
		if (ref.current) {
			ref.current.rotation.x -= delta / 10;
			ref.current.rotation.y -= delta / 15;
		}
	});
	return (
		<group rotation={[0, 0, Math.PI / 4]}>
			<Points ref={ref} positions={sphere} stride={3} frustumCulled>
				<PointMaterial
					transparent
					color={'#fff'}
					size={0.0025}
					sizeAttenuation={true}
					depthWrite={false}
				/>
			</Points>
		</group>
	);
};

export default StarsBackground;
