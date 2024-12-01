'use client';

import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { useGenreEdit } from '@/app/(main)/admin/genres/[id]/useGenreEdit';

import { TypeIconName, iconNames } from '@/components/ui/Icon';
import SkeletonLoader from '@/components/ui/SkeletonLoader';
import formStyles from '@/components/ui/form-elements/AdminForm.module.scss';
import Button from '@/components/ui/form-elements/button/Button';
import Field from '@/components/ui/form-elements/field/Field';
import SelectField from '@/components/ui/form-elements/select-field/SelectField';
import SlugField from '@/components/ui/form-elements/slug-field/SlugField';
import Heading from '@/components/ui/heading/Heading';

import { IGenreEditInput } from '@/types/genre.types';

import { generateSlug } from '@/utils/string/generateSlug';

interface IGenreEdit {
	genreId: string;
}

const DynamicTextEditor = dynamic(
	() => import('@/components/ui/form-elements/text-editor/TextEditor'),
	{
		ssr: false,
	},
);

const GenreEdit = ({ genreId }: IGenreEdit) => {
	const { genre, onSubmit, isLoading } = useGenreEdit(genreId);

	const {
		handleSubmit,
		register,
		formState: { errors },
		control,
		setValue,
		getValues,
		trigger,
	} = useForm<IGenreEditInput>({
		mode: 'onChange',
		values: {
			name: genre?.name || '',
			slug: genre?.slug || '',
			description: genre?.description || '',
			icon: genre?.icon! || '',
		},
	});

	const [icons, setIcons] = useState(genre?.icon || '');

	useEffect(() => {
		if (genre?.icon) {
			setIcons(genre?.icon);
		}
	}, [genre]);

	const handleIconsSelect = (value: string) => {
		setIcons(value);
		setValue('icon', value as TypeIconName);
		trigger('icon');
	};

	const handleSlugChange = () => {
		const slugValue = generateSlug(getValues('name'));
		setValue('slug', slugValue);
		trigger('slug');
	};

	const iconsArray = iconNames.map(name => ({
		title: name,
		value: name,
	}));

	const selectedIcons = iconsArray.find(item => item.value === icons);

	return (
		<div className={'px-6'}>
			<Heading>Genre settings</Heading>
			<form onSubmit={handleSubmit(onSubmit)} className={formStyles.form}>
				{isLoading ? (
					<div className={'space-y-4'}>
						{Array.from({ length: 3 }).map((_, index) => (
							<SkeletonLoader key={index} className={'h-10'} />
						))}
					</div>
				) : (
					<>
						<div className={formStyles.fields}>
							<Field
								{...register('name', {
									required: 'Name is not required',
								})}
								placeholder={'Name'}
								error={errors.name}
								style={{ width: '31%' }}
							/>

							<div style={{ width: '31%' }}>
								<SlugField
									register={register}
									generate={handleSlugChange}
									error={errors.slug}
								/>
							</div>

							<SelectField
								{...register('icon', {
									required: 'Icon is required',
								})}
								selected={selectedIcons || null}
								options={iconsArray}
								error={errors.icon}
								placeholder={'Icon'}
								onSelectChange={handleIconsSelect}
								icons={true}
								style={{ width: '31%' }}
							/>
						</div>
						<Controller
							control={control}
							name={'description'}
							render={({ field: { value, onChange }, fieldState: { error } }) => (
								<DynamicTextEditor
									placeholder={'Description'}
									onChange={onChange}
									value={value}
									error={error}
								/>
							)}
						/>
						<Button size={'sm'}>Save changes</Button>
					</>
				)}
			</form>
		</div>
	);
};

export default GenreEdit;
