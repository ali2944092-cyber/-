import {
  Coordinates,
  CalculationMethod,
  PrayerTimes,
  Madhab,
  HighLatitudeRule,
} from 'adhan';
import {
  CityLocation,
  CalculationMethodId,
  MadhabId,
  PrayerName,
  PrayerTimeItem,
} from '../types';

export const CALCULATION_METHODS: { id: CalculationMethodId; nameArabic: string }[] = [
  { id: 'UmmAlQura', nameArabic: 'جامعة أم القرى (مكة المكرمة والسعودية والخليج)' },
  { id: 'Egyptian', nameArabic: 'الهيئة المصرية العامة للمساحة (مصر والدول المجاورة)' },
  { id: 'MuslimWorldLeague', nameArabic: 'رابطة العالم الإسلامي (أوروبا وأغلب الدول)' },
  { id: 'Dubai', nameArabic: 'دائرة الشؤون الإسلامية بدبي' },
  { id: 'Qatar', nameArabic: 'وزارة الأوقاف والشؤون الإسلامية بقطر' },
  { id: 'Kuwait', nameArabic: 'وزارة الأوقاف والشؤون الإسلامية بالكويت' },
  { id: 'Karachi', nameArabic: 'جامعة العلوم الإسلامية بكراتشي' },
  { id: 'NorthAmerica', nameArabic: 'الجمعية الإسلامية لأمريكا الشمالية (ISNA)' },
  { id: 'MoonsightingCommittee', nameArabic: 'لجنة رؤية الهلال العالمية' },
];

export const PRAYER_NAMES_ARABIC: Record<PrayerName, string> = {
  fajr: 'الفجر',
  sunrise: 'الشروق',
  dhuhr: 'الظهر',
  asr: 'العصر',
  maghrib: 'المغرب',
  isha: 'العشاء',
};

export function getCalculationParameters(
  methodId: CalculationMethodId,
  madhabId: MadhabId
) {
  let params;
  switch (methodId) {
    case 'UmmAlQura':
      params = CalculationMethod.UmmAlQura();
      break;
    case 'Egyptian':
      params = CalculationMethod.Egyptian();
      break;
    case 'MuslimWorldLeague':
      params = CalculationMethod.MuslimWorldLeague();
      break;
    case 'Dubai':
      params = CalculationMethod.Dubai();
      break;
    case 'Qatar':
      params = CalculationMethod.Qatar();
      break;
    case 'Kuwait':
      params = CalculationMethod.Kuwait();
      break;
    case 'Karachi':
      params = CalculationMethod.Karachi();
      break;
    case 'NorthAmerica':
      params = CalculationMethod.NorthAmerica();
      break;
    case 'MoonsightingCommittee':
      params = CalculationMethod.MoonsightingCommittee();
      break;
    default:
      params = CalculationMethod.UmmAlQura();
  }

  params.madhab = madhabId === 'hanafi' ? Madhab.Hanafi : Madhab.Shafi;
  params.highLatitudeRule = HighLatitudeRule.TwilightAngle;
  return params;
}

export function formatPrayerTime(date: Date): string {
  if (!date || isNaN(date.getTime())) return '--:--';
  return date.toLocaleTimeString('ar-EG', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
}

export function formatPrayerTime24h(date: Date): string {
  if (!date || isNaN(date.getTime())) return '--:--';
  return date.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
}

export interface DayPrayerCalculations {
  date: Date;
  times: PrayerTimeItem[];
  currentPrayer: PrayerTimeItem | null;
  nextPrayer: PrayerTimeItem | null;
  timeUntilNextFormatted: string;
  secondsRemaining: number;
  progressPercentage: number;
  midnight: Date;
  lastThirdOfNight: Date;
}

export function calculatePrayerTimes(
  city: CityLocation,
  methodId: CalculationMethodId,
  madhabId: MadhabId,
  currentDate: Date = new Date(),
  notificationSettings: Record<PrayerName, boolean> = {
    fajr: true,
    sunrise: false,
    dhuhr: true,
    asr: true,
    maghrib: true,
    isha: true,
  }
): DayPrayerCalculations {
  const coordinates = new Coordinates(city.latitude, city.longitude);
  const params = getCalculationParameters(methodId, madhabId);

  // Prayer times for today
  const prayerTimesToday = new PrayerTimes(coordinates, currentDate, params);

  // Next day prayer times for Fajr wrap-around calculation
  const tomorrow = new Date(currentDate);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const prayerTimesTomorrow = new PrayerTimes(coordinates, tomorrow, params);

  // Yesterday prayer times for Fajr early morning
  const yesterday = new Date(currentDate);
  yesterday.setDate(yesterday.getDate() - 1);
  const prayerTimesYesterday = new PrayerTimes(coordinates, yesterday, params);

  const rawList: { id: PrayerName; time: Date }[] = [
    { id: 'fajr', time: prayerTimesToday.fajr },
    { id: 'sunrise', time: prayerTimesToday.sunrise },
    { id: 'dhuhr', time: prayerTimesToday.dhuhr },
    { id: 'asr', time: prayerTimesToday.asr },
    { id: 'maghrib', time: prayerTimesToday.maghrib },
    { id: 'isha', time: prayerTimesToday.isha },
  ];

  const nowMs = currentDate.getTime();

  // Determine current and next prayer
  let nextPrayerId: PrayerName = 'fajr';
  let nextPrayerTime: Date = prayerTimesToday.fajr;
  let prevPrayerTime: Date = prayerTimesYesterday.isha;
  let currentPrayerId: PrayerName = 'isha';

  if (nowMs < prayerTimesToday.fajr.getTime()) {
    nextPrayerId = 'fajr';
    nextPrayerTime = prayerTimesToday.fajr;
    prevPrayerTime = prayerTimesYesterday.isha;
    currentPrayerId = 'isha';
  } else if (nowMs < prayerTimesToday.sunrise.getTime()) {
    nextPrayerId = 'sunrise';
    nextPrayerTime = prayerTimesToday.sunrise;
    prevPrayerTime = prayerTimesToday.fajr;
    currentPrayerId = 'fajr';
  } else if (nowMs < prayerTimesToday.dhuhr.getTime()) {
    nextPrayerId = 'dhuhr';
    nextPrayerTime = prayerTimesToday.dhuhr;
    prevPrayerTime = prayerTimesToday.sunrise;
    currentPrayerId = 'sunrise';
  } else if (nowMs < prayerTimesToday.asr.getTime()) {
    nextPrayerId = 'asr';
    nextPrayerTime = prayerTimesToday.asr;
    prevPrayerTime = prayerTimesToday.dhuhr;
    currentPrayerId = 'dhuhr';
  } else if (nowMs < prayerTimesToday.maghrib.getTime()) {
    nextPrayerId = 'maghrib';
    nextPrayerTime = prayerTimesToday.maghrib;
    prevPrayerTime = prayerTimesToday.asr;
    currentPrayerId = 'asr';
  } else if (nowMs < prayerTimesToday.isha.getTime()) {
    nextPrayerId = 'isha';
    nextPrayerTime = prayerTimesToday.isha;
    prevPrayerTime = prayerTimesToday.maghrib;
    currentPrayerId = 'maghrib';
  } else {
    // After Isha, next is tomorrow's Fajr
    nextPrayerId = 'fajr';
    nextPrayerTime = prayerTimesTomorrow.fajr;
    prevPrayerTime = prayerTimesToday.isha;
    currentPrayerId = 'isha';
  }

  // Calculate remaining seconds and progress
  const totalWindowMs = Math.max(1, nextPrayerTime.getTime() - prevPrayerTime.getTime());
  const elapsedMs = Math.max(0, Math.min(totalWindowMs, nowMs - prevPrayerTime.getTime()));
  const progressPercentage = Math.min(100, Math.max(0, (elapsedMs / totalWindowMs) * 100));

  const diffMs = Math.max(0, nextPrayerTime.getTime() - nowMs);
  const secondsRemaining = Math.floor(diffMs / 1000);
  const hours = Math.floor(secondsRemaining / 3600);
  const minutes = Math.floor((secondsRemaining % 3600) / 60);
  const seconds = secondsRemaining % 60;

  const pad = (n: number) => n.toString().padStart(2, '0');
  const timeUntilNextFormatted = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;

  const prayerItems: PrayerTimeItem[] = rawList.map((item) => {
    const isPassed = nowMs > item.time.getTime();
    const isNext = item.id === nextPrayerId;
    const isCurrent = item.id === currentPrayerId;

    return {
      id: item.id,
      arabicName: PRAYER_NAMES_ARABIC[item.id],
      time: item.time,
      formattedTime: formatPrayerTime(item.time),
      isNext,
      isPassed,
      isCurrent,
      notificationEnabled: !!notificationSettings[item.id],
    };
  });

  const currentItem = prayerItems.find((p) => p.isCurrent) || null;
  const nextItem = prayerItems.find((p) => p.isNext) || {
    id: nextPrayerId,
    arabicName: PRAYER_NAMES_ARABIC[nextPrayerId],
    time: nextPrayerTime,
    formattedTime: formatPrayerTime(nextPrayerTime),
    isNext: true,
    isPassed: false,
    isCurrent: false,
    notificationEnabled: !!notificationSettings[nextPrayerId],
  };

  // Calculate midnight & last third of night (قيام الليل)
  // Night duration = tomorrow's Fajr - today's Maghrib
  const nightDurationMs = prayerTimesTomorrow.fajr.getTime() - prayerTimesToday.maghrib.getTime();
  const midnight = new Date(prayerTimesToday.maghrib.getTime() + nightDurationMs / 2);
  const lastThirdOfNight = new Date(
    prayerTimesToday.maghrib.getTime() + (nightDurationMs * 2) / 3
  );

  return {
    date: currentDate,
    times: prayerItems,
    currentPrayer: currentItem,
    nextPrayer: nextItem,
    timeUntilNextFormatted,
    secondsRemaining,
    progressPercentage,
    midnight,
    lastThirdOfNight,
  };
}
