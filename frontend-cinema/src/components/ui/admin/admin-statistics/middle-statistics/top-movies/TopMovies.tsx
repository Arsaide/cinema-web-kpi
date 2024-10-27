import React, { FC } from 'react';
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

import TopMoviesTooltip from '@/components/ui/admin/admin-statistics/middle-statistics/top-movies/TopMoviesTooltip';

import { ITopMovie } from '@/types/statistics.types';

import styles from './TopMovies.module.scss';

const COLORS = ['#6B29A3', '#54237B', '#4A1D73', '#3D165C'];

interface ITopMovies {
	data: ITopMovie[];
}

const TopMovies: FC<ITopMovies> = ({ data }) => {
	return (
		<div className={styles.top_movies}>
			<ResponsiveContainer width={'100%'} height={390}>
				<PieChart>
					<Legend
						layout={'horizontal'}
						verticalAlign={'bottom'}
						align={'right'}
						iconType={'circle'}
						content={({ payload }: any) => {
							return (
								<ul>
									{payload.map((entry: any, index: number) => (
										<li key={index}>{entry.payload.title}</li>
									))}
								</ul>
							);
						}}
					/>
					<Tooltip content={<TopMoviesTooltip />} />
					<Pie
						data={data}
						cx={'50%'}
						cy={'50%'}
						outerRadius={90}
						innerRadius={60}
						paddingAngle={4}
						stroke={'none'}
						dataKey={'views'}
						labelLine={false}
					>
						{data.map((entry, index) => (
							<Cell
								key={index}
								fill={COLORS[index % COLORS.length]}
								style={{ outline: 'none' }}
							/>
						))}
					</Pie>
				</PieChart>
			</ResponsiveContainer>
		</div>
	);
};

export default TopMovies;
