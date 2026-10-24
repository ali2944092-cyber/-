import React, { useState, useEffect } from 'react';
import {
  Moon,
  Volume2,
  VolumeX,
  Settings,
  MapPin,
  Clock,
  Compass,
  BookOpen,
  Calendar,
  Sparkles,
} from 'lucide-react';
import { CityLocation } from '../types';
import { HijriDateInfo } from '../utils/hijriCalendar';
import { isAudioPlaying, stopCurrentAudio, playAdhanAudio } from '../utils/audioPlayer';

interface NavbarProps {
  activeTab: 'prayer' | 'quran' | 'adhkar' | 'tasbeeh' | 'calendar' | 'qibla';
  setActiveTab: (tab: 'prayer' | 'quran' | 'adhkar' | 'tasbeeh' | 'calendar' | 'qibla') => void;
  city: CityLocation;
  onOpenCitySelector: () => void;
  onOpenSettings: () => void;
  hijriDate: HijriDateInfo;
  currentMuaddhin: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  city,
  onOpenCitySelector,
  onOpenSettings,
  hijriDate,
  currentMuaddhin,
}) => {
  const [currentTime, setCurrentTime] = useState<string>('');
  const [isPlayingAdhan, setIsPlayingAdhan] = useState<boolean>(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('ar-EG', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        })
      );
      setIsPlayingAdhan(isAudioPlaying());
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleAdhanPreview = () => {
    if (isPlayingAdhan) {
      stopCurrentAudio();
      setIsPlayingAdhan(false);
    } else {
      playAdhanAudio(currentMuaddhin, 0.85, () => setIsPlayingAdhan(false));
      setIsPlayingAdhan(true);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-950/85 backdrop-blur-md border-b border-emerald-900/30 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
        {/* Top bar */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Logo & App title */}
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-800 text-amber-300 shadow-lg shadow-emerald-950/50 border border-emerald-500/30">
              <Moon className="w-6 h-6 fill-amber-300/20 text-amber-300" />
              <Sparkles className="w-3.5 h-3.5 absolute -top-1 -right-1 text-amber-400 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold font-cairo tracking-wide bg-gradient-to-l from-amber-200 via-emerald-100 to-white bg-clip-text text-transparent">
                  نُور الصَّلَاة
                </h1>
                <span className="hidden sm:inline-block text-[11px] font-medium bg-emerald-950/80 text-emerald-300 border border-emerald-700/40 px-2 py-0.5 rounded-full">
                  مواقيت وأذان وقرآن
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium">
                {hijriDate.formattedArabic} &bull; {hijriDate.dayName}
              </p>
            </div>
          </div>

          {/* Quick info: Time & Location & Adhan Preview */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Live Time */}
            <div className="hidden md:flex items-center gap-2 bg-slate-900/90 border border-slate-800 px-3 py-1.5 rounded-xl text-emerald-300 text-sm font-mono">
              <Clock className="w-4 h-4 text-emerald-400 animate-pulse" />
              <span dir="ltr">{currentTime}</span>
            </div>

            {/* City Button */}
            <button
              onClick={onOpenCitySelector}
              className="flex items-center gap-1.5 bg-slate-900/80 hover:bg-slate-800/90 border border-emerald-900/40 hover:border-emerald-600/50 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-medium transition cursor-pointer text-slate-200"
              title="تغيير المدينة والموقع"
            >
              <MapPin className="w-4 h-4 text-emerald-400" />
              <span className="max-w-[120px] truncate">{city.nameArabic}</span>
            </button>

            {/* Listen to Adhan preview button */}
            <button
              onClick={toggleAdhanPreview}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-medium border transition cursor-pointer ${
                isPlayingAdhan
                  ? 'bg-amber-500/20 border-amber-500 text-amber-300 animate-pulse'
                  : 'bg-emerald-950/50 hover:bg-emerald-900/60 border-emerald-700/50 text-emerald-300'
              }`}
              title={isPlayingAdhan ? 'إيقاف صوت الأذان' : 'الاستماع لصوت الأذان التجريبي'}
            >
              {isPlayingAdhan ? (
                <>
                  <VolumeX className="w-4 h-4 text-amber-400" />
                  <span className="hidden sm:inline">إيقاف الأذان</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-4 h-4 text-emerald-400" />
                  <span className="hidden sm:inline">استمع للأذان</span>
                </>
              )}
            </button>

            {/* Settings button */}
            <button
              onClick={onOpenSettings}
              className="p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-emerald-700/50 text-slate-300 hover:text-white transition cursor-pointer"
              title="إعدادات الحساب والمواقيت"
              aria-label="الإعدادات"
            >
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1 sm:gap-2 mt-3 pt-2 border-t border-slate-900 overflow-x-auto no-scrollbar">
          {[
            { id: 'prayer', label: 'مواقيت الصلاة', icon: Moon },
            { id: 'quran', label: 'المصحف الشريف', icon: BookOpen },
            { id: 'adhkar', label: 'أذكار الصلاة واليوم', icon: Sparkles },
            { id: 'tasbeeh', label: 'السبحة الإلكترونية', icon: Sparkles },
            { id: 'calendar', label: 'التقويم والمناسبات', icon: Calendar },
            { id: 'qibla', label: 'اتجاه القبلة', icon: Compass },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex items-center gap-1.5 sm:gap-2 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-700 text-white shadow-md shadow-emerald-900/30 border border-emerald-500/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-amber-300' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
