import { useQuery } from '@tanstack/react-query';

import { genreService } from '@/api/services/genre/genre.service';

import { IOption } from '@/components/ui/form-elements/form.interface';

export const useAdminGenres = () => {
	const { data: genres, isLoading: isGenresLoading } = useQuery({
		queryKey: ['list of genres'],
		queryFn: () => genreService.getAll(),
		select: data =>
			data.map(
				(genre): IOption => ({
					label: genre.name,
					value: genre.id,
				}),
			),
	});

	return { genres, isGenresLoading };
};
