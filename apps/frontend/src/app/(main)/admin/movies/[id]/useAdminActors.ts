import { useQuery } from '@tanstack/react-query';

import { actorService } from '@/api/services/actor/actor.service';

import { IOption } from '@/components/ui/form-elements/form.interface';

export const useAdminActors = () => {
	const { data: actors, isLoading: isActorsLoading } = useQuery({
		queryKey: ['list of actors'],
		queryFn: () => actorService.getAll(),
		select: data =>
			data.map(
				(actor): IOption => ({
					label: actor.name,
					value: actor.id,
				}),
			),
	});

	return { actors, isActorsLoading };
};
