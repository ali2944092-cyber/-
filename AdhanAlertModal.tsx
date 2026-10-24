import React from 'react';
import { Volume2, VolumeX, X, Sparkles, BookOpen, Check } from 'lucide-react';
import { DUA_AFTER_ADHAN_TEXT, stopCurrentAudio } from '../utils/audioPlayer';

interface AdhanAlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  prayerName: string;
  cityName: string;
  onGoToAfterPrayerAdhkar: () => void;
}

export const AdhanAlertModal: React.FC<AdhanAlertModalProps> = ({
  isOpen,
  onClose,
  prayerName,
  cityName,
  onGoToAfterPrayerAdhkar,
}) => {
  if (!isOpen) return null;

  const handleStop = () => {
    stopCurrentAudio();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg rounded-3xl bg-gradient-to-b from-slate-900 via-emerald-950 to-slate-950 border border-emerald-600/50 p-6 sm:p-8 text-center text-white shadow-2xl shadow-emerald-950/80">
        {/* Close Button */}
        <button
          onClick={handleStop}
          className="absolute top-4 left-4 p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Decorative Mosque Minaret Icon */}
        <div className="relative mx-auto mb-4 flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-tr from-emerald-600 to-amber-500 text-white shadow-lg shadow-emerald-600/40 animate-pulse">
          <Volume2 className="w-10 h-10 text-amber-200" />
          <Sparkles className="w-5 h-5 absolute -top-1 -right-1 text-amber-300 animate-spin" />
        </div>

        {/* Announcement */}
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-emerald-900/60 border border-emerald-500/40 text-emerald-300 mb-2">
          نـداء الصَّـلاة
        </span>

        <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-1">
          حان الآن موعد أذان {prayerName}
        </h3>

        <p className="text-sm text-slate-300 mb-6">
          حسب التوقيت المحلي لمدينة <span className="text-emerald-400 font-semibold">{cityName}</span>
        </p>

        {/* Adhan callout sentence */}
        <div className="bg-slate-950/60 border border-emerald-800/40 rounded-2xl p-4 mb-6">
          <p className="text-lg sm:text-xl font-amiri font-bold text-amber-300 mb-1">
            «حَيَّ عَلَى الصَّلَاةِ ، حَيَّ عَلَى الْفَلَاحِ»
          </p>
          <p className="text-xs text-slate-400">
            أجب النداء، والصلاة خير من النوم، والصلاة نور وبرهان
          </p>
        </div>

        {/* Dua After Adhan */}
        <div className="bg-emerald-950/40 border border-emerald-700/30 rounded-2xl p-4 text-right mb-6">
          <div className="flex items-center gap-1.5 text-xs text-emerald-300 font-semibold mb-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>دعاء ما بعد الأذان (مستجاب):</span>
          </div>
          <p className="font-amiri text-sm sm:text-base text-slate-200 leading-relaxed">
            {DUA_AFTER_ADHAN_TEXT}
          </p>
          <span className="block text-[11px] text-slate-400 mt-2">
            «من قال ذلك حلّت له شفاعتي يوم القيامة» - صحيح البخاري
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <button
            onClick={() => {
              handleStop();
              onGoToAfterPrayerAdhkar();
            }}
            className="w-full sm:flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold text-sm shadow-lg shadow-emerald-900/40 transition cursor-pointer"
          >
            <BookOpen className="w-4 h-4" />
            <span>أذكار ما بعد الصلاة</span>
          </button>

          <button
            onClick={handleStop}
            className="w-full sm:w-auto flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-medium transition cursor-pointer"
          >
            <VolumeX className="w-4 h-4 text-amber-400" />
            <span>إيقاف الأذان</span>
          </button>
        </div>
      </div>
    </div>
  );
};
