'use client';

import React from 'react';

import Slider from '@/components/ui/slider/Slider';
import { ISlide } from '@/components/ui/slider/slider.interface';

interface IHome {
	slides: ISlide[];
}

const Home = ({ slides }: IHome) => {
	return <>{slides.length && <Slider slides={slides} />}</>;
};

export default Home;
