import React from 'react';
import {
  Bell,
  BellOff,
  Volume2,
  Navigation,
  Sun,
  Sunset,
  Sunrise,
  Moon,
  CloudSun,
  Sparkles,
  Info,
} from 'lucide-react';
import { CityLocation, PrayerName, PrayerTimeItem } from '../types';
import { DayPrayerCalculations } from '../utils/prayerCalculations';
import { HijriDateInfo } from '../utils/hijriCalendar';
import { POPULAR_CITIES } from '../data/cities';

interface PrayerTimesSectionProps {
  calculations: DayPrayerCalculations;
  city: CityLocation;
  onSelectCity: (city: CityLocation) => void;
  onDetectLocation: () => void;
  isDetectingLocation: boolean;
  hijriDate: HijriDateInfo;
  onToggleNotification: (prayerId: PrayerName) => void;
  onPlayAdhanPreview: (prayerName: string) => void;
  notificationSettings: Record<PrayerName, boolean>;
}

const PRAYER_ICONS: Record<PrayerName, React.ElementType> = {
  fajr: Sunrise,
  sunrise: Sunrise,
  dhuhr: Sun,
  asr: CloudSun,
  maghrib: Sunset,
  isha: Moon,
};

export const PrayerTimesSection: React.FC<PrayerTimesSectionProps> = ({
  calculations,
  city,
  onSelectCity,
  onDetectLocation,
  isDetectingLocation,
  hijriDate,
  onToggleNotification,
  onPlayAdhanPreview,
  notificationSettings,
}) => {
  const { nextPrayer, currentPrayer, times, timeUntilNextFormatted, progressPercentage, midnight, lastThirdOfNight } =
    calculations;

  const NextIcon = nextPrayer ? PRAYER_ICONS[nextPrayer.id] : Moon;

  return (
    <div className="space-y-6">
      {/* Hero Next Prayer Countdown Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-950 via-slate-900 to-teal-950 border border-emerald-800/40 p-6 sm:p-8 shadow-2xl">
        {/* Decorative background glow */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6 text-center lg:text-right">
          {/* Main Info */}
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 bg-emerald-900/60 border border-emerald-600/40 px-3.5 py-1 rounded-full text-emerald-300 text-xs sm:text-sm font-medium">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>الصلاة القادمة: {nextPrayer?.arabicName}</span>
              <span className="text-slate-400">&bull;</span>
              <span className="font-bold text-amber-300">{nextPrayer?.formattedTime}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              {nextPrayer?.arabicName}
            </h2>

            <p className="text-sm sm:text-base text-slate-300">
              في مدينة <span className="text-emerald-400 font-semibold">{city.nameArabic}</span> &bull;{' '}
              {city.countryArabic}
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-2 text-xs text-slate-400">
              <span className="bg-slate-900/80 px-2.5 py-1 rounded-lg border border-slate-800">
                {hijriDate.formattedArabic}
              </span>
              <span className="bg-slate-900/80 px-2.5 py-1 rounded-lg border border-slate-800">
                {hijriDate.gregorianFormatted}
              </span>
            </div>
          </div>

          {/* Countdown timer & Progress */}
          <div className="flex flex-col items-center justify-center bg-slate-900/90 border border-emerald-700/30 rounded-2xl p-6 min-w-[260px] shadow-xl">
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-medium mb-1">
              <NextIcon className="w-4 h-4 animate-bounce" />
              <span>الوقت المتبقي للأذان</span>
            </div>

            {/* Countdown Numbers */}
            <div
              className="text-4xl sm:text-5xl font-mono font-bold text-amber-300 tracking-wider my-2"
              dir="ltr"
            >
              {timeUntilNextFormatted}
            </div>

            {/* Progress bar */}
            <div className="w-full bg-slate-800 rounded-full h-2 my-2 overflow-hidden border border-slate-700">
              <div
                className="bg-gradient-to-r from-teal-400 to-amber-400 h-full rounded-full transition-all duration-1000"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>

            <div className="flex items-center justify-between w-full text-[11px] text-slate-400 mt-1">
              <span>{currentPrayer?.arabicName || 'الصلاة السابقة'}</span>
              <span>{nextPrayer?.arabicName}</span>
            </div>

            {/* Adhan quick preview button */}
            <button
              onClick={() => onPlayAdhanPreview(nextPrayer?.arabicName || 'الأذان')}
              className="mt-4 flex items-center justify-center gap-2 w-full py-2 px-3 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/40 text-emerald-300 text-xs font-medium transition cursor-pointer"
            >
              <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>سماع نداء الأذان</span>
            </button>
          </div>
        </div>
      </div>

      {/* 6 Prayer Times Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {times.map((item: PrayerTimeItem) => {
          const Icon = PRAYER_ICONS[item.id];
          const isNext = item.isNext;
          const isCurrent = item.isCurrent;
          const isPassed = item.isPassed;
          const hasNotif = notificationSettings[item.id];

          return (
            <div
              key={item.id}
              className={`relative flex flex-col justify-between rounded-2xl p-4 sm:p-5 transition-all duration-300 border ${
                isNext
                  ? 'bg-gradient-to-b from-emerald-900/50 to-slate-900 border-amber-400/70 shadow-lg shadow-emerald-950/60 scale-[1.02]'
                  : isCurrent
                  ? 'bg-gradient-to-b from-teal-950/60 to-slate-900 border-teal-500/60 shadow-md'
                  : isPassed
                  ? 'bg-slate-900/60 border-slate-800/80 opacity-75'
                  : 'bg-slate-900/80 border-slate-800 hover:border-emerald-800/60'
              }`}
            >
              {/* Status Ribbon Badge */}
              <div className="flex items-center justify-between mb-3">
                <span
                  className={`text-[10px] sm:text-xs font-semibold px-2 py-0.5 rounded-full ${
                    isNext
                      ? 'bg-amber-400/20 text-amber-300 border border-amber-400/40'
                      : isCurrent
                      ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40'
                      : isPassed
                      ? 'bg-slate-800 text-slate-400'
                      : 'bg-emerald-950 text-emerald-400'
                  }`}
                >
                  {isNext ? 'القادمة' : isCurrent ? 'الحالية' : isPassed ? 'مضت' : 'مرتقبة'}
                </span>

                {/* Notification Toggle Button */}
                <button
                  onClick={() => onToggleNotification(item.id)}
                  className={`p-1.5 rounded-lg transition cursor-pointer ${
                    hasNotif
                      ? 'text-amber-400 hover:bg-amber-400/10'
                      : 'text-slate-500 hover:text-slate-400 hover:bg-slate-800'
                  }`}
                  title={hasNotif ? 'تنبيه الأذان مفعل' : 'تنبيه الأذان معطل'}
                >
                  {hasNotif ? <Bell className="w-3.5 h-3.5 fill-amber-400/30" /> : <BellOff className="w-3.5 h-3.5" />}
                </button>
              </div>

              {/* Icon & Name */}
              <div className="flex items-center gap-2 mb-2">
                <div
                  className={`p-2 rounded-xl ${
                    isNext
                      ? 'bg-amber-400/20 text-amber-300'
                      : isCurrent
                      ? 'bg-teal-500/20 text-teal-300'
                      : 'bg-slate-800/80 text-emerald-400'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm sm:text-base text-white">{item.arabicName}</h3>
                </div>
              </div>

              {/* Formatted Time */}
              <div className="mt-2 pt-2 border-t border-slate-800/60">
                <p
                  className={`text-base sm:text-lg font-bold font-mono tracking-tight ${
                    isNext ? 'text-amber-300' : 'text-slate-100'
                  }`}
                  dir="ltr"
                >
                  {item.formattedTime}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick City Switcher & GPS location bar */}
      <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-4">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-300 font-medium">
            <Navigation className="w-4 h-4 text-emerald-400" />
            <span>اختر مدينة سريعة أو حدد موقعك:</span>
          </div>

          {/* GPS Auto-Detect Button */}
          <button
            onClick={onDetectLocation}
            disabled={isDetectingLocation}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/30 text-emerald-300 text-xs font-medium transition cursor-pointer disabled:opacity-50"
          >
            <Navigation className={`w-3.5 h-3.5 ${isDetectingLocation ? 'animate-spin' : ''}`} />
            <span>{isDetectingLocation ? 'جاري تحديد موقعك...' : 'تحديد موقعي تلقائياً (GPS)'}</span>
          </button>
        </div>

        {/* Quick Popular Cities Pills */}
        <div className="flex flex-wrap gap-2">
          {POPULAR_CITIES.slice(0, 10).map((c) => {
            const isSelected = city.id === c.id;
            return (
              <button
                key={c.id}
                onClick={() => onSelectCity(c)}
                className={`px-3 py-1 rounded-xl text-xs font-medium transition cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-600 text-white font-semibold shadow-sm'
                    : 'bg-slate-800/80 hover:bg-slate-800 text-slate-300 border border-slate-700/60'
                }`}
              >
                {c.nameArabic}
              </button>
            );
          })}
        </div>
      </div>

      {/* Night Times: Midnight & Qiyam Al-Layl + Hadith Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Midnight Card */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-950/60 text-indigo-400 border border-indigo-800/40">
              <Moon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-slate-400">منتصف الليل الشرعي</p>
              <h4 className="text-sm sm:text-base font-bold text-white">انتهاء وقت العشاء</h4>
            </div>
          </div>
          <p className="text-base font-mono font-bold text-indigo-300" dir="ltr">
            {midnight.toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit', hour12: true })}
          </p>
        </div>

        {/* Last Third of Night (Qiyam) */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-950/60 text-amber-400 border border-amber-800/40">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-slate-400">الثلث الأخير من الليل</p>
              <h4 className="text-sm sm:text-base font-bold text-white">قيام الليل واستجابة الدعاء</h4>
            </div>
          </div>
          <p className="text-base font-mono font-bold text-amber-300" dir="ltr">
            {lastThirdOfNight.toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit', hour12: true })}
          </p>
        </div>

        {/* Daily Hadith about prayer */}
        <div className="bg-gradient-to-br from-emerald-950/40 to-slate-900/60 border border-emerald-900/40 rounded-2xl p-4 flex items-start gap-3">
          <div className="p-2 rounded-xl bg-emerald-900/50 text-emerald-400 shrink-0 mt-0.5">
            <Info className="w-4 h-4" />
          </div>
          <div className="text-xs leading-relaxed text-slate-300">
            <p className="font-semibold text-emerald-300 mb-1">فضل الصلاة لوقتها:</p>
            <p className="italic font-amiri text-sm text-slate-200">
              «سُئِلَ النَّبِيُّ ﷺ: أَيُّ العَمَلِ أَحَبُّ إِلَى اللهِ؟ قَالَ: الصَّلَاةُ عَلَى وَقْتِهَا»
            </p>
            <span className="text-[10px] text-slate-500 mt-1 block">صحيح البخاري ومسلم</span>
          </div>
        </div>
      </div>
    </div>
  );
};
