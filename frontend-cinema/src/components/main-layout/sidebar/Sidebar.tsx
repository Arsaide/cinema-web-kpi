'use client';

import { usePathname } from 'next/navigation';
import React from 'react';

import Logo from '@/components/main-layout/sidebar/logo/Logo';
import MenuContainer from '@/components/main-layout/sidebar/navigation/MenuContainer';
import Subscribe from '@/components/main-layout/sidebar/subscribe/Subscribe';

import { ADMIN_URL } from '@/config/url.config';

import styles from './Sidebar.module.scss';

const Sidebar = () => {
	const pathname = usePathname();
	const isAdminPage = pathname?.includes(ADMIN_URL.root());
	return (
		<div className={styles.wrapper}>
			<div className={styles.sidebar}>
				<Logo />
				<MenuContainer />
				{!isAdminPage && <Subscribe />}
			</div>
		</div>
	);
};

export default Sidebar;
