export type PrayerName = 'fajr' | 'sunrise' | 'dhuhr' | 'asr' | 'maghrib' | 'isha';

export interface PrayerTimeItem {
  id: PrayerName;
  arabicName: string;
  time: Date;
  formattedTime: string;
  isNext: boolean;
  isPassed: boolean;
  isCurrent: boolean;
  notificationEnabled: boolean;
}

export interface CityLocation {
  id: string;
  nameArabic: string;
  nameEnglish: string;
  countryArabic: string;
  countryEnglish: string;
  latitude: number;
  longitude: number;
  timezone: string;
  defaultMethod?: CalculationMethodId;
}

export type CalculationMethodId =
  | 'UmmAlQura'
  | 'Egyptian'
  | 'MuslimWorldLeague'
  | 'NorthAmerica'
  | 'Karachi'
  | 'Kuwait'
  | 'MoonsightingCommittee'
  | 'Dubai'
  | 'Qatar';

export type MadhabId = 'shafi' | 'hanafi';

export interface AppSettings {
  city: CityLocation;
  calculationMethod: CalculationMethodId;
  madhab: MadhabId;
  hijriAdjustment: number; // -2, -1, 0, 1, 2
  adhanMuaddhin: string;
  adhanVolume: number;
  playDuaAfterAdhan: boolean;
  enableBrowserNotifications: boolean;
  prayerNotifications: Record<PrayerName, boolean>;
  quranFontSize: number;
  reciterId: string;
}

export interface DhikrItem {
  id: string;
  category: 'after_prayer' | 'morning' | 'evening' | 'sleep' | 'wake';
  arabicText: string;
  fadl?: string; // فضل الذكر
  reference?: string; // المصدر / الرواية
  repeatTarget: number;
}

export interface QuranSurahMeta {
  number: number;
  nameArabic: string;
  nameEnglish: string;
  englishTranslation: string;
  revelationType: 'Meccan' | 'Medinan';
  revelationTypeArabic: 'مكية' | 'مدنية';
  numberOfAyahs: number;
  revelationOrder: number;
}

export interface QuranAyah {
  number: number;
  numberInSurah: number;
  text: string;
  audioUrl?: string;
  page?: number;
  juz?: number;
}

export interface IslamicEvent {
  name: string;
  hijriDay: number;
  hijriMonth: number;
  hijriMonthName: string;
  description: string;
}
