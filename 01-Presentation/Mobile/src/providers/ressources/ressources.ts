import {
  Injectable
} from '@angular/core';
import {
  HttpClient
} from '@angular/common/http';
@Injectable()
export class RessourcesProvider {

  /****************************************************
   * Constructor
   ****************************************************/
  constructor(public _http: HttpClient) {
    this.init();

  }

  /***************************************************
   * Initialize provider
   ****************************************************/
  init() {
    this.stringResources = {
      chapter: "عدد الفصول :",
      state: "الحالة :",
      dateEdition: "سنة الإصدار :",
      tags: "التصنيفات :",
      resume: "نبذة عن القصة :",
      name: "الإسم :",
      mangaList: "قائمة  المانغا",
      search: "بحث",
      home: "الرئيسية",
      chapters: "الفصول",
      infos: "نبذة",
      chapterTitle: "الفصل ",
      loading: "جاري التحميل...",
      downloads: "التحميلات",
      favoris: "المفضلة",
      addFavoriteSuccess: "أضيفت إلى المفضلة بنجاح",
      removeFavorite: "حذفت من المفضلة بنجاح",
      recents:'أرشيف التصفح',
      newListTitle:'آخر الإصدارت',
      lastChapterTitle:'جديد الفصول',
      mostViewedTitle:'الأكثر مشاهدة',
      forYouTitle:'من أجلك',
      nextChapter:'الفصل التالي ',
      previousChapter:' الفصل السابق',
      rating :'التقييم :',
      views :'عدد المشاهدات :',
      source :'المصدر :',
      sourceMenu:'مصادر المانغا',
      apply:'تطبيق',
      chooseChapter:'إختيار الفصول'
    }
  }
  /****************************************************
   * Public properties
   *****************************************************/
  stringResources:any;

}
