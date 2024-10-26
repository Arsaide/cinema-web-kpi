import { useQuery } from '@tanstack/react-query';

import { userService } from '@/api/services/user/user.service';

export const useProfile = () => {
	const { data: user, isLoading } = useQuery({
		queryKey: ['profile'],
		queryFn: () => userService.getProfile(),
		select: data => data.data,
		retry: false,
	});

	return { user, isLoading };
};
