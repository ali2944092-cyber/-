import React, { useState } from 'react';
import {
  Calendar as CalendarIcon,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Clock,
  Info,
  Sliders,
} from 'lucide-react';
import { CityLocation, CalculationMethodId, MadhabId } from '../types';
import {
  HIJRI_MONTHS_ARABIC,
  GREGORIAN_MONTHS_ARABIC,
  DAYS_OF_WEEK_ARABIC,
  ISLAMIC_EVENTS,
  getHijriDate,
} from '../utils/hijriCalendar';
import { calculatePrayerTimes, formatPrayerTime } from '../utils/prayerCalculations';

interface CalendarSectionProps {
  city: CityLocation;
  calculationMethod: CalculationMethodId;
  madhab: MadhabId;
  hijriAdjustment: number;
  onUpdateAdjustment: (adj: number) => void;
}

export const CalendarSection: React.FC<CalendarSectionProps> = ({
  city,
  calculationMethod,
  madhab,
  hijriAdjustment,
  onUpdateAdjustment,
}) => {
  const [selectedMonthOffset, setSelectedMonthOffset] = useState<number>(0);
  const [viewMode, setViewMode] = useState<'calendar' | 'imsakiah'>('calendar');

  const today = new Date();
  const currentMonthDate = new Date(today.getFullYear(), today.getMonth() + selectedMonthOffset, 1);
  const currentYear = currentMonthDate.getFullYear();
  const currentMonth = currentMonthDate.getMonth();

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayWeekday = new Date(currentYear, currentMonth, 1).getDay(); // 0 is Sunday

  const todayHijri = getHijriDate(today, hijriAdjustment);

  // Generate calendar days
  const calendarDays = [];
  // Pad blank days before the 1st
  for (let i = 0; i < firstDayWeekday; i++) {
    calendarDays.push(null);
  }
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(currentYear, currentMonth, day);
    const hijri = getHijriDate(date, hijriAdjustment);
    const isToday =
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();

    calendarDays.push({
      gregDay: day,
      date,
      hijri,
      isToday,
    });
  }

  // Generate monthly imsakiah data (all days of current month)
  const imsakiahRows = [];
  for (let d = 1; d <= daysInMonth; d++) {
    const dDate = new Date(currentYear, currentMonth, d);
    const dHijri = getHijriDate(dDate, hijriAdjustment);
    const calcs = calculatePrayerTimes(city, calculationMethod, madhab, dDate);
    const isToday =
      dDate.getDate() === today.getDate() &&
      dDate.getMonth() === today.getMonth() &&
      dDate.getFullYear() === today.getFullYear();

    imsakiahRows.push({
      date: dDate,
      dayName: DAYS_OF_WEEK_ARABIC[dDate.getDay()],
      gregDay: d,
      hijriDay: dHijri.day,
      hijriMonthName: dHijri.monthName,
      isToday,
      fajr: formatPrayerTime(calcs.times[0].time),
      sunrise: formatPrayerTime(calcs.times[1].time),
      dhuhr: formatPrayerTime(calcs.times[2].time),
      asr: formatPrayerTime(calcs.times[3].time),
      maghrib: formatPrayerTime(calcs.times[4].time),
      isha: formatPrayerTime(calcs.times[5].time),
    });
  }

  return (
    <div className="space-y-6">
      {/* Top Banner Card */}
      <div className="bg-gradient-to-br from-emerald-950 via-slate-900 to-teal-950 border border-emerald-800/40 rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Main date title */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/60 border border-emerald-500/40 text-emerald-300 text-xs font-semibold mb-3">
              <CalendarIcon className="w-3.5 h-3.5 text-amber-300" />
              <span>التقويم الهجري والميلادي</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold font-cairo text-white">
              {todayHijri.formattedArabic}
            </h2>

            <p className="text-sm sm:text-base text-amber-300 font-medium mt-1">
              الموافق: {todayHijri.gregorianFormatted}
            </p>
          </div>

          {/* Hijri Adjustment Tool */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 text-xs">
            <div className="flex items-center gap-2 text-slate-300 font-semibold mb-2">
              <Sliders className="w-3.5 h-3.5 text-emerald-400" />
              <span>تعديل اليوم الهجري (رؤية الهلال):</span>
            </div>
            <div className="flex items-center gap-2">
              {[-2, -1, 0, 1, 2].map((adj) => (
                <button
                  key={adj}
                  onClick={() => onUpdateAdjustment(adj)}
                  className={`w-9 h-8 rounded-lg font-mono font-bold transition cursor-pointer ${
                    hijriAdjustment === adj
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                  }`}
                >
                  {adj > 0 ? `+${adj}` : adj}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* View mode toggle */}
        <div className="flex items-center gap-2 mt-6 pt-4 border-t border-slate-800">
          <button
            onClick={() => setViewMode('calendar')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition cursor-pointer ${
              viewMode === 'calendar'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-slate-900/80 text-slate-400 hover:text-slate-200'
            }`}
          >
            عرض شبكة التقويم
          </button>
          <button
            onClick={() => setViewMode('imsakiah')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition cursor-pointer ${
              viewMode === 'imsakiah'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-slate-900/80 text-slate-400 hover:text-slate-200'
            }`}
          >
            جدول إمساكية ومواقيت الشهر
          </button>
        </div>
      </div>

      {viewMode === 'calendar' ? (
        /* Calendar Grid View */
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-4 sm:p-6 shadow-xl">
          {/* Month Header Navigation */}
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => setSelectedMonthOffset((prev) => prev - 1)}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition cursor-pointer"
              title="الشهر السابق"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            <div className="text-center">
              <h3 className="text-lg sm:text-xl font-bold text-white">
                {GREGORIAN_MONTHS_ARABIC[currentMonth]} {currentYear} م
              </h3>
              <p className="text-xs text-emerald-400 font-medium">
                {HIJRI_MONTHS_ARABIC[getHijriDate(currentMonthDate, hijriAdjustment).month - 1]} هـ
              </p>
            </div>

            <button
              onClick={() => setSelectedMonthOffset((prev) => prev + 1)}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition cursor-pointer"
              title="الشهر القادم"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          </div>

          {/* Weekday headers */}
          <div className="grid grid-cols-7 gap-1 sm:gap-2 text-center text-xs font-bold text-slate-400 mb-2">
            {DAYS_OF_WEEK_ARABIC.map((dayName) => (
              <div key={dayName} className="py-2">
                {dayName}
              </div>
            ))}
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-1 sm:gap-2">
            {calendarDays.map((item, idx) => {
              if (!item) {
                return <div key={`empty-${idx}`} className="h-16 sm:h-20 rounded-xl bg-slate-950/20" />;
              }

              return (
                <div
                  key={item.gregDay}
                  className={`h-16 sm:h-20 rounded-2xl p-1.5 sm:p-2 flex flex-col justify-between border transition ${
                    item.isToday
                      ? 'bg-gradient-to-b from-emerald-900/60 to-teal-900/60 border-amber-400 shadow-md ring-2 ring-amber-400/30'
                      : 'bg-slate-950/60 border-slate-800/80 hover:border-emerald-700/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-xs sm:text-sm font-bold font-mono ${
                        item.isToday ? 'text-amber-300' : 'text-slate-200'
                      }`}
                    >
                      {item.gregDay}
                    </span>
                    {item.isToday && (
                      <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                    )}
                  </div>

                  <div className="text-left">
                    <span className="text-[10px] sm:text-xs font-amiri font-semibold text-emerald-400">
                      {item.hijri.day} {item.hijri.monthName.slice(0, 6)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* Monthly Imsakiah Table View */
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-4 sm:p-6 shadow-xl overflow-x-auto">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-400" />
              <span>
                إمساكية مواقيت الصلاة - {city.nameArabic} ({GREGORIAN_MONTHS_ARABIC[currentMonth]} {currentYear})
              </span>
            </h3>
          </div>

          <table className="w-full text-right text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400">
                <th className="py-3 px-2 font-bold">اليوم</th>
                <th className="py-3 px-2 font-bold">الميلادي</th>
                <th className="py-3 px-2 font-bold">الهجري</th>
                <th className="py-3 px-2 font-bold text-amber-300">الفجر</th>
                <th className="py-3 px-2 font-bold text-slate-400">الشروق</th>
                <th className="py-3 px-2 font-bold text-emerald-300">الظهر</th>
                <th className="py-3 px-2 font-bold text-emerald-300">العصر</th>
                <th className="py-3 px-2 font-bold text-amber-300">المغرب</th>
                <th className="py-3 px-2 font-bold text-teal-300">العشاء</th>
              </tr>
            </thead>
            <tbody>
              {imsakiahRows.map((row) => (
                <tr
                  key={row.gregDay}
                  className={`border-b border-slate-800/60 font-mono transition ${
                    row.isToday ? 'bg-emerald-950/60 font-bold text-amber-200' : 'hover:bg-slate-800/40 text-slate-300'
                  }`}
                >
                  <td className="py-2.5 px-2 font-cairo">{row.dayName}</td>
                  <td className="py-2.5 px-2">{row.gregDay}</td>
                  <td className="py-2.5 px-2 font-cairo text-emerald-400">{row.hijriDay} {row.hijriMonthName}</td>
                  <td className="py-2.5 px-2" dir="ltr">{row.fajr}</td>
                  <td className="py-2.5 px-2 text-slate-500" dir="ltr">{row.sunrise}</td>
                  <td className="py-2.5 px-2" dir="ltr">{row.dhuhr}</td>
                  <td className="py-2.5 px-2" dir="ltr">{row.asr}</td>
                  <td className="py-2.5 px-2" dir="ltr">{row.maghrib}</td>
                  <td className="py-2.5 px-2" dir="ltr">{row.isha}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Islamic Events Cards */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl">
        <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-4">
          <Sparkles className="w-5 h-5 text-amber-300" />
          <span>المناسبات والأعياد الإسلامية المباركة</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {ISLAMIC_EVENTS.map((event) => (
            <div
              key={event.name}
              className="bg-slate-950/60 border border-slate-800 rounded-2xl p-4 flex items-start gap-3 hover:border-emerald-700/50 transition"
            >
              <div className="p-2.5 rounded-xl bg-emerald-950 text-emerald-400 border border-emerald-800/50 shrink-0">
                <CalendarIcon className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-sm sm:text-base text-white">{event.name}</h4>
                  <span className="text-[11px] font-semibold text-amber-300 bg-amber-950/60 border border-amber-700/50 px-2 py-0.5 rounded-full">
                    {event.hijriDay} {event.hijriMonthName}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">{event.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
