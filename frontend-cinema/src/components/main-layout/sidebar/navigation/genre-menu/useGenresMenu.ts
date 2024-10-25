import { useQuery } from '@tanstack/react-query';

import { genreService } from '@/api/services/genre/genre.service';

import { IMenuItem } from '@/components/main-layout/sidebar/navigation/menu.interface';

import { PUBLIC_URL } from '@/config/url.config';

export const useGenresMenu = () => {
	const { data, isLoading } = useQuery({
		queryKey: ['get genres for menu'],
		queryFn: () => genreService.getAll(),
		select: data =>
			data
				.map(
					genre =>
						({
							icon: genre.icon,
							link: PUBLIC_URL.genre(genre.slug),
							value: genre.name,
						}) as IMenuItem,
				)
				.splice(0, 4),
	});

	return { data, isLoading };
};
