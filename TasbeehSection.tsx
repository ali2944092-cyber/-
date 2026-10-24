import React, { useState, useEffect } from 'react';
import {
  RotateCcw,
  Sparkles,
  Volume2,
  VolumeX,
  Plus,
  CheckCircle,
  Vibrate,
  Award,
} from 'lucide-react';
import { playTasbeehClick } from '../utils/audioPlayer';

const PRESET_ADHKAR = [
  'سُبْحَانَ اللَّهِ',
  'الْحَمْدُ لِلَّهِ',
  'لَا إِلَهَ إِلَّا اللَّهُ',
  'اللَّهُ أَكْبَرُ',
  'أَسْتَغْفِرُ اللَّهَ وَأَتُوبُ إِلَيْهِ',
  'لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ الْعَلِيِّ الْعَظِيمِ',
  'اللَّهُمَّ صَلِّ وَسَلِّمْ عَلَى نَبِيِّنَا مُحَمَّدٍ',
  'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ ، سُبْحَانَ اللَّهِ الْعَظِيمِ',
  'لَا إِلَهَ إِلَّا أَنْتَ سُبْحَانَكَ إِنِّي كُنْتُ مِنَ الظَّالِمِينَ',
  'حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ',
];

export const TasbeehSection: React.FC = () => {
  const [selectedDhikr, setSelectedDhikr] = useState<string>(PRESET_ADHKAR[0]);
  const [customDhikr, setCustomDhikr] = useState<string>('');
  const [isCustomMode, setIsCustomMode] = useState<boolean>(false);

  const [currentCount, setCurrentCount] = useState<number>(() => {
    return parseInt(localStorage.getItem('nour_tasbeeh_count') || '0', 10);
  });
  const [totalLifetime, setTotalLifetime] = useState<number>(() => {
    return parseInt(localStorage.getItem('nour_tasbeeh_lifetime') || '0', 10);
  });
  const [rounds, setRounds] = useState<number>(() => {
    return parseInt(localStorage.getItem('nour_tasbeeh_rounds') || '0', 10);
  });

  const [target, setTarget] = useState<number>(33); // 33, 100, 1000, 0 = unlimited
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [vibrateEnabled, setVibrateEnabled] = useState<boolean>(true);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('nour_tasbeeh_count', currentCount.toString());
    localStorage.setItem('nour_tasbeeh_lifetime', totalLifetime.toString());
    localStorage.setItem('nour_tasbeeh_rounds', rounds.toString());
  }, [currentCount, totalLifetime, rounds]);

  const handleBeadClick = () => {
    if (soundEnabled) {
      playTasbeehClick();
    }
    if (vibrateEnabled && navigator.vibrate) {
      try {
        navigator.vibrate(35);
      } catch {
        // ignore
      }
    }

    setTotalLifetime((prev) => prev + 1);

    if (target > 0 && currentCount + 1 >= target) {
      // Completed a round
      setCurrentCount(0);
      setRounds((prev) => prev + 1);
      if (vibrateEnabled && navigator.vibrate) {
        try {
          navigator.vibrate([60, 50, 100]);
        } catch {
          // ignore
        }
      }
    } else {
      setCurrentCount((prev) => prev + 1);
    }
  };

  const handleResetCurrent = () => {
    setCurrentCount(0);
  };

  const handleResetAll = () => {
    if (window.confirm('هل أنت متأكد من تصفير عداد السبحة والدورات؟')) {
      setCurrentCount(0);
      setRounds(0);
    }
  };

  const activeDhikrText = isCustomMode && customDhikr.trim() ? customDhikr : selectedDhikr;
  const progressPercent = target > 0 ? Math.min(100, (currentCount / target) * 100) : 100;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Top Banner Card */}
      <div className="bg-gradient-to-br from-emerald-950 via-slate-900 to-teal-950 border border-emerald-800/40 rounded-3xl p-6 sm:p-8 text-center shadow-xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/60 border border-emerald-500/40 text-emerald-300 text-xs font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>المسبحة الإلكترونية الذكية</span>
        </div>

        {/* Current Dhikr Display */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-amiri font-bold text-amber-200 tracking-wide mb-2 min-h-[50px] flex items-center justify-center">
          {activeDhikrText}
        </h2>

        <p className="text-xs text-slate-400">
          «أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ» &bull; انقر على الدائرة الكبرى لاحتساب التسبيح
        </p>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-3 max-w-md mx-auto mt-6">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-3">
            <span className="text-[11px] text-slate-400 block mb-1">الهدف المحدد</span>
            <span className="text-lg font-bold font-mono text-emerald-400">
              {target === 0 ? 'مفتوح' : target}
            </span>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-3">
            <span className="text-[11px] text-slate-400 block mb-1">الدورات المكتملة</span>
            <span className="text-lg font-bold font-mono text-amber-400">{rounds}</span>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-3">
            <span className="text-[11px] text-slate-400 block mb-1">إجمالي التسبيحات</span>
            <span className="text-lg font-bold font-mono text-cyan-400">{totalLifetime}</span>
          </div>
        </div>
      </div>

      {/* Main Interactive Bead Button Section */}
      <div className="flex flex-col items-center justify-center py-4">
        <div className="relative">
          {/* Subtle Outer Glow Ring */}
          <div
            className="absolute inset-0 rounded-full bg-gradient-to-tr from-emerald-500 to-amber-400 opacity-20 blur-2xl animate-pulse"
            style={{ transform: 'scale(1.15)' }}
          />

          {/* SVG Progress Ring */}
          <svg className="w-72 h-72 sm:w-80 sm:h-80 -rotate-90 transform">
            <circle
              cx="50%"
              cy="50%"
              r="44%"
              className="stroke-slate-800"
              strokeWidth="10"
              fill="transparent"
            />
            {target > 0 && (
              <circle
                cx="50%"
                cy="50%"
                r="44%"
                className="stroke-emerald-500 transition-all duration-300"
                strokeWidth="10"
                strokeDasharray={2 * Math.PI * 135}
                strokeDashoffset={2 * Math.PI * 135 * (1 - progressPercent / 100)}
                strokeLinecap="round"
                fill="transparent"
              />
            )}
          </svg>

          {/* Center Clickable Bead Sphere */}
          <button
            onClick={handleBeadClick}
            type="button"
            className="absolute inset-4 sm:inset-5 rounded-full bg-gradient-to-b from-emerald-800 via-teal-900 to-slate-950 border-4 border-emerald-400/50 shadow-2xl shadow-emerald-950 flex flex-col items-center justify-center text-white active:scale-95 transition-transform duration-100 cursor-pointer select-none group"
          >
            <span className="text-xs sm:text-sm text-emerald-300 font-medium mb-1">
              {target > 0 ? `الهدف: ${target}` : 'تسبيح حر'}
            </span>

            <span className="text-6xl sm:text-7xl font-mono font-extrabold text-amber-300 tracking-tight group-hover:scale-105 transition-transform">
              {currentCount}
            </span>

            <span className="text-xs text-slate-400 mt-2 bg-slate-900/60 px-3 py-1 rounded-full border border-slate-800">
              انقر للتسبيح
            </span>
          </button>
        </div>

        {/* Controls: Reset, Sound, Vibrate */}
        <div className="flex items-center gap-3 mt-6">
          <button
            onClick={handleResetCurrent}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition cursor-pointer border border-slate-700"
            title="تصفير الدورة الحالية"
          >
            <RotateCcw className="w-4 h-4 text-amber-400" />
            <span>تصفير الدورة</span>
          </button>

          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`p-2.5 rounded-xl border transition cursor-pointer ${
              soundEnabled
                ? 'bg-emerald-950 border-emerald-700 text-emerald-300'
                : 'bg-slate-900 border-slate-800 text-slate-500'
            }`}
            title={soundEnabled ? 'صوت النقر مفعل' : 'صوت النقر مكتوم'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          <button
            onClick={() => setVibrateEnabled(!vibrateEnabled)}
            className={`p-2.5 rounded-xl border transition cursor-pointer ${
              vibrateEnabled
                ? 'bg-emerald-950 border-emerald-700 text-emerald-300'
                : 'bg-slate-900 border-slate-800 text-slate-500'
            }`}
            title={vibrateEnabled ? 'الاهتزاز مفعل' : 'الاهتزاز معطل'}
          >
            <Vibrate className="w-4 h-4" />
          </button>

          <button
            onClick={handleResetAll}
            className="text-xs text-rose-400 hover:text-rose-300 px-3 py-2 transition"
          >
            تصفير السجل
          </button>
        </div>
      </div>

      {/* Target selector pills */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4">
        <h3 className="text-xs font-semibold text-slate-400 mb-3">اختر دورة التسبيح (الهدف):</h3>
        <div className="grid grid-cols-4 gap-2">
          {[
            { label: '33 تسبيحة', value: 33 },
            { label: '100 تسبيحة', value: 100 },
            { label: '1000 تسبيحة', value: 1000 },
            { label: 'مفتوح (دون حد)', value: 0 },
          ].map((item) => (
            <button
              key={item.value}
              onClick={() => {
                setTarget(item.value);
                setCurrentCount(0);
              }}
              className={`py-2 px-3 rounded-xl text-xs font-semibold transition cursor-pointer ${
                target === item.value
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-slate-800/80 hover:bg-slate-800 text-slate-300 border border-slate-700/60'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Dhikr Selector List */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 sm:p-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>اختر صيغة الذكر:</span>
          </h3>

          <button
            onClick={() => setIsCustomMode(!isCustomMode)}
            className="text-xs text-amber-300 hover:underline flex items-center gap-1 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{isCustomMode ? 'اختيار من المأثور' : 'كتابة ذكر خاص'}</span>
          </button>
        </div>

        {isCustomMode ? (
          <div className="flex gap-2">
            <input
              type="text"
              value={customDhikr}
              onChange={(e) => setCustomDhikr(e.target.value)}
              placeholder="اكتب الذكر أو الدعاء الذي تود تسبيحه..."
              className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {PRESET_ADHKAR.map((item) => {
              const isSelected = selectedDhikr === item && !isCustomMode;
              return (
                <button
                  key={item}
                  onClick={() => {
                    setSelectedDhikr(item);
                    setIsCustomMode(false);
                    setCurrentCount(0);
                  }}
                  className={`text-right p-3 rounded-xl border text-xs sm:text-sm font-amiri font-semibold transition cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-950/80 border-emerald-500 text-amber-300 shadow-sm'
                      : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  {item}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
