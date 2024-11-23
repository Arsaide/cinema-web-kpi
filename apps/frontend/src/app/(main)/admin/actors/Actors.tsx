'use client';

import React from 'react';

import { useAdminActors } from '@/app/(main)/admin/actors/useAdminActors';

import AdminHeader from '@/components/ui/admin/admin-table/admin-header/AdminHeader';
import AdminList from '@/components/ui/admin/admin-table/admin-list/AdminList';
import Heading from '@/components/ui/heading/Heading';

const Actors = () => {
	const { searchTerm, handleSearch, actors, isLoading, deleteAsync, createAsync } =
		useAdminActors();

	return (
		<div className={'px-6'}>
			<Heading>🎭 Actors</Heading>
			<AdminHeader searchTerm={searchTerm} handleSearch={handleSearch} onClick={createAsync} />
			<AdminList
				listItems={actors || []}
				headerItems={['Name', 'Slug']}
				isLoading={isLoading}
				removeHandler={deleteAsync}
			/>
		</div>
	);
};

export default Actors;
