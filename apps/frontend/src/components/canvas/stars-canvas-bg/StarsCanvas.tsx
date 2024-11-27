'use client';

import { Canvas } from '@react-three/fiber';
import React, { Suspense } from 'react';

import StarsBackground from '@/components/canvas/stars-canvas-bg/StarsBackground';

import styles from './StarCanvas.module.scss';

const StarsCanvas = () => {
	return (
		<div className={styles.wrapper}>
			<video className={styles.blackhole} src={'/blackhole.webm'} muted autoPlay loop></video>
			<Canvas camera={{ position: [0, 0, 1] }}>
				<Suspense fallback={null}>
					<StarsBackground />
				</Suspense>
			</Canvas>
		</div>
	);
};

export default StarsCanvas;
