interface IArrayItem {
	name: string;
}

export const getGenresList = (array: IArrayItem[]) => {
	return array.map(i => i.name).join(', ');
};
