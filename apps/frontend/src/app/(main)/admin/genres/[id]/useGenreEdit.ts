import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { SubmitHandler } from 'react-hook-form';
import toast from 'react-hot-toast';

import { genreService } from '@/api/services/genre/genre.service';

import { IGenreEditInput } from '@/types/genre.types';

export const useGenreEdit = (genreId: string) => {
	const { data: genre, isLoading } = useQuery({
		queryKey: ['genre', genreId],
		queryFn: () => genreService.getById(genreId),
		select: ({ data }) => data,
		enabled: !!genreId,
	});

	const queryClient = useQueryClient();

	const { mutateAsync } = useMutation({
		mutationKey: ['update genre'],
		mutationFn: (data: IGenreEditInput) => genreService.update(genreId, data),
		onSuccess() {
			toast.success('Genre updated successfully!');
			queryClient.invalidateQueries({ queryKey: ['get genres for admin dashboard'] });
		},
		onError() {
			toast.error('Error while updated genre');
		},
	});

	const onSubmit: SubmitHandler<IGenreEditInput> = async data => {
		await mutateAsync(data);
	};

	return { genre, onSubmit, isLoading };
};