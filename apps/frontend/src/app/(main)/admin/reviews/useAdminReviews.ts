import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import toast from 'react-hot-toast';

import { reviewService } from '@/api/services/review/review.service';

import { ITableItem } from '@/components/ui/admin/admin-table/admin-list/admin-list.interface';

export const useAdminReviews = () => {
	const queryClient = useQueryClient();

	const { data: reviews, isLoading } = useQuery({
		queryKey: ['get reviews for admin dashboard'],
		queryFn: () => reviewService.getAll(),
		select: data =>
			data.map(
				(review): ITableItem => ({
					id: review.id,
					items: [
						Array.from({ length: review.rating })
							.map(() => '⭐️')
							.join(' '),
						review.user.name,
						review.user.email,
					],
				}),
			),
	});

	const { mutateAsync: deleteAsync } = useMutation({
		mutationKey: ['delete review'],
		mutationFn: (userId: string) => reviewService.delete(userId),
		onSuccess() {
			toast.success('Review deleted');
			queryClient.invalidateQueries({
				queryKey: ['get reviews for admin dashboard'],
			});
		},
		onError() {
			toast.error('Error while deleting review');
		},
	});

	return useMemo(
		() => ({
			reviews,
			isLoading,
			deleteAsync,
		}),
		[reviews, isLoading, deleteAsync],
	);
};
