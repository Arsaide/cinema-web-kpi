import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { SubmitHandler } from 'react-hook-form';
import toast from 'react-hot-toast';

import { movieService } from '@/api/services/movie/movie.service';

import { IMovieEditInput } from '@/types/movie.types';

export const useUserEdit = (movieId: string) => {
	const { data: movie, isLoading } = useQuery({
		queryKey: ['movie', movieId],
		queryFn: () => movieService.getById(movieId),
		select: ({ data }) => data,
		enabled: !!movieId,
	});

	const queryClient = useQueryClient();

	const { mutateAsync } = useMutation({
		mutationKey: ['update movie'],
		mutationFn: (data: IMovieEditInput) => movieService.update(movieId, data),
		onSuccess() {
			toast.success('Movie updated successfully!');
			queryClient.invalidateQueries({ queryKey: ['get movies for admin dashboard'] });
		},
		onError() {
			toast.error('Error while updated movie');
		},
	});

	const onSubmit: SubmitHandler<IMovieEditInput> = async data => {
		data.year = Number(data.year);

		await mutateAsync(data);
	};

	return { movie, onSubmit, isLoading };
};
