import React from 'react';

import Menu from '@/components/main-layout/sidebar/navigation/Menu';
import { useGenresMenu } from '@/components/main-layout/sidebar/navigation/genre-menu/useGenresMenu';
import SkeletonLoader from '@/components/ui/SkeletonLoader';

const GenreMenu = () => {
	const { data, isLoading } = useGenresMenu();

	return isLoading ? (
		<div className={'space-y-3'}>
			{Array.from({ length: 4 }).map((_, index) => (
				<SkeletonLoader key={index} className={'h-10 mx-4 mt-2'} />
			))}
		</div>
	) : (
		<Menu menu={{ title: 'Popular genres', items: data || [] }} />
	);
};

export default GenreMenu;
