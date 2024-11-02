import { Metadata } from 'next';
import React from 'react';

import Users from '@/app/(main)/admin/users/Users';

import { NO_INDEX_PAGE } from '@/constants/seo.constants';

export const metadata: Metadata = {
	title: 'List of users',
	...NO_INDEX_PAGE,
};

const UsersPage = () => {
	return <Users />;
};

export default UsersPage;
