export class MangaItemModel {
    id : number;
    name : string;
    matricule : string;
    cover : string;
    chapterCount : number;
    date: string;
    state: string;
    resume: string;
    tags: string;
    isFavorite :boolean=false;
    isDownloaded : boolean=false;
}