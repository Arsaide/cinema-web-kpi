import { useQuery } from '@tanstack/react-query';

import { authService } from '@/api/services/auth/auth.service';

export const useConfirmQuery = (token: string) => {
	const { data, isSuccess, error, isPending } = useQuery({
		queryKey: ['confirm-email'],
		queryFn: () => authService.confirmEmail(token),
		select: data => data.data,
	});

	return { data, isPending, isSuccess, error };
};
