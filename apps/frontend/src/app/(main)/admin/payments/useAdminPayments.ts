import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import toast from 'react-hot-toast';

import { paymentService } from '@/api/services/payment/payment.service';
import { reviewService } from '@/api/services/review/review.service';

import { ITableItem } from '@/components/ui/admin/admin-table/admin-list/admin-list.interface';

export const useAdminPayments = () => {
	const queryClient = useQueryClient();

	const { data: payments, isLoading } = useQuery({
		queryKey: ['get payments for admin dashboard'],
		queryFn: () => paymentService.getAll(),
		select: data =>
			data.map(
				(payments): ITableItem => ({
					id: payments.id,
					items: [
						payments.user.email,
						payments.user.isHasPremium ? 'Yes' : 'No',
						String(payments.amount),
						payments.status,
					],
				}),
			),
	});

	const { mutateAsync: cancelAsync } = useMutation({
		mutationKey: ['cancel payment'],
		mutationFn: (paymentId: string) => paymentService.cancelPayment(paymentId),
		onSuccess() {
			toast.success('Payment cancel successfully!');
			queryClient.invalidateQueries({
				queryKey: ['get payments for admin dashboard'],
			});
		},
		onError() {
			toast.error('Error while created payments');
		},
	});

	const { mutateAsync: deleteAsync } = useMutation({
		mutationKey: ['delete payment'],
		mutationFn: (userId: string) => reviewService.delete(userId),
		onSuccess() {
			toast.success('Payment deleted');
			queryClient.invalidateQueries({
				queryKey: ['get payments for admin dashboard'],
			});
		},
		onError() {
			toast.error('Error while deleting payment');
		},
	});

	return useMemo(
		() => ({
			payments,
			isLoading,
			deleteAsync,
			cancelAsync,
		}),
		[payments, isLoading, deleteAsync, cancelAsync],
	);
};
