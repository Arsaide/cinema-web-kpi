import React from 'react';

import Logo from '@/components/main-layout/sidebar/logo/Logo';
import MenuContainer from '@/components/main-layout/sidebar/navigation/MenuContainer';
import Subscribe from '@/components/main-layout/sidebar/subscribe/Subscribe';

import styles from './Sidebar.module.scss';

const Sidebar = () => {
	return (
		<div className={styles.wrapper}>
			<div className={styles.sidebar}>
				<Logo />
				<MenuContainer />
				<Subscribe />
			</div>
		</div>
	);
};

export default Sidebar;
