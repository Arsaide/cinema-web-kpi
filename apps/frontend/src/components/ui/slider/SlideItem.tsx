'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

import Button from '@/components/ui/form-elements/button/Button';
import Heading from '@/components/ui/heading/Heading';
import { ISlide } from '@/components/ui/slider/slider.interface';

import styles from './Slider.module.scss';

interface ISlideItem {
	slide: ISlide;
}

const SlideItem = ({ slide }: ISlideItem) => {
	const { push } = useRouter();

	return (
		<div className={styles.slide}>
			{slide.bigPoster && (
				<Image
					className={styles.image}
					src={slide.bigPoster}
					alt={slide.title}
					draggable={false}
					unoptimized
					priority
					fill
				/>
			)}

			<div className={styles.content}>
				<Heading className={styles.title}>{slide.title}</Heading>
				<div className={styles.subtitle}>{slide.subTitle}</div>
				<Button className={styles.button} onClick={() => push(slide.link)}>
					Watch
				</Button>
			</div>
		</div>
	);
};

export default SlideItem;
