declare module server {
	interface mangaDetailsModel {
		id: any;
		name: string;
		date: string;
		resume: string;
		cover: string;
		state: string;
		tags: string;
		countChapters: number;
		views: number;
		rating: string;
		source: {
			label: string;
		};
	}
}
