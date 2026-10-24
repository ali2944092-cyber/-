export interface AdhanMuaddhin {
  id: string;
  nameArabic: string;
  location: string;
  audioUrl: string;
}

export const ADHAN_MUADDHINS: AdhanMuaddhin[] = [
  {
    id: 'makkah',
    nameArabic: 'أذان الحرم المكي الشريف',
    location: 'مكة المكرمة',
    audioUrl: 'https://cdn.islamic.network/prayer-times/audio/adhan/ar.makkah.mp3',
  },
  {
    id: 'madinah',
    nameArabic: 'أذان المسجد النبوي الشريف',
    location: 'المدينة المنورة',
    audioUrl: 'https://cdn.islamic.network/prayer-times/audio/adhan/ar.madinah.mp3',
  },
  {
    id: 'abdulbasit',
    nameArabic: 'أذان الشيخ عبد الباسط عبد الصمد',
    location: 'مصر',
    audioUrl: 'https://cdn.islamic.network/prayer-times/audio/adhan/ar.abdulbasit.mp3',
  },
  {
    id: 'alafasy',
    nameArabic: 'أذان الشيخ مشاري بن راشد العفاسي',
    location: 'الكويت',
    audioUrl: 'https://cdn.islamic.network/prayer-times/audio/adhan/ar.alafasy.mp3',
  },
  {
    id: 'alaqsa',
    nameArabic: 'أذان المسجد الأقصى المبارك',
    location: 'القدس الشريف',
    audioUrl: 'https://cdn.islamic.network/prayer-times/audio/adhan/ar.alaqsa.mp3',
  },
];

let activeAudio: HTMLAudioElement | null = null;
let audioContext: AudioContext | null = null;

export function stopCurrentAudio(): void {
  if (activeAudio) {
    activeAudio.pause();
    activeAudio.currentTime = 0;
    activeAudio = null;
  }
}

export function isAudioPlaying(): boolean {
  return !!activeAudio && !activeAudio.paused;
}

/**
 * Synthesizes a soft, harmonic Islamic alert chime using Web Audio API.
 * This guarantees an audible prayer alert even if offline or if audio URLs fail.
 */
export function playSynthesizedChime(volume: number = 0.8): void {
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    if (!audioContext || audioContext.state === 'closed') {
      audioContext = new AudioContextClass();
    }
    if (audioContext.state === 'suspended') {
      audioContext.resume();
    }

    const ctx = audioContext;
    const now = ctx.currentTime;

    // Harmonic prayer chime notes (Penta Hijaz feeling: D4, F#4, A4, D5)
    const notes = [293.66, 369.99, 440.0, 587.33];

    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.35);

      gain.gain.setValueAtTime(0, now + idx * 0.35);
      gain.gain.linearRampToValueAtTime(0.2 * volume, now + idx * 0.35 + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.35 + 1.4);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + idx * 0.35);
      osc.stop(now + idx * 0.35 + 1.5);
    });
  } catch (err) {
    console.warn('Synthesized chime failed:', err);
  }
}

/**
 * Tactile subtle click for Tasbeeh counter
 */
export function playTasbeehClick(): void {
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(800, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.04);

    gain.gain.setValueAtTime(0.12, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.05);
  } catch {
    // Ignore audio context silent errors
  }
}

/**
 * Plays Adhan audio with fallback to synthesized alert if URL fails
 */
export function playAdhanAudio(
  muaddhinId: string = 'makkah',
  volume: number = 0.9,
  onEnded?: () => void
): HTMLAudioElement | null {
  stopCurrentAudio();

  const muaddhin = ADHAN_MUADDHINS.find((m) => m.id === muaddhinId) || ADHAN_MUADDHINS[0];
  const audio = new Audio(muaddhin.audioUrl);
  audio.volume = Math.max(0, Math.min(1, volume));

  audio.onended = () => {
    activeAudio = null;
    if (onEnded) onEnded();
  };

  audio.onerror = () => {
    console.warn('Adhan stream failed to load, falling back to harmonic chime.');
    activeAudio = null;
    playSynthesizedChime(volume);
    if (onEnded) onEnded();
  };

  audio
    .play()
    .then(() => {
      activeAudio = audio;
    })
    .catch((err) => {
      console.warn('Playback error, using chime:', err);
      playSynthesizedChime(volume);
    });

  return audio;
}

export const DUA_AFTER_ADHAN_TEXT =
  'اللَّهُمَّ رَبَّ هَذِهِ الدَّعْوَةِ التَّامَّةِ، وَالصَّلَاةِ الْقَائِمَةِ، آتِ مُحَمَّدًا الْوَسِيلَةَ وَالْفَضِيلَةَ، وَابْعَثْهُ مَقَامًا مَحْمُودًا الَّذِي وَعَدْتَهُ، [إِنَّكَ لَا تُخْلِفُ الْمِيعَادَ]';
