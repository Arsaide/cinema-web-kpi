import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useMemo, useState } from 'react';
import toast from 'react-hot-toast';

import { actorService } from '@/api/services/actor/actor.service';

import { ITableItem } from '@/components/ui/admin/admin-table/admin-list/admin-list.interface';

import { ADMIN_URL, PUBLIC_URL } from '@/config/url.config';

import { useDebounce } from '@/hooks/useDebounce';

export const useAdminActors = () => {
	const [searchTerm, setSearchTerm] = useState<string>('');

	const debouncedSearch = useDebounce(searchTerm, 500);

	const queryClient = useQueryClient();

	const { data: actors, isLoading } = useQuery({
		queryKey: ['get actors for admin dashboard', debouncedSearch],
		queryFn: () => actorService.getAll(debouncedSearch),
		select: data =>
			data.map(
				(actor): ITableItem => ({
					id: actor.id,
					viewUrl: PUBLIC_URL.actor(actor.slug),
					editUrl: ADMIN_URL.actorEdit(actor.id),
					items: [actor.name, actor.slug],
				}),
			),
	});

	const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(event.target.value);
	};

	const { push } = useRouter();

	const { mutateAsync: createAsync } = useMutation({
		mutationKey: ['create actor'],
		mutationFn: () => actorService.create(),
		onSuccess({ data: id }) {
			toast.success('Actor created successfully!');
			push(ADMIN_URL.actorEdit(id));
			queryClient.invalidateQueries({
				queryKey: ['get actors for admin dashboard'],
			});
		},
		onError() {
			toast.error('Error while created actor');
		},
	});

	const { mutateAsync: deleteAsync } = useMutation({
		mutationKey: ['delete actor'],
		mutationFn: (actorId: string) => actorService.delete(actorId),
		onSuccess() {
			toast.success('Actor deleted');
			queryClient.invalidateQueries({
				queryKey: ['get actors for admin dashboard'],
			});
		},
		onError() {
			toast.error('Error while deleting actor');
		},
	});

	return useMemo(
		() => ({
			handleSearch,
			actors,
			searchTerm,
			isLoading,
			deleteAsync,
			createAsync,
		}),
		[handleSearch, searchTerm, actors, isLoading, deleteAsync, createAsync],
	);
};
