import { useState } from 'react';

export const useSlider = (length: number) => {
	const [currentIndex, setCurrentIndex] = useState<number>(0);
	const [slideIn, setSlideIn] = useState<boolean>(true);

	const isExistNext = currentIndex + 1 < length;
	const isExistPrev = currentIndex ? currentIndex - 1 < length : false;

	const handleArrowClick = (direction: 'next' | 'prev') => {
		const newIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;

		setTimeout(() => {
			setCurrentIndex(newIndex);
			setSlideIn(true);
		}, 300);
	};

	return {
		slideIn,
		index: currentIndex,
		isNext: isExistNext,
		isPrev: isExistPrev,
		handleClick: handleArrowClick,
	};
};
