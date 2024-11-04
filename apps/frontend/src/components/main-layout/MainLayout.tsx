import React, { FC, PropsWithChildren } from 'react';

import Header from '@/components/main-layout/header/Header';
import Sidebar from '@/components/main-layout/sidebar/Sidebar';

import styles from './MainLayout.module.scss';

const MainLayout: FC<PropsWithChildren<unknown>> = ({ children }) => {
	return (
		<div className={styles.layout}>
			<div className={'flex-1'}>
				<Header />
				<Sidebar />
				<main>{children}</main>
			</div>
		</div>
	);
};

export default MainLayout;
