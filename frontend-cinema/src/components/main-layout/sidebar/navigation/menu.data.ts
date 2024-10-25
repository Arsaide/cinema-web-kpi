import { IMenu } from '@/components/main-layout/sidebar/navigation/menu.interface';

import { ADMIN_URL, PUBLIC_URL } from '@/config/url.config';

export const userMenu: IMenu = {
	title: 'Menu',
	items: [
		{
			icon: 'LuCompass',
			link: PUBLIC_URL.home(),
			value: 'Home',
		},
		{
			icon: 'LuClapperboard',
			link: PUBLIC_URL.explorer(),
			value: 'Films',
		},
		{
			icon: 'LuFlame',
			link: PUBLIC_URL.trending(),
			value: 'Trending',
		},
	],
};

export const adminMenu: IMenu = {
	title: 'Menu',
	items: [
		{
			icon: 'LuLayoutDashboard',
			link: ADMIN_URL.root(),
			value: 'Statistics',
		},
		{
			icon: 'LuTv',
			link: ADMIN_URL.movies(),
			value: 'Films',
		},
		{
			icon: 'LuUsers',
			link: ADMIN_URL.users(),
			value: 'Users',
		},
		{
			icon: 'LuBook',
			link: ADMIN_URL.genres(),
			value: 'Genres',
		},
		{
			icon: 'LuBookDown',
			link: ADMIN_URL.actors(),
			value: 'Actors',
		},
		{
			icon: 'LuStar',
			link: ADMIN_URL.reviews(),
			value: 'Reviews',
		},
		{
			icon: 'LuDollarSign',
			link: ADMIN_URL.payments(),
			value: 'Payments',
		},
	],
};
