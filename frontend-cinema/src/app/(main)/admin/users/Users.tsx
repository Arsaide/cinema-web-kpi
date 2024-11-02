'use client';

import React from 'react';

import { useAdminUsers } from '@/app/(main)/admin/users/useAdminUsers';

import AdminHeader from '@/components/ui/admin/admin-table/admin-header/AdminHeader';
import Heading from '@/components/ui/heading/Heading';

const Users = () => {
	const { searchTerm, handleSearch, users, isLoading, deleteAsync } = useAdminUsers();

	return (
		<div className={'px-6'}>
			<Heading>👥 Users</Heading>
			<AdminHeader searchTerm={searchTerm} handleSearch={handleSearch} />
			{users && users.map(item => <p key={item.id}>{item.items[1]}</p>)}
		</div>
	);
};

export default Users;
