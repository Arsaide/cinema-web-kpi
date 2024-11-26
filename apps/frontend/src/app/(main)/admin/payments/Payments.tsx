'use client';

import React from 'react';

import { useAdminPayments } from '@/app/(main)/admin/payments/useAdminPayments';

import AdminList from '@/components/ui/admin/admin-table/admin-list/AdminList';
import Heading from '@/components/ui/heading/Heading';

const Payments = () => {
	const { payments, isLoading, deleteAsync, cancelAsync } = useAdminPayments();

	return (
		<div className={'px-6'}>
			<Heading>💵 Payments</Heading>
			<AdminList
				listItems={payments || []}
				headerItems={['Email', 'Premium', 'Amount', 'Status']}
				isLoading={isLoading}
				removeHandler={deleteAsync}
				cancelHandler={cancelAsync}
			/>
		</div>
	);
};

export default Payments;
