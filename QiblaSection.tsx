import React, { useState, useEffect } from 'react';
import { Compass, Navigation, MapPin, Sparkles, Info, ShieldCheck } from 'lucide-react';
import { CityLocation } from '../types';
import { calculateQiblaDirection, calculateDistanceToKaaba } from '../utils/qiblaCalculations';

interface QiblaSectionProps {
  city: CityLocation;
}

export const QiblaSection: React.FC<QiblaSectionProps> = ({ city }) => {
  const [deviceHeading, setDeviceHeading] = useState<number | null>(null);
  const [isCompassActive, setIsCompassActive] = useState<boolean>(false);

  const qiblaAngle = calculateQiblaDirection(city.latitude, city.longitude);
  const distanceKm = calculateDistanceToKaaba(city.latitude, city.longitude);

  // Device orientation listener for physical mobile compass
  useEffect(() => {
    const handleOrientation = (e: DeviceOrientationEvent) => {
      // webkitCompassHeading for iOS, alpha for Android
      const heading =
        (e as unknown as { webkitCompassHeading?: number }).webkitCompassHeading ||
        (e.alpha !== null ? 360 - e.alpha : null);

      if (heading !== null && heading !== undefined) {
        setDeviceHeading(heading);
        setIsCompassActive(true);
      }
    };

    if (window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', handleOrientation, true);
    }

    return () => {
      if (window.DeviceOrientationEvent) {
        window.removeEventListener('deviceorientation', handleOrientation, true);
      }
    };
  }, []);

  // Needle angle: if device heading available, rotate needle relative to phone orientation
  const needleRotation = deviceHeading !== null ? qiblaAngle - deviceHeading : qiblaAngle;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Top Banner Card */}
      <div className="bg-gradient-to-br from-emerald-950 via-slate-900 to-teal-950 border border-emerald-800/40 rounded-3xl p-6 sm:p-8 shadow-xl text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/60 border border-emerald-500/40 text-emerald-300 text-xs font-semibold mb-3">
          <Compass className="w-3.5 h-3.5 text-amber-300" />
          <span>تحديد اتجاه القبلة المشرفة</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-bold font-cairo text-white mb-2">
          نحو الكعبة المشرفة بمكة المكرمة
        </h2>

        <p className="text-sm text-slate-300">
          الموقع الحالي: <span className="text-emerald-400 font-semibold">{city.nameArabic}</span> &bull;{' '}
          {city.countryArabic}
        </p>

        {/* Stats Row */}
        <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto mt-6">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4">
            <span className="text-xs text-slate-400 block mb-1">زاوية القبلة</span>
            <span className="text-2xl font-bold font-mono text-amber-300 tracking-wider">
              {qiblaAngle}°
            </span>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4">
            <span className="text-xs text-slate-400 block mb-1">المسافة إلى الكعبة</span>
            <span className="text-2xl font-bold font-mono text-emerald-300 tracking-wider">
              {distanceKm.toLocaleString('ar-EG')} كم
            </span>
          </div>
        </div>
      </div>

      {/* Interactive Compass Dial */}
      <div className="flex flex-col items-center justify-center py-6">
        <div className="relative w-72 h-72 sm:w-84 sm:h-84 rounded-full bg-gradient-to-b from-slate-900 via-emerald-950 to-slate-950 border-4 border-emerald-600/40 shadow-2xl flex items-center justify-center p-4">
          {/* Compass Rose Markings */}
          <div className="absolute inset-2 rounded-full border border-slate-800/80 flex items-center justify-center">
            {/* North, South, East, West labels */}
            <span className="absolute top-2 font-bold text-xs font-mono text-rose-400">N (الشمال)</span>
            <span className="absolute bottom-2 font-bold text-xs font-mono text-slate-400">S (الجنوب)</span>
            <span className="absolute right-2 font-bold text-xs font-mono text-slate-400">E (الشرق)</span>
            <span className="absolute left-2 font-bold text-xs font-mono text-slate-400">W (الغرب)</span>
          </div>

          {/* Rotating Needle towards Qibla */}
          <div
            className="absolute inset-0 flex items-center justify-center transition-transform duration-500 ease-out"
            style={{ transform: `rotate(${needleRotation}deg)` }}
          >
            {/* Arrow Pointer */}
            <div className="relative flex flex-col items-center h-full justify-between py-6">
              {/* Kaaba indicator at the top tip */}
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-yellow-300 border-2 border-white shadow-lg flex items-center justify-center text-slate-950 font-bold text-xs">
                  🕋
                </div>
                <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[12px] border-t-amber-400 mt-1" />
              </div>

              {/* Center Pivot Point */}
              <div className="w-6 h-6 rounded-full bg-slate-900 border-2 border-emerald-400 shadow-md" />

              {/* Opposite tail */}
              <div className="w-2 h-16 bg-slate-700/60 rounded-full" />
            </div>
          </div>

          {/* Compass Center Text */}
          <div className="relative z-10 bg-slate-950/90 border border-slate-800 px-4 py-2 rounded-2xl shadow-lg text-center">
            <span className="text-[11px] text-slate-400 block">انحراف القبلة</span>
            <span className="text-xl font-mono font-bold text-amber-300">{qiblaAngle}°</span>
          </div>
        </div>

        {/* Device orientation active note */}
        {isCompassActive ? (
          <p className="text-xs text-emerald-400 mt-4 flex items-center gap-1.5 font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>بوصلة جهازك متصلة وتتحرك تلقائياً مع دوران الهاتف</span>
          </p>
        ) : (
          <p className="text-xs text-slate-400 mt-4 max-w-sm text-center">
            تُظهر البوصلة اتجاه الكعبة بالنسبة لاتجاه الشمال الحقيقي ({qiblaAngle}°). على الهواتف المتوافقة، تدور البوصلة تلقائياً.
          </p>
        )}
      </div>

      {/* Religious Etiquette & Fiqh of Qibla */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-3">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Info className="w-4 h-4 text-emerald-400" />
          <span>من فقه استقبال القبلة:</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-300 leading-relaxed">
          <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80">
            <h4 className="font-semibold text-emerald-300 mb-1">شرط لصحة الصلاة:</h4>
            <p>
              استقبال القبلة شرط من شروط صحة الصلاة للمستطيع، لقول الله تعالى: ﴿فَوَلِّ وَجْهَكَ شَطْرَ الْمَسْجِدِ الْحَرَامِ وَحَيْثُ مَا كُنتُمْ فَوَلُّوا وُجُوهَكُمْ شَطْرَهُ﴾.
            </p>
          </div>

          <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80">
            <h4 className="font-semibold text-emerald-300 mb-1">الاجتهاد للبعيد عن مكة:</h4>
            <p>
              من كان بعيداً عن الكعبة المشرفة يكفيه التوجه إلى جهتها العامة، لما روى الترمذي وصححه عن النبي ﷺ: «مَا بَيْنَ الْمَشْرِقِ وَالْمَغْرِبِ قِبْلَةٌ».
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
