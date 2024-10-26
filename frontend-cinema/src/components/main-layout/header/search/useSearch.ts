import { useQuery } from '@tanstack/react-query';
import { ChangeEvent, useState } from 'react';

import { movieService } from '@/api/services/movie/movie.service';

import { useDebounce } from '@/hooks/useDebounce';

export const useSearch = () => {
	const [searchTerm, setSearchTerm] = useState<string>('');

	const debouncedSearch = useDebounce(searchTerm, 500);

	const { data, isSuccess } = useQuery({
		queryKey: ['search movie', searchTerm],
		queryFn: () => movieService.getAll(debouncedSearch),
		enabled: !!debouncedSearch,
	});

	const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(event.target.value);
	};

	return { isSuccess, handleSearch, data, searchTerm };
};
