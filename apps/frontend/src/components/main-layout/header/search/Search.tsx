'use client';

import React from 'react';

import SearchList from '@/components/main-layout/header/search/search-list/SearchList';
import { useSearch } from '@/components/main-layout/header/search/useSearch';
import SearchField from '@/components/ui/search-field/SearchField';

import styles from './Search.module.scss';

const Search = () => {
	const { searchTerm, handleSearch, data, isSuccess } = useSearch();

	return (
		<div className={styles.search}>
			<SearchField searchTerm={searchTerm} handleSearch={handleSearch} />
			{isSuccess && searchTerm.length > 0 && <SearchList movies={data || []} />}
		</div>
	);
};

export default Search;
