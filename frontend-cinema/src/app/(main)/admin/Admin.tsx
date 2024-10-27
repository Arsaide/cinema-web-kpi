import React from 'react';

import MainStatistics from '@/components/ui/admin/admin-statistics/main-statistics/MainStatistics';
import MiddleStatistics from '@/components/ui/admin/admin-statistics/middle-statistics/MiddleStatistics';

const Admin = () => {
	return (
		<div className={'px-6'}>
			<MainStatistics />
			<MiddleStatistics />
		</div>
	);
};

export default Admin;
