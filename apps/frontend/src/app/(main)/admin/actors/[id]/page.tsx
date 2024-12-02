import { Metadata } from 'next';
import React from 'react';

import ActorEdit from '@/app/(main)/admin/actors/[id]/ActorEdit';

import { NO_INDEX_PAGE } from '@/constants/seo.constants';

import { IPageIdParam } from '@/types/page.params.types';

export const metadata: Metadata = {
	title: 'Actor settings',
	...NO_INDEX_PAGE,
};

const ActorEditPage = ({ params }: IPageIdParam) => {
	return <ActorEdit actorId={params.id} />;
};

export default ActorEditPage;
