import { MangaDetailsViewModel } from "../ViewModel/manga-details-View-model";
import { ChapterDownload } from "./chapter-download-model";
import { DownloadStateEnum } from "../enums/download-state-enum";
import { Page } from "./page-model";

export class DownloadState {
    manga: MangaDetailsViewModel;
    chapters: Array<ChapterDownload>;
    downloadChaptersCount: number;
    state: DownloadStateEnum;
}