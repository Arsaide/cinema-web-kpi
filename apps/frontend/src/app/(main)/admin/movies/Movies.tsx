'use client';

import React from 'react';

import { useAdminMovies } from '@/app/(main)/admin/movies/useAdminMovies';

import AdminHeader from '@/components/ui/admin/admin-table/admin-header/AdminHeader';
import AdminList from '@/components/ui/admin/admin-table/admin-list/AdminList';
import Heading from '@/components/ui/heading/Heading';

const Movies = () => {
	const { searchTerm, handleSearch, movies, isLoading, deleteAsync, createAsync } =
		useAdminMovies();

	return (
		<div className={'px-6'}>
			<Heading>🎬 Movies</Heading>
			<AdminHeader searchTerm={searchTerm} handleSearch={handleSearch} onClick={createAsync} />
			<AdminList
				listItems={movies || []}
				headerItems={['Title', 'Genres', 'Views']}
				isLoading={isLoading}
				removeHandler={deleteAsync}
			/>
		</div>
	);
};

export default Movies;
