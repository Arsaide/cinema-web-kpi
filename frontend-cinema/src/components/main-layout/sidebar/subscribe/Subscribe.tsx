'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

import SkeletonLoader from '@/components/ui/SkeletonLoader';
import Button from '@/components/ui/form-elements/button/Button';
import Heading from '@/components/ui/heading/Heading';

import { ADMIN_URL, PUBLIC_URL } from '@/config/url.config';

import { useProfile } from '@/hooks/useProfile';

import styles from './Subscribe.module.scss';

const Subscribe = () => {
	const { user, isLoading } = useProfile();
	const pathname = usePathname();
	const isAdminPage = pathname?.includes(ADMIN_URL.root());

	if (isLoading) {
		return <SkeletonLoader className={'h-[192px] w-full'} />;
	}

	return (
		!isAdminPage && (
			<div className={styles.subscribe}>
				<Heading className={styles.emoji}>{user?.isHasPremium ? ' 🫅🏻' : ' 👑'}</Heading>
				<Heading className={styles.title}>
					{user?.isHasPremium ? 'You have a premium account!!' : 'Premium subscribe!'}
				</Heading>
				<p>
					{user?.isHasPremium
						? 'Unlimited access to all videos!'
						: 'Get unlimited access to all movies!'}
				</p>
				<Link href={user?.isHasPremium ? PUBLIC_URL.explorer() : PUBLIC_URL.premium()}>
					<Button size={'sm'} className={styles.button}>
						{user?.isHasPremium ? 'Watch now!' : 'Subscribe now!'}
					</Button>
				</Link>
			</div>
		)
	);
};

export default Subscribe;
