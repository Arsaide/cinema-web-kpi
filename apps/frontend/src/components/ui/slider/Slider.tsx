import React from 'react';
import { CSSTransition } from 'react-transition-group';

import SlideItem from '@/components/ui/slider/SlideItem';
import SlideArrow from '@/components/ui/slider/slide-arrow/SlideArrow';
import { ISlide } from '@/components/ui/slider/slider.interface';
import { useSlider } from '@/components/ui/slider/useSlider';

import styles from './Slider.module.scss';

interface ISlider {
	slides: ISlide[];
}

const Slider = ({ slides }: ISlider) => {
	const { handleClick, index, slideIn, isNext, isPrev } = useSlider(slides.length);

	return (
		<div className={styles.slider}>
			{isPrev && <SlideArrow variant={'left'} clickHandler={() => handleClick('prev')} />}

			<CSSTransition in={slideIn} timeout={300} classNames={'slide-animation'} unmountOnExit>
				<SlideItem slide={slides[index]} />
			</CSSTransition>

			{isNext && <SlideArrow variant={'right'} clickHandler={() => handleClick('next')} />}
		</div>
	);
};

export default Slider;
