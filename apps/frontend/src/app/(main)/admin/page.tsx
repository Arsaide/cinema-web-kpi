import { Metadata } from 'next';
import React from 'react';

import Admin from '@/app/(main)/admin/Admin';

import { NO_INDEX_PAGE } from '@/constants/seo.constants';

export const metadata: Metadata = {
	title: 'Admin panel',
	...NO_INDEX_PAGE,
};

const AdminPage = () => {
	return <Admin />;
};

export default AdminPage;
