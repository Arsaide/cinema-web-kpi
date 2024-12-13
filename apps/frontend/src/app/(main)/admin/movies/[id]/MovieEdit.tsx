'use client';

import dynamic from 'next/dynamic';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';

import { useAdminActors } from '@/app/(main)/admin/movies/[id]/useAdminActors';
import { useAdminGenres } from '@/app/(main)/admin/movies/[id]/useAdminGenres';
import { useMovieEdit } from '@/app/(main)/admin/movies/[id]/useMovieEdit';

import SkeletonLoader from '@/components/ui/SkeletonLoader';
import formStyles from '@/components/ui/form-elements/AdminForm.module.scss';
import Button from '@/components/ui/form-elements/button/Button';
import Field from '@/components/ui/form-elements/field/Field';
import Select from '@/components/ui/form-elements/select-field/Select';
import SlugField from '@/components/ui/form-elements/slug-field/SlugField';
import UploadField from '@/components/ui/form-elements/upload-field/UploadField';
import UploadVideoField from '@/components/ui/form-elements/upload-video-field/UploadVideoField';
import Heading from '@/components/ui/heading/Heading';

import { IMovieEditInput } from '@/types/movie.types';

import { generateSlug } from '@/utils/string/generateSlug';

interface IMovieEdit {
	movieId: string;
}

const DynamicTextEditor = dynamic(
	() => import('@/components/ui/form-elements/text-editor/TextEditor'),
	{
		ssr: false,
	},
);

const MovieEdit = ({ movieId }: IMovieEdit) => {
	const { movie, onSubmit, isLoading } = useMovieEdit(movieId);

	const { genres, isGenresLoading } = useAdminGenres();
	const { actors, isActorsLoading } = useAdminActors();

	const {
		handleSubmit,
		register,
		formState: { errors },
		control,
		setValue,
		getValues,
		trigger,
	} = useForm<IMovieEditInput>({
		mode: 'onChange',
		values: {
			title: movie?.title || '',
			description: movie?.description || '',
			slug: movie?.slug || '',
			country: movie?.country || '',
			year: movie?.year || 0,
			poster: movie?.poster || '',
			bigPoster: movie?.bigPoster || '',
			videoUrls: movie?.videoUrls || [],
			genres: movie?.genres.map(genre => genre.id) || [],
			actors: movie?.actors.map(actor => actor.id) || [],
		},
	});

	const handleSlugChange = () => {
		const slugValue = generateSlug(getValues('title'));
		setValue('slug', slugValue);
		trigger('slug');
	};

	return (
		<div className={'px-6'}>
			<Heading>Movie settings</Heading>
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
								{...register('title', {
									required: 'Title is required',
								})}
								placeholder={'Title'}
								error={errors.title}
							/>

							<SlugField
								register={register}
								generate={handleSlugChange}
								error={errors.slug}
							/>

							<Field
								{...register('country', {
									required: 'Country is required',
								})}
								placeholder={'Country'}
								error={errors.country}
								style={{ width: '31%' }}
							/>

							<Field
								{...register('year', {
									required: 'Year is required',
									validate: {
										minYear: value =>
											Number(value) >= 1970 || 'Year must be 1970 or later',
										maxYear: value =>
											Number(value) <= new Date().getFullYear() ||
											`Year must be ${new Date().getFullYear()} or earlier`,
									},
								})}
								placeholder={'Year'}
								error={errors.year}
								style={{ width: '31%' }}
							/>

							<Controller
								name={'genres'}
								control={control}
								rules={{ required: 'Please select option' }}
								render={({ field, fieldState: { error } }) => (
									<Select
										error={error}
										placeholder={'Genres'}
										isLoading={isGenresLoading}
										isMulti={true}
										options={genres || []}
										field={field}
									/>
								)}
							/>

							<Controller
								name={'actors'}
								control={control}
								rules={{ required: 'Please select option' }}
								render={({ field, fieldState: { error } }) => (
									<Select
										error={error}
										placeholder={'Actors'}
										isLoading={isActorsLoading}
										isMulti={true}
										options={actors || []}
										field={field}
									/>
								)}
							/>

							<Controller
								name={'poster'}
								control={control}
								defaultValue={''}
								render={({ field: { value, onChange }, fieldState: { error } }) => (
									<UploadField
										onChange={onChange}
										value={value}
										error={error}
										folder={`movies/${movieId}`}
										placeholder={'Movie small poster'}
										style={{ marginTop: 15 }}
									/>
								)}
								rules={{
									required: 'Movie small poster is required',
								}}
							/>

							<Controller
								name={'bigPoster'}
								control={control}
								defaultValue={''}
								render={({ field: { value, onChange }, fieldState: { error } }) => (
									<UploadField
										onChange={onChange}
										value={value}
										error={error}
										folder={`movies/${movieId}`}
										placeholder={'Movie big poster'}
										style={{ marginTop: 15 }}
									/>
								)}
								rules={{
									required: 'Movie big poster is required',
								}}
							/>

							<Controller
								name={'videoUrls'}
								control={control}
								defaultValue={[]}
								render={({ field: { value, onChange }, fieldState: { error } }) => (
									<UploadVideoField
										error={error}
										folder={`movies/${movieId}`}
										placeholder='Загрузите видео'
										style={{ marginBottom: 35 }}
										onChange={onChange}
										value={value}
									/>
								)}
								rules={{
									required: 'Video is required',
								}}
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
									style={{ width: '100%' }}
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

export default MovieEdit;
