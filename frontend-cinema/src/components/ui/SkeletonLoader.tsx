import cn from 'clsx';
import React, { FC } from 'react';

interface ISkeletonLoader {
	className?: string;
}

const SkeletonLoader: FC<ISkeletonLoader> = ({ className }) => {
	return <div className={cn('animate-pulse rounded-lg bg-[#292A2E]', className)}></div>;
};

export default SkeletonLoader;
