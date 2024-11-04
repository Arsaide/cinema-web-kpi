import React, { FC } from 'react';
import { Bar, BarChart, Rectangle, ResponsiveContainer, Tooltip, XAxis } from 'recharts';

import SalesChartTooltip from '@/components/ui/admin/admin-statistics/middle-statistics/sales-chart/SalesChartTooltip';

import { ISalesByWeek } from '@/types/statistics.types';

import styles from './SalesChart.module.scss';

interface ISalesChart {
	data: ISalesByWeek[];
}

const SalesChart: FC<ISalesChart> = ({ data }) => {
	return (
		<div className={styles.sales_chart}>
			<ResponsiveContainer width={'100%'} height={390}>
				<BarChart data={data} width={500} height={300}>
					<XAxis
						tickLine={false}
						axisLine={false}
						dataKey={'date'}
						style={{ fontSize: '12px' }}
						tickMargin={12}
					/>
					<Tooltip cursor={{ fill: 'transparent' }} content={<SalesChartTooltip />} />
					<Bar
						dataKey={'total'}
						fill={'#6B29A3'}
						activeBar={<Rectangle fill={'#54237B'} />}
						radius={[7, 7, 7, 7]}
						barSize={36}
					/>
				</BarChart>
			</ResponsiveContainer>
		</div>
	);
};

export default SalesChart;
