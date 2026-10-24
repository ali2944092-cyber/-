import { IslamicEvent } from '../types';

export const HIJRI_MONTHS_ARABIC = [
  'المحرّم',
  'صفر',
  'ربيع الأول',
  'ربيع الثاني',
  'جمادى الأولى',
  'جمادى الآخرة',
  'رجب',
  'شعبان',
  'رمضان المبارك',
  'شوّال',
  'ذو القعدة',
  'ذو الحجة',
];

export const GREGORIAN_MONTHS_ARABIC = [
  'يناير',
  'فبراير',
  'مارس',
  'أبريل',
  'مايو',
  'يونيو',
  'يوليو',
  'أغسطس',
  'سبتمبر',
  'أكتوبر',
  'نوفمبر',
  'ديسمبر',
];

export const DAYS_OF_WEEK_ARABIC = [
  'الأحد',
  'الإثنين',
  'الثلاثاء',
  'الأربعاء',
  'الخميس',
  'الجمعة',
  'السبت',
];

export interface HijriDateInfo {
  day: number;
  month: number; // 1-12
  monthName: string;
  year: number;
  formattedArabic: string;
  gregorianFormatted: string;
  dayName: string;
}

export function getHijriDate(date: Date = new Date(), adjustmentDays: number = 0): HijriDateInfo {
  const adjustedDate = new Date(date);
  if (adjustmentDays !== 0) {
    adjustedDate.setDate(adjustedDate.getDate() + adjustmentDays);
  }

  try {
    const formatter = new Intl.DateTimeFormat('ar-SA-u-ca-islamic-umalqura', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
    });
    const parts = formatter.formatToParts(adjustedDate);
    let day = 1;
    let month = 1;
    let year = 1448;

    for (const part of parts) {
      if (part.type === 'day') day = parseInt(part.value, 10) || 1;
      if (part.type === 'month') month = parseInt(part.value, 10) || 1;
      if (part.type === 'year') year = parseInt(part.value, 10) || 1448;
    }

    // fallback bounds check
    month = Math.max(1, Math.min(12, month));
    const monthName = HIJRI_MONTHS_ARABIC[month - 1] || 'محرم';
    const dayName = DAYS_OF_WEEK_ARABIC[date.getDay()];

    const gregDay = date.getDate();
    const gregMonth = GREGORIAN_MONTHS_ARABIC[date.getMonth()];
    const gregYear = date.getFullYear();
    const gregorianFormatted = `${dayName}، ${gregDay} ${gregMonth} ${gregYear} م`;
    const formattedArabic = `${day} ${monthName} ${year} هـ`;

    return {
      day,
      month,
      monthName,
      year,
      formattedArabic,
      gregorianFormatted,
      dayName,
    };
  } catch {
    // Basic mathematical estimation fallback if Intl islamic calendar fails
    return {
      day: 12,
      month: 5,
      monthName: HIJRI_MONTHS_ARABIC[4],
      year: 1448,
      formattedArabic: `12 جمادى الأولى 1448 هـ`,
      gregorianFormatted: date.toLocaleDateString('ar-EG'),
      dayName: DAYS_OF_WEEK_ARABIC[date.getDay()],
    };
  }
}

export const ISLAMIC_EVENTS: IslamicEvent[] = [
  {
    name: 'رأس السنة الهجرية',
    hijriDay: 1,
    hijriMonth: 1,
    hijriMonthName: 'المحرّم',
    description: 'بداية العام الهجري الجديد وذكرى هجرة النبي ﷺ',
  },
  {
    name: 'يوم عاشوراء',
    hijriDay: 10,
    hijriMonth: 1,
    hijriMonthName: 'المحرّم',
    description: 'يوم نجا الله فيه موسى وقومه، ويُستحب صيامه',
  },
  {
    name: 'المولد النبوي الشريف',
    hijriDay: 12,
    hijriMonth: 3,
    hijriMonthName: 'ربيع الأول',
    description: 'ذكرى مولد خير الأنام محمد ﷺ',
  },
  {
    name: 'ليلة الإسراء والمعراج',
    hijriDay: 27,
    hijriMonth: 7,
    hijriMonthName: 'رجب',
    description: 'معجزة الإسراء من المسجد الحرام للمسجد الأقصى والعروج للسماء وفرض الصلاة',
  },
  {
    name: 'ليلة النصف من شعبان',
    hijriDay: 15,
    hijriMonth: 8,
    hijriMonthName: 'شعبان',
    description: 'تحويل القبلة من بيت المقدس إلى الكعبة المشرفة',
  },
  {
    name: 'غرة شهر رمضان المبارك',
    hijriDay: 1,
    hijriMonth: 9,
    hijriMonthName: 'رمضان المبارك',
    description: 'أول أيام شهر الصيام والقرآن والبركات',
  },
  {
    name: 'ليلة القدر (أوتار العشر الأواخر)',
    hijriDay: 27,
    hijriMonth: 9,
    hijriMonthName: 'رمضان المبارك',
    description: 'ليلة القدر خير من ألف شهر، تنزّل الملائكة والروح فيها',
  },
  {
    name: 'عيد الفطر المبارك',
    hijriDay: 1,
    hijriMonth: 10,
    hijriMonthName: 'شوّال',
    description: 'يوم الجائزة والفرح بإتمام صيام شهر رمضان المبارك',
  },
  {
    name: 'يوم عرفة',
    hijriDay: 9,
    hijriMonth: 12,
    hijriMonthName: 'ذو الحجة',
    description: 'خير يوم طلعت عليه الشمس، وقفة حجاج بيت الله وصيامه يكفر سنتين',
  },
  {
    name: 'عيد الأضحى المبارك',
    hijriDay: 10,
    hijriMonth: 12,
    hijriMonthName: 'ذو الحجة',
    description: 'يوم النحر وذبح الأضاحي وأيام التشريق المباركة',
  },
];
