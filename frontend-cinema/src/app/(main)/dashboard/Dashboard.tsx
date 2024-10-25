'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

import { removeFromStorage } from '@/api/services/auth/auth-token.service';

import Button from '@/components/ui/form-elements/button/Button';
import Heading from '@/components/ui/heading/Heading';

import { PUBLIC_URL } from '@/config/url.config';

import { useProfile } from '@/hooks/useProfile';

import styles from './Dashboard.module.scss';

const Dashboard = () => {
	const { user } = useProfile();

	const { push } = useRouter();

	if (!user) return null;

	const logout = () => {
		removeFromStorage();
		push(PUBLIC_URL.auth());
	};

	return (
		<div className={'px-6'}>
			<div className={styles.wrapper}>
				<Heading className={styles.heading}>Hello, {user.name}</Heading>
				<div className={styles.avatar}>
					<Image
						src={user.avatarPath}
						alt={user.name}
						width={180}
						height={180}
						className={'rounded-full'}
					/>
				</div>
				<Button className={styles.btn} variant={'outline'} onClick={logout}>
					Sign out
				</Button>
			</div>
		</div>
	);
};

export default Dashboard;
