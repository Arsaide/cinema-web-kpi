import Image from 'next/image';
import Link from 'next/link';
import React, { FC } from 'react';

import { PUBLIC_URL } from '@/config/url.config';

import { IMovie } from '@/types/movie.types';

import styles from './SearchList.module.scss';

interface ISearchList {
	movies: IMovie[];
}

const SearchList: FC<ISearchList> = ({ movies }) => {
	return (
		<div className={styles.list}>
			{movies.length ? (
				movies.map(movie => (
					<Link href={PUBLIC_URL.movie(movie.slug)} key={movie.id} className={styles.item}>
						<Image
							src={movie.poster}
							alt={movie.title}
							width={70}
							height={80}
							objectFit={'cover'}
							objectPosition={'top'}
							className={'rounded-md'}
						/>
					</Link>
				))
			) : (
				<div className={styles.notFound}>Not found!</div>
			)}
		</div>
	);
};

export default SearchList;
