'use client';

import dynamic from 'next/dynamic';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';

import { useGenreEdit } from '@/app/(main)/admin/genres/[id]/useGenreEdit';

import SkeletonLoader from '@/components/ui/SkeletonLoader';
import formStyles from '@/components/ui/form-elements/AdminForm.module.scss';
import Button from '@/components/ui/form-elements/button/Button';
import Field from '@/components/ui/form-elements/field/Field';
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
	} = useForm<IGenreEditInput>({
		mode: 'onChange',
		values: {
			name: genre?.name || '',
			slug: genre?.slug || '',
			description: genre?.description || '',
			icon: genre?.icon! || '',
		},
	});

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
									generate={() => setValue('slug', generateSlug(getValues('name')))}
									error={errors.name}
								/>
							</div>

							<Field
								{...register('icon', {
									required: 'Icon is required',
								})}
								placeholder={'Icon'}
								error={errors.name}
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
