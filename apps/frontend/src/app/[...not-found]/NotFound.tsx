import Link from 'next/link';
import React from 'react';

import Button from '@/components/ui/form-elements/button/Button';
import Heading from '@/components/ui/heading/Heading';

import { PUBLIC_URL } from '@/config/url.config';

import styles from './NotFoundPage.module.scss';

const NotFound = () => {
	return (
		<div className={styles.wrapper}>
			<div className={styles.area}>
				<div className={styles.emoji}>🤷‍♂️</div>
				<Heading>404. Page isn&apos;t found!</Heading>
				<p>It looks like such a page doesn&apos;t exist</p>
				<Link href={PUBLIC_URL.home()} className={styles.link}>
					<Button size={'sm'}>Go to main page</Button>
				</Link>
			</div>
		</div>
	);
};

export default NotFound;
