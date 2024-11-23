'use client';

import React from 'react';

import { useAdminReviews } from '@/app/(main)/admin/reviews/useAdminReviews';

import AdminList from '@/components/ui/admin/admin-table/admin-list/AdminList';
import Heading from '@/components/ui/heading/Heading';

const Reviews = () => {
	const { reviews, isLoading, deleteAsync } = useAdminReviews();

	return (
		<div className={'px-6'}>
			<Heading>👥 Reviews</Heading>
			<AdminList
				listItems={reviews || []}
				headerItems={['Rating', 'Name', 'Email']}
				isLoading={isLoading}
				removeHandler={deleteAsync}
			/>
		</div>
	);
};

export default Reviews;
