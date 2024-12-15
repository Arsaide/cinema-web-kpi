import { Metadata } from 'next';
import React from 'react';

import UserEdit from '@/app/(main)/admin/users/[id]/UserEdit';

import { NO_INDEX_PAGE } from '@/constants/seo.constants';

import { IPageIdParam } from '@/types/page.params.types';

export const metadata: Metadata = {
	title: 'User settings',
	...NO_INDEX_PAGE,
};

const UserEditPage = ({ params }: IPageIdParam) => {
	return <UserEdit userId={params.id} />;
};

export default UserEditPage;
