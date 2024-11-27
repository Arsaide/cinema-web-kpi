import { Metadata } from 'next';
import React from 'react';

import Payments from '@/app/(main)/payments/Payments';

export const metadata: Metadata = {
	title: 'Payments subscribe!',
};

const PaymentsPage = () => {
	return <Payments />;
};

export default PaymentsPage;
