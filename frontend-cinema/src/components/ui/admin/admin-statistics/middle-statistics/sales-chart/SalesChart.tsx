import React, { FC } from 'react';

import { ISalesByWeek } from '@/types/statistics.types';

interface ISalesChart {
	data: ISalesByWeek[];
}

const SalesChart: FC<ISalesChart> = ({ data }) => {
	return <div></div>;
};

export default SalesChart;
