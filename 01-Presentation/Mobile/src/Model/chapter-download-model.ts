import { ChapterViewModel } from "../ViewModel/chapter-view-model";
import { Page } from "./page-model";
import { DownloadStateEnum } from "../enums/download-state-enum";

export class ChapterDownload {
	chapter: ChapterViewModel;
	state: DownloadStateEnum;
}