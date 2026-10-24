import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  BookOpen,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Bookmark,
  Sparkles,
  ChevronRight,
  ArrowUpDown,
  BookMarked,
  RotateCcw,
} from 'lucide-react';
import { QuranSurahMeta } from '../types';
import {
  SURAH_LIST,
  BUILT_IN_SURAHS,
  QURAN_RECITERS,
  getSurahAudioUrl,
} from '../data/quranData';

interface SurahAyahItem {
  numberInSurah: number;
  text: string;
}

export const QuranSection: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterType, setFilterType] = useState<'all' | 'Meccan' | 'Medinan' | 'popular'>('all');
  const [selectedSurah, setSelectedSurah] = useState<QuranSurahMeta | null>(null);
  const [ayahs, setAyahs] = useState<SurahAyahItem[]>([]);
  const [isLoadingAyahs, setIsLoadingAyahs] = useState<boolean>(false);
  const [fontSize, setFontSize] = useState<number>(24); // px

  // Audio recitation player state
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [audioProgress, setAudioProgress] = useState<number>(0);
  const [audioDuration, setAudioDuration] = useState<number>(0);
  const [selectedReciter, setSelectedReciter] = useState<string>('alafasy');
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Bookmark in localStorage
  const [bookmark, setBookmark] = useState<{ surahNumber: number; surahName: string } | null>(() => {
    try {
      const saved = localStorage.getItem('nour_quran_bookmark');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const popularNumbers = [1, 18, 36, 55, 56, 67, 112, 113, 114];

  // Filtered surah list
  const filteredSurahs = SURAH_LIST.filter((s) => {
    const matchesSearch =
      s.nameArabic.includes(searchQuery.trim()) ||
      s.nameEnglish.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.number.toString() === searchQuery.trim();

    if (!matchesSearch) return false;

    if (filterType === 'Meccan') return s.revelationType === 'Meccan';
    if (filterType === 'Medinan') return s.revelationType === 'Medinan';
    if (filterType === 'popular') return popularNumbers.includes(s.number);
    return true;
  });

  // Handle opening a surah
  const handleOpenSurah = async (surah: QuranSurahMeta) => {
    setSelectedSurah(surah);
    setIsPlayingAudio(false);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    // Check built-in first
    if (BUILT_IN_SURAHS[surah.number]) {
      setAyahs(
        BUILT_IN_SURAHS[surah.number].ayahs.map((a) => ({
          numberInSurah: a.number,
          text: a.text,
        }))
      );
      return;
    }

    // Fetch from Al-Quran Cloud API
    setIsLoadingAyahs(true);
    try {
      const res = await fetch(`https://api.alquran.cloud/v1/surah/${surah.number}`);
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      if (data && data.data && data.data.ayahs) {
        setAyahs(
          data.data.ayahs.map((a: { numberInSurah: number; text: string }) => ({
            numberInSurah: a.numberInSurah,
            text: a.text,
          }))
        );
      }
    } catch (err) {
      console.warn('API fetch failed, generating fallback representation:', err);
      // Fallback: provide placeholder representation of Surah ayahs
      const fallbackList: SurahAyahItem[] = [];
      for (let i = 1; i <= Math.min(surah.numberOfAyahs, 20); i++) {
        fallbackList.push({
          numberInSurah: i,
          text: `آية رقم ${i} من سورة ${surah.nameArabic} المباركة`,
        });
      }
      setAyahs(fallbackList);
    } finally {
      setIsLoadingAyahs(false);
    }
  };

  // Audio Play / Pause
  const togglePlayAudio = () => {
    if (!audioRef.current) return;
    if (isPlayingAudio) {
      audioRef.current.pause();
      setIsPlayingAudio(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlayingAudio(true))
        .catch((e) => console.warn('Audio play error:', e));
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setAudioProgress(audioRef.current.currentTime);
      setAudioDuration(audioRef.current.duration || 0);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = val;
      setAudioProgress(val);
    }
  };

  const handleSaveBookmark = (surah: QuranSurahMeta) => {
    const newBookmark = { surahNumber: surah.number, surahName: surah.nameArabic };
    setBookmark(newBookmark);
    localStorage.setItem('nour_quran_bookmark', JSON.stringify(newBookmark));
  };

  const formatSeconds = (sec: number) => {
    if (isNaN(sec) || !isFinite(sec)) return '00:00';
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      {/* Quran Header Banner */}
      <div className="bg-gradient-to-br from-emerald-950 via-slate-900 to-teal-950 border border-emerald-800/40 rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/60 border border-emerald-500/40 text-emerald-300 text-xs font-semibold mb-3">
              <BookOpen className="w-3.5 h-3.5 text-amber-300" />
              <span>المصحف الشريف والقرآن الكريم</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold font-cairo text-white">
              كتاب الله العزيز
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-xl leading-relaxed">
              تلاوة وقراءة لجميع سور القرآن الـ 114 بالرسم العثماني مع استماع لأشهر القراء
            </p>
          </div>

          {/* Bookmark Quick Jump */}
          {bookmark && (
            <div className="bg-slate-900/90 border border-amber-500/40 rounded-2xl p-4 flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/30">
                <BookMarked className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] text-slate-400 block">علامة القراءة المحفوظة:</span>
                <span className="text-sm font-bold text-white">سورة {bookmark.surahName}</span>
              </div>
              <button
                onClick={() => {
                  const targetSurah = SURAH_LIST.find((s) => s.number === bookmark.surahNumber);
                  if (targetSurah) handleOpenSurah(targetSurah);
                }}
                className="mr-2 px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-xs font-semibold transition cursor-pointer"
              >
                متابعة القراءة
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Reader Modal / View when a surah is selected */}
      {selectedSurah ? (
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
          {/* Back & Top Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <button
              onClick={() => {
                setSelectedSurah(null);
                setIsPlayingAudio(false);
                if (audioRef.current) audioRef.current.pause();
              }}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs sm:text-sm font-semibold transition cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
              <span>العودة لقائمة السور</span>
            </button>

            {/* Font size & Bookmark controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleSaveBookmark(selectedSurah)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 text-xs font-semibold transition cursor-pointer"
              >
                <Bookmark className="w-3.5 h-3.5" />
                <span>حفظ علامة القراءة</span>
              </button>

              <div className="flex items-center gap-1 bg-slate-800 rounded-xl p-1 text-xs">
                <button
                  onClick={() => setFontSize((f) => Math.max(18, f - 2))}
                  className="px-2 py-1 rounded-lg hover:bg-slate-700 text-slate-300 font-bold"
                  title="تصغير الخط"
                >
                  A-
                </button>
                <span className="px-1 text-slate-400 font-mono">{fontSize}</span>
                <button
                  onClick={() => setFontSize((f) => Math.min(36, f + 2))}
                  className="px-2 py-1 rounded-lg hover:bg-slate-700 text-slate-300 font-bold"
                  title="تكبير الخط"
                >
                  A+
                </button>
              </div>
            </div>
          </div>

          {/* Surah Title Frame */}
          <div className="relative text-center py-6 px-4 bg-gradient-to-b from-emerald-950/40 via-slate-950/60 to-emerald-950/40 border border-emerald-600/30 rounded-2xl">
            <span className="text-xs text-amber-300 font-semibold mb-1 block">
              سورة رقم {selectedSurah.number} &bull; {selectedSurah.revelationTypeArabic} &bull; {selectedSurah.numberOfAyahs} آيات
            </span>
            <h3 className="text-4xl sm:text-5xl font-amiri font-bold text-amber-200 mb-2">
              سورة {selectedSurah.nameArabic}
            </h3>
            <p className="text-xs text-slate-400">
              ترتيب النزول: {selectedSurah.revelationOrder}
            </p>
          </div>

          {/* Audio Recitation Player Card */}
          <div className="bg-slate-950/80 border border-emerald-800/40 rounded-2xl p-4 sm:p-5">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-emerald-900/50 text-emerald-400">
                  <Volume2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-white">الاستماع لتلاوة السورة</h4>
                  <p className="text-[11px] text-slate-400">بصوت الشيخ مشاري راشد العفاسي</p>
                </div>
              </div>

              {/* Reciter selector */}
              <select
                value={selectedReciter}
                onChange={(e) => {
                  setSelectedReciter(e.target.value);
                  setIsPlayingAudio(false);
                }}
                className="bg-slate-900 border border-slate-700 text-xs rounded-xl px-3 py-1.5 text-slate-200"
              >
                {QURAN_RECITERS.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.nameArabic}
                  </option>
                ))}
              </select>
            </div>

            {/* Audio player progress bar & controls */}
            <audio
              ref={audioRef}
              src={getSurahAudioUrl(selectedSurah.number, selectedReciter)}
              onTimeUpdate={handleTimeUpdate}
              onEnded={() => setIsPlayingAudio(false)}
            />

            <div className="flex items-center gap-3">
              <button
                onClick={togglePlayAudio}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-md cursor-pointer shrink-0"
              >
                {isPlayingAudio ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
              </button>

              <div className="flex-1 space-y-1">
                <input
                  type="range"
                  min="0"
                  max={audioDuration || 100}
                  value={audioProgress}
                  onChange={handleSeek}
                  className="w-full accent-emerald-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[11px] font-mono text-slate-400" dir="ltr">
                  <span>{formatSeconds(audioProgress)}</span>
                  <span>{formatSeconds(audioDuration)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bismillah Header (except Surah At-Tawbah #9) */}
          {selectedSurah.number !== 9 && (
            <div className="text-center py-4">
              <p className="text-2xl sm:text-3xl font-quran font-bold text-amber-300">
                بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
              </p>
            </div>
          )}

          {/* Surah Verses / Ayahs */}
          {isLoadingAyahs ? (
            <div className="py-16 text-center text-slate-400">
              <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
              <p className="text-xs">جاري تحميل آيات سورة {selectedSurah.nameArabic}...</p>
            </div>
          ) : (
            <div
              className="font-quran leading-loose text-justify text-slate-100 p-4 sm:p-6 bg-slate-950/60 rounded-2xl border border-slate-800/80 shadow-inner"
              style={{ fontSize: `${fontSize}px`, lineHeight: `${fontSize * 2.2}px` }}
            >
              {ayahs.map((ayah) => (
                <span key={ayah.numberInSurah} className="inline transition hover:text-amber-200">
                  {ayah.text}{' '}
                  <span className="inline-flex items-center justify-center text-amber-400/90 font-mono font-bold text-sm mx-1.5 select-none">
                    ﴿{ayah.numberInSurah}﴾
                  </span>{' '}
                </span>
              ))}
            </div>
          )}
        </div>
      ) : (
        /* 114 Surahs Directory View */
        <div className="space-y-4">
          {/* Search & Filter Toolbar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-900/80 border border-slate-800 rounded-2xl p-3 sm:p-4">
            {/* Search Input */}
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute right-3 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ابحث باسم السورة أو رقمها..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pr-9 pl-4 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
              {[
                { id: 'all', label: 'جميع السور (114)' },
                { id: 'popular', label: 'سور مباركة (الكهف، يس، الملك...)' },
                { id: 'Meccan', label: 'مكية' },
                { id: 'Medinan', label: 'مدنية' },
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setFilterType(f.id as typeof filterType)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                    filterType === f.id
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'bg-slate-800/80 hover:bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Surah Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredSurahs.map((surah) => {
              const isPopular = popularNumbers.includes(surah.number);
              return (
                <div
                  key={surah.number}
                  onClick={() => handleOpenSurah(surah)}
                  className="group relative bg-slate-900/70 hover:bg-slate-900 border border-slate-800 hover:border-emerald-600/60 rounded-2xl p-4 flex items-center justify-between transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md"
                >
                  <div className="flex items-center gap-3">
                    {/* Surah Number Badge */}
                    <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 group-hover:border-emerald-500/50 flex items-center justify-center text-sm font-mono font-bold text-amber-300">
                      {surah.number}
                    </div>

                    <div>
                      <h4 className="text-base font-bold text-white group-hover:text-amber-200 transition">
                        سورة {surah.nameArabic}
                      </h4>
                      <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                        <span>{surah.revelationTypeArabic}</span>
                        <span>&bull;</span>
                        <span>{surah.numberOfAyahs} آيات</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {isPopular && (
                      <span className="text-[10px] bg-amber-950/80 text-amber-300 border border-amber-600/40 px-2 py-0.5 rounded-full">
                        مباركة
                      </span>
                    )}
                    <span className="text-xs text-emerald-400 group-hover:translate-x-[-2px] transition font-medium">
                      قراءة &larr;
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
