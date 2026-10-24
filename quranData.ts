import { QuranSurahMeta } from '../types';

export interface ReciterOption {
  id: string;
  nameArabic: string;
  subfolder: string; // audio server subfolder
}

export const QURAN_RECITERS: ReciterOption[] = [
  {
    id: 'alafasy',
    nameArabic: 'الشيخ مشاري راشد العفاسي',
    subfolder: 'Alafasy_128kbps',
  },
  {
    id: 'abdulbasit',
    nameArabic: 'الشيخ عبد الباسط عبد الصمد (مرتل)',
    subfolder: 'Abdul_Basit_Murattal_192kbps',
  },
  {
    id: 'hussary',
    nameArabic: 'الشيخ محمود خليل الحصري',
    subfolder: 'Husary_128kbps',
  },
  {
    id: 'muaiqly',
    nameArabic: 'الشيخ ماهر المعيقلي',
    subfolder: 'MaherAlMuaiqly128kbps',
  },
  {
    id: 'ghamdi',
    nameArabic: 'الشيخ سعد الغامدي',
    subfolder: 'Ghamadi_40kbps',
  },
];

export function getSurahAudioUrl(surahNumber: number, reciterId: string = 'alafasy'): string {
  const padNumber = surahNumber.toString().padStart(3, '0');
  // High quality reliable CDN for full surahs
  return `https://server8.mp3quran.net/afs/${padNumber}.mp3`;
}

export const SURAH_LIST: QuranSurahMeta[] = [
  { number: 1, nameArabic: 'الفاتحة', nameEnglish: 'Al-Fatihah', englishTranslation: 'The Opening', revelationType: 'Meccan', revelationTypeArabic: 'مكية', numberOfAyahs: 7, revelationOrder: 5 },
  { number: 2, nameArabic: 'البقرة', nameEnglish: 'Al-Baqarah', englishTranslation: 'The Cow', revelationType: 'Medinan', revelationTypeArabic: 'مدنية', numberOfAyahs: 286, revelationOrder: 87 },
  { number: 3, nameArabic: 'آل عمران', nameEnglish: 'Ali \'Imran', englishTranslation: 'Family of Imran', revelationType: 'Medinan', revelationTypeArabic: 'مدنية', numberOfAyahs: 200, revelationOrder: 89 },
  { number: 4, nameArabic: 'النساء', nameEnglish: 'An-Nisa', englishTranslation: 'The Women', revelationType: 'Medinan', revelationTypeArabic: 'مدنية', numberOfAyahs: 176, revelationOrder: 92 },
  { number: 5, nameArabic: 'المائدة', nameEnglish: 'Al-Ma\'idah', englishTranslation: 'The Table Spread', revelationType: 'Medinan', revelationTypeArabic: 'مدنية', numberOfAyahs: 120, revelationOrder: 112 },
  { number: 6, nameArabic: 'الأنعام', nameEnglish: 'Al-An\'am', englishTranslation: 'The Cattle', revelationType: 'Meccan', revelationTypeArabic: 'مكية', numberOfAyahs: 165, revelationOrder: 55 },
  { number: 7, nameArabic: 'الأعراف', nameEnglish: 'Al-A\'raf', englishTranslation: 'The Heights', revelationType: 'Meccan', revelationTypeArabic: 'مكية', numberOfAyahs: 206, revelationOrder: 39 },
  { number: 8, nameArabic: 'الأنفال', nameEnglish: 'Al-Anfal', englishTranslation: 'The Spoils of War', revelationType: 'Medinan', revelationTypeArabic: 'مدنية', numberOfAyahs: 75, revelationOrder: 88 },
  { number: 9, nameArabic: 'التوبة', nameEnglish: 'At-Tawbah', englishTranslation: 'The Repentance', revelationType: 'Medinan', revelationTypeArabic: 'مدنية', numberOfAyahs: 129, revelationOrder: 113 },
  { number: 10, nameArabic: 'يونس', nameEnglish: 'Yunus', englishTranslation: 'Jonah', revelationType: 'Meccan', revelationTypeArabic: 'مكية', numberOfAyahs: 109, revelationOrder: 51 },
  { number: 11, nameArabic: 'هود', nameEnglish: 'Hud', englishTranslation: 'Hud', revelationType: 'Meccan', revelationTypeArabic: 'مكية', numberOfAyahs: 123, revelationOrder: 52 },
  { number: 12, nameArabic: 'يوسف', nameEnglish: 'Yusuf', englishTranslation: 'Joseph', revelationType: 'Meccan', revelationTypeArabic: 'مكية', numberOfAyahs: 111, revelationOrder: 53 },
  { number: 13, nameArabic: 'الرعد', nameEnglish: 'Ar-Ra\'d', englishTranslation: 'The Thunder', revelationType: 'Medinan', revelationTypeArabic: 'مدنية', numberOfAyahs: 43, revelationOrder: 96 },
  { number: 14, nameArabic: 'إبراهيم', nameEnglish: 'Ibrahim', englishTranslation: 'Abraham', revelationType: 'Meccan', revelationTypeArabic: 'مكية', numberOfAyahs: 52, revelationOrder: 72 },
  { number: 15, nameArabic: 'الحجر', nameEnglish: 'Al-Hijr', englishTranslation: 'The Rocky Tract', revelationType: 'Meccan', revelationTypeArabic: 'مكية', numberOfAyahs: 99, revelationOrder: 54 },
  { number: 16, nameArabic: 'النحل', nameEnglish: 'An-Nahl', englishTranslation: 'The Bee', revelationType: 'Meccan', revelationTypeArabic: 'مكية', numberOfAyahs: 128, revelationOrder: 70 },
  { number: 17, nameArabic: 'الإسراء', nameEnglish: 'Al-Isra', englishTranslation: 'The Night Journey', revelationType: 'Meccan', revelationTypeArabic: 'مكية', numberOfAyahs: 111, revelationOrder: 50 },
  { number: 18, nameArabic: 'الكهف', nameEnglish: 'Al-Kahf', englishTranslation: 'The Cave', revelationType: 'Meccan', revelationTypeArabic: 'مكية', numberOfAyahs: 110, revelationOrder: 69 },
  { number: 19, nameArabic: 'مريم', nameEnglish: 'Maryam', englishTranslation: 'Mary', revelationType: 'Meccan', revelationTypeArabic: 'مكية', numberOfAyahs: 98, revelationOrder: 44 },
  { number: 20, nameArabic: 'طه', nameEnglish: 'Taha', englishTranslation: 'Ta-Ha', revelationType: 'Meccan', revelationTypeArabic: 'مكية', numberOfAyahs: 135, revelationOrder: 45 },
  { number: 21, nameArabic: 'الأنبياء', nameEnglish: 'Al-Anbiya', englishTranslation: 'The Prophets', revelationType: 'Meccan', revelationTypeArabic: 'مكية', numberOfAyahs: 112, revelationOrder: 73 },
  { number: 22, nameArabic: 'الحج', nameEnglish: 'Al-Hajj', englishTranslation: 'The Pilgrimage', revelationType: 'Medinan', revelationTypeArabic: 'مدنية', numberOfAyahs: 78, revelationOrder: 103 },
  { number: 23, nameArabic: 'المؤمنون', nameEnglish: 'Al-Mu\'minun', englishTranslation: 'The Believers', revelationType: 'Meccan', revelationTypeArabic: 'مكية', numberOfAyahs: 118, revelationOrder: 74 },
  { number: 24, nameArabic: 'النور', nameEnglish: 'An-Nur', englishTranslation: 'The Light', revelationType: 'Medinan', revelationTypeArabic: 'مدنية', numberOfAyahs: 64, revelationOrder: 102 },
  { number: 25, nameArabic: 'الفرقان', nameEnglish: 'Al-Furqan', englishTranslation: 'The Criterion', revelationType: 'Meccan', revelationTypeArabic: 'مكية', numberOfAyahs: 77, revelationOrder: 42 },
  { number: 26, nameArabic: 'الشعراء', nameEnglish: 'Ash-Shu\'ara', englishTranslation: 'The Poets', revelationType: 'Meccan', revelationTypeArabic: 'مكية', numberOfAyahs: 227, revelationOrder: 47 },
  { number: 27, nameArabic: 'النمل', nameEnglish: 'An-Naml', englishTranslation: 'The Ant', revelationType: 'Meccan', revelationTypeArabic: 'مكية', numberOfAyahs: 93, revelationOrder: 48 },
  { number: 28, nameArabic: 'القصص', nameEnglish: 'Al-Qasas', englishTranslation: 'The Stories', revelationType: 'Meccan', revelationTypeArabic: 'مكية', numberOfAyahs: 88, revelationOrder: 49 },
  { number: 29, nameArabic: 'العنكبوت', nameEnglish: 'Al-\'Ankabut', englishTranslation: 'The Spider', revelationType: 'Meccan', revelationTypeArabic: 'مكية', numberOfAyahs: 69, revelationOrder: 85 },
  { number: 30, nameArabic: 'الروم', nameEnglish: 'Ar-Rum', englishTranslation: 'The Romans', revelationType: 'Meccan', revelationTypeArabic: 'مكية', numberOfAyahs: 60, revelationOrder: 84 },
  { number: 31, nameArabic: 'لقمان', nameEnglish: 'Luqman', englishTranslation: 'Luqman', revelationType: 'Meccan', revelationTypeArabic: 'مكية', numberOfAyahs: 34, revelationOrder: 57 },
  { number: 32, nameArabic: 'السجدة', nameEnglish: 'As-Sajdah', englishTranslation: 'The Prostration', revelationType: 'Meccan', revelationTypeArabic: 'مكية', numberOfAyahs: 30, revelationOrder: 75 },
  { number: 33, nameArabic: 'الأحزاب', nameEnglish: 'Al-Ahzab', englishTranslation: 'The Combined Forces', revelationType: 'Medinan', revelationTypeArabic: 'مدنية', numberOfAyahs: 73, revelationOrder: 90 },
  { number: 34, nameArabic: 'سبأ', nameEnglish: 'Saba', englishTranslation: 'Sheba', revelationType: 'Meccan', revelationTypeArabic: 'مكية', numberOfAyahs: 54, revelationOrder: 58 },
  { number: 35, nameArabic: 'فاطر', nameEnglish: 'Fatir', englishTranslation: 'Originator', revelationType: 'Meccan', revelationTypeArabic: 'مكية', numberOfAyahs: 45, revelationOrder: 43 },
  { number: 36, nameArabic: 'يس', nameEnglish: 'Ya-Sin', englishTranslation: 'Ya Sin', revelationType: 'Meccan', revelationTypeArabic: 'مكية', numberOfAyahs: 83, revelationOrder: 41 },
  { number: 37, nameArabic: 'الصافات', nameEnglish: 'As-Saffat', englishTranslation: 'Those who set the Ranks', revelationType: 'Meccan', revelationTypeArabic: 'مكية', numberOfAyahs: 182, revelationOrder: 56 },
  { number: 38, nameArabic: 'ص', nameEnglish: 'Sad', englishTranslation: 'The Letter "Saad"', revelationType: 'Meccan', revelationTypeArabic: 'مكية', numberOfAyahs: 88, revelationOrder: 38 },
  { number: 39, nameArabic: 'الزمر', nameEnglish: 'Az-Zumar', englishTranslation: 'The Troops', revelationType: 'Meccan', revelationTypeArabic: 'مكية', numberOfAyahs: 75, revelationOrder: 59 },
  { number: 40, nameArabic: 'غافر', nameEnglish: 'Ghafir', englishTranslation: 'The Forgiver', revelationType: 'Meccan', revelationTypeArabic: 'مكية', numberOfAyahs: 85, revelationOrder: 60 },
  { number: 41, nameArabic: 'فصلت', nameEnglish: 'Fussilat', englishTranslation: 'Explained in Detail', revelationType: 'Meccan', revelationTypeArabic: 'مكية', numberOfAyahs: 54, revelationOrder: 61 },
  { number: 42, nameArabic: 'الشورى', nameEnglish: 'Ash-Shuraa', englishTranslation: 'The Consultation', revelationType: 'Meccan', revelationTypeArabic: 'مكية', numberOfAyahs: 53, revelationOrder: 62 },
  { number: 43, nameArabic: 'الزخرف', nameEnglish: 'Az-Zukhruf', englishTranslation: 'The Ornaments of Gold', revelationType: 'Meccan', revelationTypeArabic: 'مكية', numberOfAyahs: 89, revelationOrder: 63 },
  { number: 44, nameArabic: 'الدخان', nameEnglish: 'Ad-Dukhan', englishTranslation: 'The Smoke', revelationType: 'Meccan', revelationTypeArabic: 'مكية', numberOfAyahs: 59, revelationOrder: 64 },
  { number: 45, nameArabic: 'الجاثية', nameEnglish: 'Al-Jathiyah', englishTranslation: 'The Crouching', revelationType: 'Meccan', revelationTypeArabic: 'مكية', numberOfAyahs: 37, revelationOrder: 65 },
  { number: 46, nameArabic: 'الأحقاف', nameEnglish: 'Al-Ahqaf', englishTranslation: 'The Wind-Curved Sandhills', revelationType: 'Meccan', revelationTypeArabic: 'مكية', numberOfAyahs: 35, revelationOrder: 66 },
  { number: 47, nameArabic: 'محمد', nameEnglish: 'Muhammad', englishTranslation: 'Muhammad', revelationType: 'Medinan', revelationTypeArabic: 'مدنية', numberOfAyahs: 38, revelationOrder: 95 },
  { number: 48, nameArabic: 'الفتح', nameEnglish: 'Al-Fath', englishTranslation: 'The Victory', revelationType: 'Medinan', revelationTypeArabic: 'مدنية', numberOfAyahs: 29, revelationOrder: 111 },
  { number: 49, nameArabic: 'الحجرات', nameEnglish: 'Al-Hujurat', englishTranslation: 'The Rooms', revelationType: 'Medinan', revelationTypeArabic: 'مدنية', numberOfAyahs: 18, revelationOrder: 106 },
  { number: 50, nameArabic: 'ق', nameEnglish: 'Qaf', englishTranslation: 'The Letter "Qaf"', revelationType: 'Meccan', revelationTypeArabic: 'مكية', numberOfAyahs: 45, revelationOrder: 34 },
  { number: 51, nameArabic: 'الذاريات', nameEnglish: 'Adh-Dhariyat', englishTranslation: 'The Winnowing Winds', revelationType: 'Meccan', revelationTypeArabic: 'مكية', numberOfAyahs: 60, revelationOrder: 67 },
  { number: 52, nameArabic: 'الطور', nameEnglish: 'At-Tur', englishTranslation: 'The Mount', revelationType: 'Meccan', revelationTypeArabic: 'مكية', numberOfAyahs: 49, revelationOrder: 76 },
  { number: 53, nameArabic: 'النجم', nameEnglish: 'An-Najm', englishTranslation: 'The Star', revelationType: 'Meccan', revelationTypeArabic: 'مكية', numberOfAyahs: 62, revelationOrder: 23 },
  { number: 54, nameArabic: 'القمر', nameEnglish: 'Al-Qamar', englishTranslation: 'The Moon', revelationType: 'Meccan', revelationTypeArabic: 'مكية', numberOfAyahs: 55, revelationOrder: 37 },
  { number: 55, nameArabic: 'الرحمن', nameEnglish: 'Ar-Rahman', englishTranslation: 'The Beneficent', revelationType: 'Medinan', revelationTypeArabic: 'مدنية', numberOfAyahs: 78, revelationOrder: 97 },
  { number: 56, nameArabic: 'الواقعة', nameEnglish: 'Al-Waqi\'ah', englishTranslation: 'The Inevitable', revelationType: 'Meccan', revelationTypeArabic: 'مكية', numberOfAyahs: 96, revelationOrder: 46 },
  { number: 57, nameArabic: 'الحديد', nameEnglish: 'Al-Hadid', englishTranslation: 'The Iron', revelationType: 'Medinan', revelationTypeArabic: 'مدنية', numberOfAyahs: 29, revelationOrder: 94 },
  { number: 58, nameArabic: 'المجادلة', nameEnglish: 'Al-Mujadila', englishTranslation: 'The Pleading Woman', revelationType: 'Medinan', revelationTypeArabic: 'مدنية', numberOfAyahs: 22, revelationOrder: 105 },
  { number: 59, nameArabic: 'الحشر', nameEnglish: 'Al-Hashr', englishTranslation: 'The Exile', revelationType: 'Medinan', revelationTypeArabic: 'مدنية', numberOfAyahs: 24, revelationOrder: 101 },
  { number: 60, nameArabic: 'الممتحنة', nameEnglish: 'Al-Mumtahanah', englishTranslation: 'She that is to be examined', revelationType: 'Medinan', revelationTypeArabic: 'مدنية', numberOfAyahs: 13, revelationOrder: 91 },
  { number: 61, nameArabic: 'الصف', nameEnglish: 'As-Saf', englishTranslation: 'The Ranks', revelationType: 'Medinan', revelationTypeArabic: 'مدنية', numberOfAyahs: 14, revelationOrder: 109 },
  { number: 62, nameArabic: 'الجمعة', nameEnglish: 'Al-Jumu\'ah', englishTranslation: 'The Congregation, Friday', revelationType: 'Medinan', revelationTypeArabic: 'مدنية', numberOfAyahs: 11, revelationOrder: 110 },
  { number: 63, nameArabic: 'المنافقون', nameEnglish: 'Al-Munafiqun', englishTranslation: 'The Hypocrites', revelationType: 'Medinan', revelationTypeArabic: 'مدنية', numberOfAyahs: 11, revelationOrder: 104 },
  { number: 64, nameArabic: 'التغابن', nameEnglish: 'At-Taghabun', englishTranslation: 'The Mutual Disillusion', revelationType: 'Medinan', revelationTypeArabic: 'مدنية', numberOfAyahs: 18, revelationOrder: 108 },
  { number: 65, nameArabic: 'الطلاق', nameEnglish: 'At-Talaq', englishTranslation: 'The Divorce', revelationType: 'Medinan', revelationTypeArabic: 'مدنية', numberOfAyahs: 12, revelationOrder: 99 },
  { number: 66, nameArabic: 'التحريم', nameEnglish: 'At-Tahrim', englishTranslation: 'The Prohibition', revelationType: 'Medinan', revelationTypeArabic: 'مدنية', numberOfAyahs: 12, revelationOrder: 107 },
  { number: 67, nameArabic: 'الملك', nameEnglish: 'Al-Mulk', englishTranslation: 'The Sovereignty', revelationType: 'Meccan', revelationTypeArabic: 'مكية', numberOfAyahs: 30, revelationOrder: 77 },
  { number: 68, nameArabic: 'القلم', nameEnglish: 'Al-Qalam', englishTranslation: 'The Pen', revelationType: 'Meccan', revelationTypeArabic: 'مكية', numberOfAyahs: 52, revelationOrder: 2 },
  { number: 69, nameArabic: 'الحاقة', nameEnglish: 'Al-Haqqah', englishTranslation: 'The Reality', revelationType: 'Meccan', revelationTypeArabic: 'مكية', numberOfAyahs: 52, revelationOrder: 78 },
  { number: 70, nameArabic: 'المعارج', nameEnglish: 'Al-Ma\'arij', englishTranslation: 'The Ascending Stairways', revelationType: 'Meccan', revelationTypeArabic: 'مكية', numberOfAyahs: 44, revelationOrder: 79 },
  { number: 71, nameArabic: 'نوح', nameEnglish: 'Nuh', englishTranslation: 'Noah', revelationType: 'Meccan', revelationTypeArabic: 'مكية', numberOfAyahs: 28, revelationOrder: 71 },
  { number: 72, nameArabic: 'الجن', nameEnglish: 'Al-Jinn', englishTranslation: 'The Jinn', revelationType: 'Meccan', revelationTypeArabic: 'مكية', numberOfAyahs: 28, revelationOrder: 40 },
  { number: 73, nameArabic: 'المزمل', nameEnglish: 'Al-Muzzammil', englishTranslation: 'The Enshrouded One', revelationType: 'Meccan', revelationTypeArabic: 'مكية', numberOfAyahs: 20, revelationOrder: 3 },
  { number: 74, nameArabic: 'المدثر', nameEnglish: 'Al-Muddaththir', englishTranslation: 'The Cloaked One', revelationType: 'Meccan', revelationTypeArabic: 'مكية', numberOfAyahs: 56, revelationOrder: 4 },
  { number: 75, nameArabic: 'القيامة', nameEnglish: 'Al-Qiyamah', englishTranslation: 'The Resurrection', revelationType: 'Meccan', revelationTypeArabic: 'مكية', numberOfAyahs: 40, revelationOrder: 31 },
  { number: 76, nameArabic: 'الإنسان', nameEnglish: 'Al-Insan', englishTranslation: 'The Man', revelationType: 'Medinan', revelationTypeArabic: 'مدنية', numberOfAyahs: 31, revelationOrder: 98 },
  { number: 77, nameArabic: 'المرسلات', nameEnglish: 'Al-Mursalat', englishTranslation: 'The Emissaries', revelationType: 'Meccan', revelationTypeArabic: 'مكية', numberOfAyahs: 50, revelationOrder: 33 },
  { number: 78, nameArabic: 'النبأ', nameEnglish: 'An-Naba', englishTranslation: 'The Tidings', revelationType: 'Meccan', revelationTypeArabic: 'مكية', numberOfAyahs: 40, revelationOrder: 80 },
  { number: 79, nameArabic: 'النازعات', nameEnglish: 'An-Nazi\'at', englishTranslation: 'Those who drag forth', revelationType: 'Meccan', revelationTypeArabic: 'مكية', numberOfAyahs: 46, revelationOrder: 81 },
  { number: 80, nameArabic: 'عبس', nameEnglish: '\'Abasa', englishTranslation: 'He frowned', revelationType: 'Meccan', revelationTypeArabic: 'مكية', numberOfAyahs: 42, revelationOrder: 24 },
  { number: 81, nameArabic: 'التكوير', nameEnglish: 'At-Takwir', englishTranslation: 'The Overthrowing', revelationType: 'Meccan', revelationTypeArabic: 'مكية', numberOfAyahs: 29, revelationOrder: 7 },
  { number: 82, nameArabic: 'الانفطار', nameEnglish: 'Al-Infitar', englishTranslation: 'The Cleaving', revelationType: 'Meccan', revelationTypeArabic: 'مكية', numberOfAyahs: 19, revelationOrder: 82 },
  { number: 83, nameArabic: 'المطففين', nameEnglish: 'Al-Mutaffifin', englishTranslation: 'The Defrauding', revelationType: 'Meccan', revelationTypeArabic: 'مكية', numberOfAyahs: 36, revelationOrder: 86 },
  { number: 84, nameArabic: 'الانشقاق', nameEnglish: 'Al-Inshiqaq', englishTranslation: 'The Splitting Open', revelationType: 'Meccan', revelationTypeArabic: 'مكية', numberOfAyahs: 25, revelationOrder: 83 },
  { number: 85, nameArabic: 'البروج', nameEnglish: 'Al-Buruj', englishTranslation: 'The Mansions of the Stars', revelationType: 'Meccan', revelationTypeArabic: 'مكية', numberOfAyahs: 22, revelationOrder: 27 },
  { number: 86, nameArabic: 'الطارق', nameEnglish: 'At-Tariq', englishTranslation: 'The Morning Star', revelationType: 'Meccan', revelationTypeArabic: 'مكية', numberOfAyahs: 17, revelationOrder: 36 },
  { number: 87, nameArabic: 'الأعلى', nameEnglish: 'Al-A\'la', englishTranslation: 'The Most High', revelationType: 'Meccan', revelationTypeArabic: 'مكية', numberOfAyahs: 19, revelationOrder: 8 },
  { number: 88, nameArabic: 'الغاشية', nameEnglish: 'Al-Ghashiyah', englishTranslation: 'The Overwhelming', revelationType: 'Meccan', revelationTypeArabic: 'مكية', numberOfAyahs: 26, revelationOrder: 68 },
  { number: 89, nameArabic: 'الفجر', nameEnglish: 'Al-Fajr', englishTranslation: 'The Dawn', revelationType: 'Meccan', revelationTypeArabic: 'مكية', numberOfAyahs: 30, revelationOrder: 10 },
  { number: 90, nameArabic: 'البلد', nameEnglish: 'Al-Balad', englishTranslation: 'The City', revelationType: 'Meccan', revelationTypeArabic: 'مكية', numberOfAyahs: 20, revelationOrder: 35 },
  { number: 91, nameArabic: 'الشمس', nameEnglish: 'Ash-Shams', englishTranslation: 'The Sun', revelationType: 'Meccan', revelationTypeArabic: 'مكية', numberOfAyahs: 15, revelationOrder: 26 },
  { number: 92, nameArabic: 'الليل', nameEnglish: 'Al-Layl', englishTranslation: 'The Night', revelationType: 'Meccan', revelationTypeArabic: 'مكية', numberOfAyahs: 21, revelationOrder: 9 },
  { number: 93, nameArabic: 'الضحى', nameEnglish: 'Ad-Duhaa', englishTranslation: 'The Morning Hours', revelationType: 'Meccan', revelationTypeArabic: 'مكية', numberOfAyahs: 11, revelationOrder: 11 },
  { number: 94, nameArabic: 'الشرح', nameEnglish: 'Ash-Sharh', englishTranslation: 'The Relief', revelationType: 'Meccan', revelationTypeArabic: 'مكية', numberOfAyahs: 8, revelationOrder: 12 },
  { number: 95, nameArabic: 'التين', nameEnglish: 'At-Tin', englishTranslation: 'The Fig', revelationType: 'Meccan', revelationTypeArabic: 'مكية', numberOfAyahs: 8, revelationOrder: 28 },
  { number: 96, nameArabic: 'العلق', nameEnglish: 'Al-\'Alaq', englishTranslation: 'The Clot', revelationType: 'Meccan', revelationTypeArabic: 'مكية', numberOfAyahs: 19, revelationOrder: 1 },
  { number: 97, nameArabic: 'القدر', nameEnglish: 'Al-Qadr', englishTranslation: 'The Power', revelationType: 'Meccan', revelationTypeArabic: 'مكية', numberOfAyahs: 5, revelationOrder: 25 },
  { number: 98, nameArabic: 'البينة', nameEnglish: 'Al-Bayyinah', englishTranslation: 'The Clear Proof', revelationType: 'Medinan', revelationTypeArabic: 'مدنية', numberOfAyahs: 8, revelationOrder: 100 },
  { number: 99, nameArabic: 'الزلزلة', nameEnglish: 'Az-Zalzalah', englishTranslation: 'The Earthquake', revelationType: 'Medinan', revelationTypeArabic: 'مدنية', numberOfAyahs: 8, revelationOrder: 93 },
  { number: 100, nameArabic: 'العاديات', nameEnglish: 'Al-\'Adiyat', englishTranslation: 'The Courser', revelationType: 'Meccan', revelationTypeArabic: 'مكية', numberOfAyahs: 11, revelationOrder: 14 },
  { number: 101, nameArabic: 'القارعة', nameEnglish: 'Al-Qari\'ah', englishTranslation: 'The Calamity', revelationType: 'Meccan', revelationTypeArabic: 'مكية', numberOfAyahs: 11, revelationOrder: 30 },
  { number: 102, nameArabic: 'التكاثر', nameEnglish: 'At-Takathur', englishTranslation: 'The Rivalry in world increase', revelationType: 'Meccan', revelationTypeArabic: 'مكية', numberOfAyahs: 8, revelationOrder: 16 },
  { number: 103, nameArabic: 'العصر', nameEnglish: 'Al-\'Asr', englishTranslation: 'The Declining Day', revelationType: 'Meccan', revelationTypeArabic: 'مكية', numberOfAyahs: 3, revelationOrder: 13 },
  { number: 104, nameArabic: 'الهمزة', nameEnglish: 'Al-Humazah', englishTranslation: 'The Traducer', revelationType: 'Meccan', revelationTypeArabic: 'مكية', numberOfAyahs: 9, revelationOrder: 32 },
  { number: 105, nameArabic: 'الفيل', nameEnglish: 'Al-Fil', englishTranslation: 'The Elephant', revelationType: 'Meccan', revelationTypeArabic: 'مكية', numberOfAyahs: 5, revelationOrder: 19 },
  { number: 106, nameArabic: 'قريش', nameEnglish: 'Quraysh', englishTranslation: 'Quraysh', revelationType: 'Meccan', revelationTypeArabic: 'مكية', numberOfAyahs: 4, revelationOrder: 29 },
  { number: 107, nameArabic: 'الماعون', nameEnglish: 'Al-Ma\'un', englishTranslation: 'The Small Kindness', revelationType: 'Meccan', revelationTypeArabic: 'مكية', numberOfAyahs: 7, revelationOrder: 17 },
  { number: 108, nameArabic: 'الكوثر', nameEnglish: 'Al-Kawthar', englishTranslation: 'The Abundance', revelationType: 'Meccan', revelationTypeArabic: 'مكية', numberOfAyahs: 3, revelationOrder: 15 },
  { number: 109, nameArabic: 'الكافرون', nameEnglish: 'Al-Kafirun', englishTranslation: 'The Disbelievers', revelationType: 'Meccan', revelationTypeArabic: 'مكية', numberOfAyahs: 6, revelationOrder: 18 },
  { number: 110, nameArabic: 'النصر', nameEnglish: 'An-Nasr', englishTranslation: 'The Divine Support', revelationType: 'Medinan', revelationTypeArabic: 'مدنية', numberOfAyahs: 3, revelationOrder: 114 },
  { number: 111, nameArabic: 'المسد', nameEnglish: 'Al-Masad', englishTranslation: 'The Palm Fiber', revelationType: 'Meccan', revelationTypeArabic: 'مكية', numberOfAyahs: 5, revelationOrder: 6 },
  { number: 112, nameArabic: 'الإخلاص', nameEnglish: 'Al-Ikhlas', englishTranslation: 'The Sincerity', revelationType: 'Meccan', revelationTypeArabic: 'مكية', numberOfAyahs: 4, revelationOrder: 22 },
  { number: 113, nameArabic: 'الفلق', nameEnglish: 'Al-Falaq', englishTranslation: 'The Daybreak', revelationType: 'Meccan', revelationTypeArabic: 'مكية', numberOfAyahs: 5, revelationOrder: 20 },
  { number: 114, nameArabic: 'الناس', nameEnglish: 'An-Nas', englishTranslation: 'Mankind', revelationType: 'Meccan', revelationTypeArabic: 'مكية', numberOfAyahs: 6, revelationOrder: 21 },
];

/**
 * Built-in text for popular and short Surahs for instant offline reading
 */
export const BUILT_IN_SURAHS: Record<number, { bismillah: boolean; ayahs: { number: number; text: string }[] }> = {
  // Al-Fatihah
  1: {
    bismillah: false,
    ayahs: [
      { number: 1, text: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ' },
      { number: 2, text: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ' },
      { number: 3, text: 'الرَّحْمَٰنِ الرَّحِيمِ' },
      { number: 4, text: 'مَالِكِ يَوْمِ الدِّينِ' },
      { number: 5, text: 'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ' },
      { number: 6, text: 'اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ' },
      { number: 7, text: 'صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ' },
    ],
  },
  // Al-Ikhlas
  112: {
    bismillah: true,
    ayahs: [
      { number: 1, text: 'قُلْ هُوَ اللَّهُ أَحَدٌ' },
      { number: 2, text: 'اللَّهُ الصَّمَدُ' },
      { number: 3, text: 'لَمْ يَلِدْ وَلَمْ يُولَدْ' },
      { number: 4, text: 'وَلَمْ يَكُنْ لَهُ كُفُوًا أَحَدٌ' },
    ],
  },
  // Al-Falaq
  113: {
    bismillah: true,
    ayahs: [
      { number: 1, text: 'قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ' },
      { number: 2, text: 'مِنْ شَرِّ مَا خَلَقَ' },
      { number: 3, text: 'وَمِنْ شَرِّ غَاسِقٍ إِذَا وَقَبَ' },
      { number: 4, text: 'وَمِنْ شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ' },
      { number: 5, text: 'وَمِنْ شَرِّ حَاسِدٍ إِذَا حَسَدَ' },
    ],
  },
  // An-Nas
  114: {
    bismillah: true,
    ayahs: [
      { number: 1, text: 'قُلْ أَعُوذُ بِرَبِّ النَّاسِ' },
      { number: 2, text: 'مَلِكِ النَّاسِ' },
      { number: 3, text: 'إِلَٰهِ النَّاسِ' },
      { number: 4, text: 'مِنْ شَرِّ الْوَسْوَاسِ الْخَنَّاسِ' },
      { number: 5, text: 'الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ' },
      { number: 6, text: 'مِنَ الْجِنَّةِ وَالنَّاسِ' },
    ],
  },
  // Al-Kawthar
  108: {
    bismillah: true,
    ayahs: [
      { number: 1, text: 'إِنَّا أَعْطَيْنَاكَ الْكَوْثَرَ' },
      { number: 2, text: 'فَصَلِّ لِرَبِّكَ وَانْحَرْ' },
      { number: 3, text: 'إِنَّ شَانِئَكَ هُوَ الْأَبْتَرُ' },
    ],
  },
  // Al-Asr
  103: {
    bismillah: true,
    ayahs: [
      { number: 1, text: 'وَالْعَصْرِ' },
      { number: 2, text: 'إِنَّ الْإِنْسَانَ لَفِي خُسْرٍ' },
      { number: 3, text: 'إِلَّا الَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ وَتَوَاصَوْا بِالْحَقِّ وَتَوَاصَوْا بِالصَّبْرِ' },
    ],
  },
  // Al-Mulk (first 5 verses)
  67: {
    bismillah: true,
    ayahs: [
      { number: 1, text: 'تَبَارَكَ الَّذِي بِيَدِهِ الْمُلْكُ وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ' },
      { number: 2, text: 'الَّذِي خَلَقَ الْمَوْتَ وَالْحَيَاةَ لِيَبْلُوَكُمْ أَيُّكُمْ أَحْسَنُ عَمَلًا ۚ وَهُوَ الْعَزِيزُ الْغَفُورُ' },
      { number: 3, text: 'الَّذِي خَلَقَ سَبْعَ سَمَاوَاتٍ طِبَاقًا ۖ مَّا تَرَىٰ فِي خَلْقِ الرَّحْمَٰنِ مِن تَفَاوُتٍ ۖ فَارْجِعِ الْبَصَرَ هَلْ تَرَىٰ مِن فُطُورٍ' },
      { number: 4, text: 'ثُمَّ ارْجِعِ الْبَصَرَ كَرَّتَيْنِ يَنقَلِبْ إِلَيْكَ الْبَصَرُ خَاسِئًا وَهُوَ حَسِيرٌ' },
      { number: 5, text: 'وَلَقَدْ زَيَّنَّا السَّمَاءَ الدُّنْيَا بِمَصَابِيحَ وَجَعَلْنَاهَا رُجُومًا لِّلشَّيَاطِينِ ۖ وَأَعْتَدْنَا لَهُمْ عَذَابَ السَّعِيرِ' },
    ],
  },
};
