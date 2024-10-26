import React from 'react';

import Search from '@/components/main-layout/header/search/Search';
import UserMenu from '@/components/main-layout/header/user-menu/UserMenu';

import styles from './Header.module.scss';

const Header = () => {
	return (
		<div className={styles.wrapper}>
			<div className={styles.header}>
				<Search />
				<UserMenu />
			</div>
		</div>
	);
};

export default Header;
