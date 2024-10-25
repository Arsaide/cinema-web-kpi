'use client';

import { usePathname } from 'next/navigation';
import React from 'react';

import Menu from '@/components/main-layout/sidebar/navigation/Menu';
import GenreMenu from '@/components/main-layout/sidebar/navigation/genre-menu/GenreMenu';
import { adminMenu, userMenu } from '@/components/main-layout/sidebar/navigation/menu.data';

import { ADMIN_URL } from '@/config/url.config';

const MenuContainer = () => {
	const pathname = usePathname();

	const isAdminPage = pathname?.includes(ADMIN_URL.root());

	return (
		<div className={'flex flex-col w-full flex-1'}>
			<Menu menu={isAdminPage ? adminMenu : userMenu} />
			{!isAdminPage && <GenreMenu />}
		</div>
	);
};

export default MenuContainer;
