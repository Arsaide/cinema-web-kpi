'use client';

import React from 'react';

import Heading from '@/components/ui/heading/Heading';

import { useProfile } from '@/hooks/useProfile';

import styles from './Payments.module.scss';

const Payments = () => {
	const { user } = useProfile();

	return (
		<div className={'px-6'}>
			<div className={styles.wrapper}>
				<Heading className={styles.heading}>Hello, {(user && user.name) || 'User'}!</Heading>
			</div>
		</div>
	);
};

export default Payments;
