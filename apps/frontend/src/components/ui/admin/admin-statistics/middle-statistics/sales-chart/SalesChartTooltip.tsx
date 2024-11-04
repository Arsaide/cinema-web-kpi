import React, { FC } from 'react';

import { convertPrice } from '@/utils/string/convertPrice';

import styles from '../MiddleStatistics.module.scss';

interface ISalesChartTooltip {
	active?: boolean;
	payload?: any[];
	label?: string;
}

const SalesChartTooltip: FC<ISalesChartTooltip> = ({ active, payload, label }) => {
	if (!active) return null;

	if (active && payload && payload.length) {
		return (
			<div className={styles.tooltip}>
				<p className={styles.title}>{label}</p>
				<p className={styles.value}>
					Profit:
					<span className={'ml-2'}>{convertPrice(payload[0].value)}</span>
				</p>
			</div>
		);
	}

	return null;
};

export default SalesChartTooltip;
