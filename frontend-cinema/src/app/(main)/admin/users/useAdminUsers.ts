import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ChangeEvent, useMemo, useState } from 'react';
import toast from 'react-hot-toast';

import { userService } from '@/api/services/user/user.service';

import { ITableItem } from '@/components/ui/admin/admin-table/admin-list/admin-list.interface';

import { ADMIN_URL } from '@/config/url.config';

import { useDebounce } from '@/hooks/useDebounce';

import { UserRole } from '@/types/user.types';

export const useAdminUsers = () => {
	const [searchTerm, setSearchTerm] = useState<string>('');

	const debouncedSearch = useDebounce(searchTerm, 500);

	const queryClient = useQueryClient();

	const { data: users, isLoading } = useQuery({
		queryKey: ['get users for admin dashboard', searchTerm],
		queryFn: () => userService.getAll(debouncedSearch),
		select: data =>
			data.map(
				(user): ITableItem => ({
					id: user.id,
					editUrl: ADMIN_URL.userEdit(user.id),
					items: [user.name, user.email, user.role === UserRole.USER ? 'User' : 'Admin'],
				}),
			),
	});

	const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(event.target.value);
	};

	const { mutateAsync: deleteAsync } = useMutation({
		mutationKey: ['delete user'],
		mutationFn: (userId: string) => userService.delete(userId),
		onSuccess() {
			toast.success('User deleted');
			queryClient.invalidateQueries({
				queryKey: ['get users for admin dashboard'],
			});
		},
		onError() {
			toast.error('Error while deleting user');
		},
	});

	return useMemo(
		() => ({
			handleSearch,
			users,
			searchTerm,
			isLoading,
			deleteAsync,
		}),
		[handleSearch, searchTerm, users, isLoading, deleteAsync],
	);
};
