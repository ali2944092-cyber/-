import React, { useState } from 'react';
import { Search, X, MapPin, Navigation, Plus, Check } from 'lucide-react';
import { CityLocation } from '../types';
import { POPULAR_CITIES } from '../data/cities';

interface CitySelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentCity: CityLocation;
  onSelectCity: (city: CityLocation) => void;
  onDetectLocation: () => void;
  isDetecting: boolean;
}

export const CitySelectorModal: React.FC<CitySelectorModalProps> = ({
  isOpen,
  onClose,
  currentCity,
  onSelectCity,
  onDetectLocation,
  isDetecting,
}) => {
  const [search, setSearch] = useState<string>('');
  const [customLat, setCustomLat] = useState<string>('');
  const [customLng, setCustomLng] = useState<string>('');
  const [customName, setCustomName] = useState<string>('');
  const [showCustomForm, setShowCustomForm] = useState<boolean>(false);

  if (!isOpen) return null;

  const filtered = POPULAR_CITIES.filter(
    (c) =>
      c.nameArabic.includes(search.trim()) ||
      c.nameEnglish.toLowerCase().includes(search.toLowerCase()) ||
      c.countryArabic.includes(search.trim())
  );

  const handleApplyCustom = () => {
    const lat = parseFloat(customLat);
    const lng = parseFloat(customLng);
    if (isNaN(lat) || isNaN(lng)) {
      alert('يرجى إدخال إحداثيات صحيحة (خط العرض وخط الطول)');
      return;
    }
    const customCity: CityLocation = {
      id: `custom-${Date.now()}`,
      nameArabic: customName.trim() || 'موقعي المخصص',
      nameEnglish: 'Custom Location',
      countryArabic: 'إحداثيات مخصصة',
      countryEnglish: 'Custom Coordinates',
      latitude: lat,
      longitude: lng,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC',
    };
    onSelectCity(customCity);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-xl max-h-[85vh] flex flex-col rounded-3xl bg-slate-900 border border-slate-800 text-white shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-emerald-400" />
            <h3 className="text-lg font-bold">تحديد المدينة وموقع الحساب</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* GPS Quick Action */}
        <div className="p-4 bg-slate-950/60 border-b border-slate-800 flex items-center justify-between gap-3">
          <div className="text-xs text-slate-300">
            احصل على أدق مواقيت بحسب موقعك الجغرافي الفعلي:
          </div>
          <button
            onClick={onDetectLocation}
            disabled={isDetecting}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition cursor-pointer disabled:opacity-50 shrink-0"
          >
            <Navigation className={`w-3.5 h-3.5 ${isDetecting ? 'animate-spin' : ''}`} />
            <span>{isDetecting ? 'جاري التحديد...' : 'موقعي الحالي (GPS)'}</span>
          </button>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-slate-800">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute right-3 top-3" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="ابحث باسم المدينة أو الدولة..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pr-9 pl-4 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        {/* City List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-1.5 max-h-[360px]">
          {filtered.map((city) => {
            const isSelected = currentCity.id === city.id;
            return (
              <button
                key={city.id}
                onClick={() => {
                  onSelectCity(city);
                  onClose();
                }}
                className={`w-full text-right p-3 rounded-2xl flex items-center justify-between border transition cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-950/80 border-emerald-500 text-white shadow-sm'
                    : 'bg-slate-950/40 border-slate-800/80 hover:bg-slate-800 text-slate-300'
                }`}
              >
                <div>
                  <h4 className="font-bold text-sm text-white">{city.nameArabic}</h4>
                  <p className="text-xs text-slate-400">{city.countryArabic}</p>
                </div>

                {isSelected && <Check className="w-4 h-4 text-emerald-400" />}
              </button>
            );
          })}
        </div>

        {/* Custom coordinates accordion */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/80">
          {!showCustomForm ? (
            <button
              onClick={() => setShowCustomForm(true)}
              className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1 cursor-pointer font-medium"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>إدخال إحداثيات موقع مخصص يدوياً (خط الطول والعرض)</span>
            </button>
          ) : (
            <div className="space-y-3">
              <h5 className="text-xs font-semibold text-white">إحداثيات مخصصة:</h5>
              <div className="grid grid-cols-3 gap-2">
                <input
                  type="text"
                  placeholder="اسم المكان"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white"
                />
                <input
                  type="number"
                  step="0.0001"
                  placeholder="خط العرض (Lat)"
                  value={customLat}
                  onChange={(e) => setCustomLat(e.target.value)}
                  className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white"
                />
                <input
                  type="number"
                  step="0.0001"
                  placeholder="خط الطول (Lng)"
                  value={customLng}
                  onChange={(e) => setCustomLng(e.target.value)}
                  className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white"
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleApplyCustom}
                  className="px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition cursor-pointer"
                >
                  تطبيق الإحداثيات
                </button>
                <button
                  onClick={() => setShowCustomForm(false)}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 text-slate-400 text-xs transition cursor-pointer"
                >
                  إلغاء
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
