export interface ITableItem {
	id: string;
	editUrl?: string;
	viewUrl?: string;
	items: string[];
}

export interface IAdminListItem {
	listItem: ITableItem;
	removeHandler?: () => void;
}
