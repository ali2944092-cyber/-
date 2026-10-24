import React, { useState } from 'react';
import {
  RotateCcw,
  CheckCircle2,
  Sparkles,
  Sun,
  Moon,
  Bed,
  Heart,
  Volume2,
  Check,
} from 'lucide-react';
import { DhikrItem } from '../types';
import { PRAYER_ADHKAR, MORNING_ADHKAR, EVENING_ADHKAR, SLEEP_ADHKAR } from '../data/adhkarData';
import { playTasbeehClick } from '../utils/audioPlayer';

interface AdhkarSectionProps {
  initialCategory?: 'after_prayer' | 'morning' | 'evening' | 'sleep';
}

export const AdhkarSection: React.FC<AdhkarSectionProps> = ({ initialCategory = 'after_prayer' }) => {
  const [activeCategory, setActiveCategory] = useState<'after_prayer' | 'morning' | 'evening' | 'sleep'>(
    initialCategory
  );

  // Counter state per dhikr id: { [dhikrId: string]: number }
  const [counts, setCounts] = useState<Record<string, number>>({});

  const getDhikrList = (): DhikrItem[] => {
    switch (activeCategory) {
      case 'after_prayer':
        return PRAYER_ADHKAR;
      case 'morning':
        return MORNING_ADHKAR;
      case 'evening':
        return EVENING_ADHKAR;
      case 'sleep':
        return SLEEP_ADHKAR;
    }
  };

  const currentList = getDhikrList();

  const handleIncrement = (id: string, target: number) => {
    playTasbeehClick();
    if (navigator.vibrate) {
      try {
        navigator.vibrate(30);
      } catch {
        // ignore
      }
    }

    setCounts((prev) => {
      const current = prev[id] || 0;
      if (current >= target) return prev; // already complete
      return {
        ...prev,
        [id]: current + 1,
      };
    });
  };

  const handleResetSingle = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setCounts((prev) => ({
      ...prev,
      [id]: 0,
    }));
  };

  const handleResetCategory = () => {
    setCounts((prev) => {
      const updated = { ...prev };
      currentList.forEach((item) => {
        delete updated[item.id];
      });
      return updated;
    });
  };

  // Calculate completed count
  const completedCount = currentList.filter(
    (item) => (counts[item.id] || 0) >= item.repeatTarget
  ).length;
  const progressPercent = Math.round((completedCount / currentList.length) * 100);

  return (
    <div className="space-y-6">
      {/* Category selector banner */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-4 sm:p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-300" />
              <span>الأذكار والأوراد المأثورة</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              أذكار صحيحة ومحققة من السنة النبوية الشريفة مع عداد ذكي لكل ذكر
            </p>
          </div>

          {/* Reset button */}
          <button
            onClick={handleResetCategory}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-medium transition cursor-pointer border border-slate-700"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
            <span>إعادة تعيين العدادات</span>
          </button>
        </div>

        {/* Categories Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {[
            { id: 'after_prayer', label: 'أذكار بعد الصلاة', icon: Heart, count: PRAYER_ADHKAR.length },
            { id: 'morning', label: 'أذكار الصباح', icon: Sun, count: MORNING_ADHKAR.length },
            { id: 'evening', label: 'أذكار المساء', icon: Moon, count: EVENING_ADHKAR.length },
            { id: 'sleep', label: 'أذكار النوم واليقظة', icon: Bed, count: SLEEP_ADHKAR.length },
          ].map((cat) => {
            const Icon = cat.icon;
            const isCurrent = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as typeof activeCategory)}
                className={`flex items-center justify-between p-3 rounded-2xl border transition cursor-pointer ${
                  isCurrent
                    ? 'bg-gradient-to-r from-emerald-900/70 to-teal-900/70 border-emerald-500 text-white shadow-md'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Icon className={`w-4 h-4 ${isCurrent ? 'text-amber-300' : 'text-slate-400'}`} />
                  <span className="text-xs sm:text-sm font-semibold">{cat.label}</span>
                </div>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-slate-900 border border-slate-800">
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Completion Progress Bar */}
        <div className="mt-4 pt-4 border-t border-slate-800">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
            <span>نسبة إنجاز أذكار القسم</span>
            <span className="font-bold text-emerald-400">
              {completedCount} من {currentList.length} أذكار ({progressPercent}%)
            </span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Dhikr Cards List */}
      <div className="space-y-4">
        {currentList.map((item, index) => {
          const currentCount = counts[item.id] || 0;
          const isDone = currentCount >= item.repeatTarget;
          const percent = Math.min(100, Math.round((currentCount / item.repeatTarget) * 100));

          return (
            <div
              key={item.id}
              onClick={() => handleIncrement(item.id, item.repeatTarget)}
              className={`relative rounded-3xl p-5 sm:p-6 transition-all duration-200 border cursor-pointer select-none ${
                isDone
                  ? 'bg-emerald-950/30 border-emerald-700/60 shadow-lg shadow-emerald-950/40'
                  : 'bg-slate-900/80 border-slate-800 hover:border-emerald-700/50 hover:bg-slate-900'
              }`}
            >
              {/* Header: Index number + Reference + Reset button */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-slate-800 text-slate-300 flex items-center justify-center text-xs font-mono font-bold">
                    {index + 1}
                  </span>
                  {item.reference && (
                    <span className="text-[11px] font-medium bg-slate-800/80 border border-slate-700/60 text-slate-400 px-2 py-0.5 rounded-lg">
                      {item.reference}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {currentCount > 0 && !isDone && (
                    <button
                      onClick={(e) => handleResetSingle(item.id, e)}
                      className="text-slate-500 hover:text-slate-300 p-1 rounded-md text-xs transition"
                      title="إعادة ضبط هذا الذكر"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                  )}
                  {isDone && (
                    <span className="flex items-center gap-1 text-xs font-semibold text-emerald-400 bg-emerald-950/80 border border-emerald-600/40 px-2.5 py-0.5 rounded-full">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>اكتمل</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Arabic Text with Tashkeel */}
              <p className="text-lg sm:text-xl font-amiri font-semibold text-slate-100 leading-loose text-justify mb-4">
                {item.arabicText}
              </p>

              {/* Fadl / Virtue if available */}
              {item.fadl && (
                <div className="bg-slate-950/60 border border-slate-800/60 rounded-xl p-3 mb-4 text-xs text-amber-300/90 leading-relaxed">
                  <span className="font-bold text-amber-400">الفضل: </span>
                  {item.fadl}
                </div>
              )}

              {/* Counter Action Footer */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-800/80">
                <div className="text-xs text-slate-400">
                  انقر في أي مكان لاحتساب الذكر
                </div>

                {/* Big tactile button counter */}
                <button
                  type="button"
                  className={`flex items-center gap-3 px-5 py-2.5 rounded-2xl font-mono text-base font-bold transition shadow-md ${
                    isDone
                      ? 'bg-emerald-600 text-white'
                      : 'bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-600/50 text-emerald-300'
                  }`}
                >
                  <span>{currentCount}</span>
                  <span className="text-xs text-slate-400">/ {item.repeatTarget}</span>
                  {isDone ? (
                    <Check className="w-4 h-4 text-white" />
                  ) : (
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
