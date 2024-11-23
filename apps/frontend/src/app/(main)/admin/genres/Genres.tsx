'use client';

import React from 'react';

import { useAdminGenres } from '@/app/(main)/admin/genres/useAdminGenres';

import AdminHeader from '@/components/ui/admin/admin-table/admin-header/AdminHeader';
import AdminList from '@/components/ui/admin/admin-table/admin-list/AdminList';
import Heading from '@/components/ui/heading/Heading';

const Genres = () => {
	const { searchTerm, handleSearch, genres, isLoading, deleteAsync, createAsync } =
		useAdminGenres();

	return (
		<div className={'px-6'}>
			<Heading>🎭 Genres</Heading>
			<AdminHeader searchTerm={searchTerm} handleSearch={handleSearch} onClick={createAsync} />
			<AdminList
				listItems={genres || []}
				headerItems={['Name', 'Slug']}
				isLoading={isLoading}
				removeHandler={deleteAsync}
			/>
		</div>
	);
};

export default Genres;
