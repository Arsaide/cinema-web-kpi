import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { PUBLIC_URL } from '@/config/url.config';

import styles from './Logo.module.scss';

const Logo = () => {
	return (
		<Link href={PUBLIC_URL.home()} className={styles.logo}>
			<Image
				src={'/images/logo.svg'}
				alt={'Arsaide Video Hosting Logotype'}
				width={50}
				height={50}
			/>
			<div className={styles.text}>
				Arsaide<span className={'text-primary'}>Video</span>
			</div>
		</Link>
	);
};

export default Logo;
