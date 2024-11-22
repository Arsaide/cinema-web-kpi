import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useMemo, useState } from 'react';
import toast from 'react-hot-toast';

import { movieService } from '@/api/services/movie/movie.service';

import { ITableItem } from '@/components/ui/admin/admin-table/admin-list/admin-list.interface';

import { ADMIN_URL, PUBLIC_URL } from '@/config/url.config';

import { useDebounce } from '@/hooks/useDebounce';

import { getGenresList } from '@/utils/movie/getGenresList';

export const useAdminMovies = () => {
	const [searchTerm, setSearchTerm] = useState<string>('');

	const debouncedSearch = useDebounce(searchTerm, 500);

	const queryClient = useQueryClient();

	const { data: movies, isLoading } = useQuery({
		queryKey: ['get movies for admin dashboard', debouncedSearch],
		queryFn: () => movieService.getAll(debouncedSearch),
		select: data =>
			data.map(
				(movie): ITableItem => ({
					id: movie.id,
					viewUrl: PUBLIC_URL.movie(movie.slug),
					editUrl: ADMIN_URL.movieEdit(movie.id),
					items: [movie.title, getGenresList(movie.genres), String(movie.views)],
				}),
			),
	});

	const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(event.target.value);
	};

	const { push } = useRouter();

	const { mutateAsync: createAsync } = useMutation({
		mutationKey: ['create movie'],
		mutationFn: () => movieService.create(),
		onSuccess({ data: id }) {
			toast.success('Movie created successfully!');
			push(ADMIN_URL.movieEdit(id));
			queryClient.invalidateQueries({
				queryKey: ['get movie for admin dashboard'],
			});
		},
		onError() {
			toast.error('Error while created movie');
		},
	});

	const { mutateAsync: deleteAsync } = useMutation({
		mutationKey: ['delete movie'],
		mutationFn: (movieId: string) => movieService.delete(movieId),
		onSuccess() {
			toast.success('Movie deleted');
			queryClient.invalidateQueries({
				queryKey: ['get movie for admin dashboard'],
			});
		},
		onError() {
			toast.error('Error while deleting movie');
		},
	});

	return useMemo(
		() => ({
			handleSearch,
			movies,
			searchTerm,
			isLoading,
			deleteAsync,
			createAsync,
		}),
		[handleSearch, searchTerm, movies, isLoading, deleteAsync, createAsync],
	);
};
