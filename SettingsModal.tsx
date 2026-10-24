import React from 'react';
import {
  X,
  Volume2,
  Bell,
  Sliders,
  Sparkles,
  Check,
  ShieldAlert,
  Play,
  RotateCcw,
} from 'lucide-react';
import { AppSettings, CalculationMethodId, MadhabId } from '../types';
import { CALCULATION_METHODS } from '../utils/prayerCalculations';
import { ADHAN_MUADDHINS, playAdhanAudio, stopCurrentAudio } from '../utils/audioPlayer';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: AppSettings;
  onUpdateSettings: (newSettings: Partial<AppSettings>) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  settings,
  onUpdateSettings,
}) => {
  if (!isOpen) return null;

  const handleTestAdhan = () => {
    playAdhanAudio(settings.adhanMuaddhin, settings.adhanVolume);
  };

  const handleRequestNotification = async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        onUpdateSettings({ enableBrowserNotifications: true });
        new Notification('نور الصلاة', {
          body: 'تم تفعيل تنبيهات الأذان ومواقيت الصلاة بنجاح',
          icon: '/favicon.ico',
        });
      } else {
        onUpdateSettings({ enableBrowserNotifications: false });
        alert('يرجى السماح بالإشعارات من إعدادات المتصفح');
      }
    } else {
      alert('المتصفح الحالي لا يدعم إشعارات النظام، سيتم استخدام التنبيه الصوتي الداخلي');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl max-h-[90vh] flex flex-col rounded-3xl bg-slate-900 border border-slate-800 text-white shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sliders className="w-5 h-5 text-emerald-400" />
            <h3 className="text-lg font-bold">إعدادات الحساب والمواقيت والأذان</h3>
          </div>
          <button
            onClick={() => {
              stopCurrentAudio();
              onClose();
            }}
            className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          {/* Calculation Method */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>طريقة حساب مواقيت الصلاة:</span>
            </label>
            <select
              value={settings.calculationMethod}
              onChange={(e) =>
                onUpdateSettings({ calculationMethod: e.target.value as CalculationMethodId })
              }
              className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-emerald-500"
            >
              {CALCULATION_METHODS.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.nameArabic}
                </option>
              ))}
            </select>
            <p className="text-[11px] text-slate-400">
              تحدد زوايا الفجر والعشاء المعمول بها رسمياً في الهيئات الإسلامية المعترف بها
            </p>
          </div>

          {/* Asr Juristic Method (Madhab) */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-white block">
              المذهب الفقهي لوقت صلاة العصر:
            </label>
            <div className="grid grid-cols-2 gap-3">
              {[
                { id: 'shafi', label: 'الجمهور (الشافعي، المالكي، الحنبلي)', desc: 'ظل الشيء مثله' },
                { id: 'hanafi', label: 'المذهب الحنفي', desc: 'ظل الشيء مثليه' },
              ].map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => onUpdateSettings({ madhab: m.id as MadhabId })}
                  className={`text-right p-3 rounded-2xl border transition cursor-pointer ${
                    settings.madhab === m.id
                      ? 'bg-emerald-950/80 border-emerald-500 text-white shadow-sm'
                      : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-xs sm:text-sm">{m.label}</span>
                    {settings.madhab === m.id && <Check className="w-4 h-4 text-emerald-400" />}
                  </div>
                  <span className="text-[11px] text-slate-400 block">{m.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Muaddhin Selection */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-white flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Volume2 className="w-4 h-4 text-emerald-400" />
                <span>صوت المؤذن المعتمد للأذان:</span>
              </span>
              <button
                type="button"
                onClick={handleTestAdhan}
                className="text-xs text-amber-300 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <Play className="w-3 h-3" />
                <span>تجربة الصوت</span>
              </button>
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {ADHAN_MUADDHINS.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => onUpdateSettings({ adhanMuaddhin: m.id })}
                  className={`text-right p-3 rounded-xl border text-xs font-semibold transition cursor-pointer flex items-center justify-between ${
                    settings.adhanMuaddhin === m.id
                      ? 'bg-emerald-950/80 border-emerald-500 text-amber-300'
                      : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <div>
                    <div>{m.nameArabic}</div>
                    <div className="text-[10px] text-slate-400">{m.location}</div>
                  </div>
                  {settings.adhanMuaddhin === m.id && <Check className="w-4 h-4 text-emerald-400" />}
                </button>
              ))}
            </div>
          </div>

          {/* Adhan Volume Slider */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-300">
              <span>مستوى صوت الأذان</span>
              <span className="font-mono font-bold text-emerald-400">
                {Math.round(settings.adhanVolume * 100)}%
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={settings.adhanVolume}
              onChange={(e) => onUpdateSettings({ adhanVolume: parseFloat(e.target.value) })}
              className="w-full accent-emerald-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
            />
          </div>

          {/* Browser Notifications Toggle */}
          <div className="p-4 bg-slate-950/60 border border-slate-800 rounded-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400">
                <Bell className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">إشعارات المتصفح المنبثقة</h4>
                <p className="text-xs text-slate-400">
                  إرسال إشعار فوري عند دخول وقت الفريضة حتى لو كان المتصفح في الخلفية
                </p>
              </div>
            </div>

            <button
              onClick={handleRequestNotification}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                settings.enableBrowserNotifications
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
              }`}
            >
              {settings.enableBrowserNotifications ? 'مفعلة' : 'تفعيل'}
            </button>
          </div>

          {/* Hijri Adjustment Slider */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-white block">
              تعديل التقويم الهجري (حسب ثبوت رؤية الهلال في بلدك):
            </label>
            <div className="flex items-center gap-2">
              {[-2, -1, 0, 1, 2].map((adj) => (
                <button
                  key={adj}
                  type="button"
                  onClick={() => onUpdateSettings({ hijriAdjustment: adj })}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold font-mono transition cursor-pointer ${
                    settings.hijriAdjustment === adj
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                  }`}
                >
                  {adj > 0 ? `+${adj} يوم` : adj < 0 ? `${adj} يوم` : '0 (مطابق)'}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between">
          <span className="text-xs text-slate-400">
            يتم حفظ جميع التفضيلات تلقائياً في جهازك
          </span>
          <button
            onClick={() => {
              stopCurrentAudio();
              onClose();
            }}
            className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition cursor-pointer"
          >
            حفظ وإغلاق
          </button>
        </div>
      </div>
    </div>
  );
};
