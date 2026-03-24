import React from 'react';
import { 
  Sun, Home, HelpCircle, Type, Palette, Square, Frame, Sparkles, Download, MoreHorizontal, Layout, X 
} from 'lucide-react';
import { cn } from '../utils/cn';
import { CollapsibleSection } from './CollapsibleSection';
import { CardStyle, SplitMode } from '../types';
import { THEMES, GRADIENTS, FONTS, DECORATIVE_ELEMENTS, TEXTURES } from '../constants';
import { useTranslation } from '../utils/LanguageContext';

interface SidebarProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (val: boolean) => void;
  setShowLanding: (val: boolean) => void;
  text: string;
  setText: (val: string) => void;
  splitMode: SplitMode;
  setSplitMode: (val: SplitMode) => void;
  charLimit: number;
  setCharLimit: (val: number) => void;
  separator: string;
  setSeparator: (val: string) => void;
  cards: string[];
  style: CardStyle;
  setStyle: React.Dispatch<React.SetStateAction<CardStyle>>;
  expandedSections: Record<string, boolean>;
  toggleSection: (section: string) => void;
  handleFeelingLucky: () => void;
  handleExportAll: () => void;
  applyTheme: (theme: any) => void;
  handleInstagramShare: () => void;
  isInstagramConnected: boolean;
  handleInstagramConnect: () => void;
  isSharing: boolean;
  shareStatus: string;
}

export const Sidebar = ({
  isSidebarOpen,
  setIsSidebarOpen,
  setShowLanding,
  text,
  setText,
  splitMode,
  setSplitMode,
  charLimit,
  setCharLimit,
  separator,
  setSeparator,
  cards,
  style,
  setStyle,
  expandedSections,
  toggleSection,
  handleFeelingLucky,
  handleExportAll,
  applyTheme,
  handleInstagramShare,
  isInstagramConnected,
  handleInstagramConnect,
  isSharing,
  shareStatus
}: SidebarProps) => {
  console.log('Using monolithic Sidebar');
  const { t, language, setLanguage } = useTranslation();

  return (
    <>
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <aside className={cn(
        "fixed lg:static inset-y-0 left-0 z-50 w-80 border-r border-gray-200 bg-white flex flex-col overflow-hidden shrink-0 transition-transform duration-300 ease-in-out",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0 lg:w-0 lg:border-none"
      )}>
        <div className="p-6 border-b border-gray-100 bg-black relative flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => setShowLanding(true)}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <div className="p-2 bg-yellow-400 rounded-lg shadow-lg shadow-yellow-900/20">
                <Sun className="w-5 h-5 fill-red-400 text-black" />
              </div>
              <h1 className="text-xl font-bold tracking-tight text-white">{t('app_name')}</h1>
            </button>

            <button 
              onClick={() => setIsSidebarOpen(false)}
              className="p-2 text-gray-400 hover:text-white lg:hidden transition-colors"
            >
              <X className="w-10 h-10" />
            </button>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 p-1.5 rounded-xl border">
              <button
                onClick={() => setLanguage('en')}
                className={cn(
                  "w-8 h-8 flex items-center justify-center rounded-lg transition-all",
                  language === 'en' ? "shadow-sm scale-110" : "opacity-40 hover:opacity-100"
                )}
                title="English"
              >
                <img 
                  src="https://flagcdn.com/w40/gb.png" 
                  alt="UK flag" 
                  className="w-6 h-6 object-contain"
                />
              </button>
              <button
                onClick={() => setLanguage('pt')}
                className={cn(
                  "w-8 h-8 flex items-center justify-center rounded-lg transition-all",
                  language === 'pt' ? "shadow-sm scale-110" : "opacity-40 hover:opacity-100"
                )}
                title="Português (Brasil)"
              >
                <img 
                  src="https://flagcdn.com/w40/br.png" 
                  alt="Brazil flag" 
                  className="w-6 h-6 object-contain"
                />
              </button>
            </div>
          </div>

          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">{t('app_subtitle')}</p>
        </div>

      <div className="flex-1 overflow-y-auto no-scrollbar">
        {/* Quick Guide */}
        <div className="p-6 pb-0">
          <section className="p-4 bg-yellow-50 rounded-2xl border border-yellow-100 space-y-2">
            <div className="flex items-center gap-2 text-yellow-700 font-bold text-xs uppercase tracking-wider">
              <HelpCircle className="w-3.5 h-3.5" />
              {t('quick_guide')}
            </div>
            <p className="text-[11px] text-yellow-800 leading-relaxed">
              {t('quick_guide_1')}<br />
              {t('quick_guide_2').split('\\\\').map((part, i, arr) => (
                <React.Fragment key={i}>
                  {part}
                  {i < arr.length - 1 && <code className="bg-yellow-100 px-1 rounded font-bold">\\</code>}
                </React.Fragment>
              ))}<br />
              {t('quick_guide_3')}
            </p>
          </section>
        </div>

        <div className="py-2">
          {/* Content & Strategy */}
          <CollapsibleSection
            title={t('content_strategy')}
            icon={Type}
            isOpen={expandedSections.content}
            onToggle={() => toggleSection('content')}
            badge={cards.length}
          >
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">{t('source_text')}</label>
                <textarea
                  className="w-full h-32 p-3 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none transition-all resize-none bg-gray-50 font-medium"
                  placeholder={t('text_placeholder')}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">{t('split_strategy')}</label>
                <div className="flex p-1 bg-gray-100 rounded-xl">
                  <button
                    onClick={() => setSplitMode('character')}
                    className={cn(
                      "flex-1 py-1.5 text-xs font-bold rounded-lg transition-all",
                      splitMode === 'character' ? "bg-white shadow-sm text-yellow-600" : "text-gray-500 hover:text-gray-700"
                    )}
                  >
                    {t('auto')}
                  </button>
                  <button
                    onClick={() => setSplitMode('separator')}
                    className={cn(
                      "flex-1 py-1.5 text-xs font-bold rounded-lg transition-all",
                      splitMode === 'separator' ? "bg-white shadow-sm text-yellow-600" : "text-gray-500 hover:text-gray-700"
                    )}
                  >
                    {t('manual')}
                  </button>
                </div>

                {splitMode === 'character' ? (
                  <div className="space-y-2">
                    <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider text-gray-400">
                      <span>{t('char_limit')}</span>
                      <span className="text-yellow-600 font-mono">{charLimit}</span>
                    </div>
                    <input
                      type="range"
                      min="50"
                      max="1000"
                      step="10"
                      value={charLimit}
                      onChange={(e) => setCharLimit(parseInt(e.target.value))}
                      className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-yellow-400"
                    />
                  </div>
                ) : (
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">{t('separator_char')}</span>
                    <input
                      type="text"
                      value={separator}
                      onChange={(e) => setSeparator(e.target.value)}
                      className="w-full p-2 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-400 outline-none bg-gray-50 font-medium"
                      placeholder={t('separator_placeholder')}
                    />
                  </div>
                )}
              </div>
            </div>
          </CollapsibleSection>

          <div className="px-6 py-2">
            <button
              onClick={handleFeelingLucky}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-yellow-400 hover:bg-yellow-500 text-black rounded-xl text-xs font-bold uppercase tracking-wider transition-all border border-yellow-500 shadow-sm"
            >
              <Sparkles className="w-4 h-4" />
              {t('feeling_lucky')}
            </button>
          </div>

          {/* Visual Style */}
          <CollapsibleSection
            title={t('visual_style')}
            icon={Palette}
            isOpen={expandedSections.visual}
            onToggle={() => toggleSection('visual')}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">{t('themes')}</label>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                {THEMES.map((theme) => (
                  <button
                    key={theme.name}
                    onClick={() => applyTheme(theme)}
                    className={cn(
                      "h-10 rounded-xl border transition-all flex items-center justify-center text-[10px] font-bold uppercase tracking-tight",
                      style.theme === theme.name ? "ring-2 ring-yellow-400 border-transparent" : "border-gray-200 hover:border-gray-300"
                    )}
                    style={{ 
                      background: theme.gradient || theme.bg, 
                      color: theme.text,
                      boxShadow: style.theme === theme.name ? '0 4px 12px rgba(79, 70, 229, 0.2)' : 'none'
                    }}
                  >
                    {t(`theme_${theme.name.toLowerCase().replace(/\s+/g, '_')}` as any)}
                  </button>
                ))}
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">{t('gradient')}</label>
                <div className="grid grid-cols-4 gap-2">
                  {GRADIENTS.map((g) => (
                    <button
                      key={g.name}
                      onClick={() => setStyle(s => ({ ...s, gradient: g.value }))}
                      className={cn(
                        "h-8 rounded-lg transition-all border-2",
                        style.gradient === g.value ? "border-yellow-400 scale-110 shadow-md" : "border-transparent hover:scale-105"
                      )}
                      style={{ background: g.value }}
                      title={t(`grad_${g.name.toLowerCase().replace(/ /g, '_')}` as any)}
                    />
                  ))}
                </div>
              </div>

              <div className="space-y-3 pt-2 border-t border-gray-100">
                <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">{t('texture')}</label>
                <select
                  value={style.texture}
                  onChange={(e) => setStyle(s => ({ ...s, texture: e.target.value }))}
                  className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs font-medium focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none transition-all"
                >
                  {TEXTURES.map((tex) => (
                    <option key={tex.value} value={tex.value}>
                      {t(`tex_${tex.name.toLowerCase().replace(/ /g, '_')}` as any)}
                    </option>
                  ))}
                </select>
                
                {style.texture !== 'none' && (
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-[9px] font-bold uppercase tracking-wider text-gray-400">
                      <span>{t('texture_opacity')}</span>
                      <span className="text-yellow-600 font-mono">{Math.round(style.textureOpacity * 100)}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="0.75"
                      step="0.01"
                      value={style.textureOpacity}
                      onChange={(e) => setStyle(s => ({ ...s, textureOpacity: parseFloat(e.target.value) }))}
                      className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-yellow-400"
                    />
                  </div>
                )}
              </div>
            </div>
          </CollapsibleSection>

          {/* Border Settings */}
          <CollapsibleSection
            title={t('border_settings')}
            icon={Square}
            isOpen={expandedSections.border}
            onToggle={() => toggleSection('border')}
          >
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider text-gray-400">
                    <span>{t('border_width')}</span>
                    <span className="text-yellow-600 font-mono">{style.borderWidth}px</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="50"
                    step="1"
                    value={style.borderWidth}
                    onChange={(e) => setStyle(s => ({ ...s, borderWidth: parseInt(e.target.value) }))}
                    className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-yellow-400"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">{t('border_color')}</label>
                  <input
                    type="color"
                    value={style.borderColor}
                    onChange={(e) => setStyle(s => ({ ...s, borderColor: e.target.value, theme: 'Custom' }))}
                    className="w-full h-8 p-0 border-none rounded-lg cursor-pointer bg-transparent"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">{t('border_radius')}</label>
                <div className="flex p-1 bg-gray-100 rounded-lg">
                  {[
                    { label: 'none', value: 0 },
                    { label: 'md', value: 12 },
                    { label: 'xl', value: 24 },
                    { label: '3xl', value: 48 }
                  ].map((r) => (
                    <button
                      key={r.label}
                      onClick={() => setStyle(s => ({ ...s, borderRadius: r.value }))}
                      className={cn(
                        "flex-1 py-1 text-[10px] font-bold rounded-md transition-all",
                        style.borderRadius === r.value ? "bg-white shadow-sm text-yellow-600" : "text-gray-500"
                      )}
                    >
                      {r.label.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </CollapsibleSection>

          {/* Inner Border Settings */}
          <CollapsibleSection
            title={t('inner_border')}
            icon={Frame}
            isOpen={expandedSections.innerBorder}
            onToggle={() => toggleSection('innerBorder')}
          >
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">{t('border_color')}</label>
                  <input
                    type="color"
                    value={style.innerFrameColor}
                    onChange={(e) => setStyle(s => ({ ...s, innerFrameColor: e.target.value }))}
                    className="w-full h-8 p-0 border-none rounded-lg cursor-pointer bg-transparent"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">{t('border_size')}</label>
                  <div className="flex items-center gap-2 pt-2">
                    <input
                      type="range"
                      min="0"
                      max="10"
                      step="1"
                      value={style.innerFrameWidth}
                      onChange={(e) => setStyle(s => ({ ...s, innerFrameWidth: parseInt(e.target.value) }))}
                      className="flex-1 h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-yellow-400"
                    />
                    <span className="text-[10px] font-bold text-gray-500 w-4">{style.innerFrameWidth}</span>
                  </div>
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">{t('distance_padding')}</label>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min="5"
                    max="60"
                    step="1"
                    value={style.innerFramePadding}
                    onChange={(e) => setStyle(s => ({ ...s, innerFramePadding: parseInt(e.target.value) }))}
                    className="flex-1 h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-yellow-400"
                  />
                  <span className="text-[10px] font-bold text-gray-500 w-6">{style.innerFramePadding}px</span>
                </div>
              </div>
            </div>
          </CollapsibleSection>

          {/* Decorative Elements */}
          <CollapsibleSection
            title={t('decorative_elements')}
            icon={Sparkles}
            isOpen={expandedSections.elements}
            onToggle={() => toggleSection('elements')}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">{t('element_controls')}</span>
                <button
                  onClick={() => setStyle(s => ({
                    ...s,
                    elementIcon: DECORATIVE_ELEMENTS[Math.floor(Math.random() * (DECORATIVE_ELEMENTS.length - 1)) + 1].value,
                    elementColor: '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0'),
                    elementOpacity: parseFloat((Math.random() * 0.3 + 0.05).toFixed(2)),
                    elementQuantity: Math.floor(Math.random() * 15) + 5,
                    elementSize: Math.floor(Math.random() * 60) + 20,
                    elementSeed: Math.floor(Math.random() * 1000),
                  }))}
                  className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider text-yellow-600 hover:text-yellow-700 transition-colors"
                >
                  <Sparkles className="w-3 h-3" />
                  {t('feeling_lucky')}
                </button>
              </div>

              <div className="space-y-3">
                <div className="space-y-1.5">
                  <span className="text-[9px] font-bold uppercase tracking-wider text-gray-400">{t('element')}</span>
                  <select
                    value={style.elementIcon}
                    onChange={(e) => {
                      const val = e.target.value;
                      setStyle(s => ({ 
                        ...s, 
                        elementIcon: val,
                        elementQuantity: val !== 'none' ? 5 : 0
                      }));
                    }}
                    className="w-full p-2 text-xs border border-gray-200 rounded-xl bg-gray-50 font-bold outline-none focus:ring-2 focus:ring-yellow-400"
                  >
                    {DECORATIVE_ELEMENTS.map(e => (
                      <option key={e.value} value={e.value}>{t(`elem_${e.name.toLowerCase().replace(/ /g, '_')}` as any)}</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-gray-400">{t('element_color')}</span>
                    <input
                      type="color"
                      value={style.elementColor}
                      onChange={(e) => setStyle(s => ({ ...s, elementColor: e.target.value }))}
                      className="w-full h-8 p-0 border-none rounded-lg cursor-pointer bg-transparent"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-gray-400">{t('element_opacity')}</span>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.05"
                      value={style.elementOpacity}
                      onChange={(e) => setStyle(s => ({ ...s, elementOpacity: parseFloat(e.target.value) }))}
                      className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-yellow-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-[9px] font-bold uppercase tracking-wider text-gray-400">
                      <span>{t('element_quantity')}</span>
                      <span className="text-yellow-600 font-mono">{style.elementQuantity}</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      step="1"
                      value={style.elementQuantity}
                      onChange={(e) => setStyle(s => ({ ...s, elementQuantity: parseInt(e.target.value) }))}
                      className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-yellow-400"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-[9px] font-bold uppercase tracking-wider text-gray-400">
                      <span>{t('element_size')}</span>
                      <span className="text-yellow-600 font-mono">{style.elementSize}px</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="400"
                      step="1"
                      value={style.elementSize}
                      onChange={(e) => setStyle(s => ({ ...s, elementSize: parseInt(e.target.value) }))}
                      className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-yellow-400"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <span className="text-[9px] font-bold uppercase tracking-wider text-gray-400">{t('position_mode')}</span>
                  <div className="flex gap-1 p-1 bg-gray-100 rounded-xl">
                    {['random', 'grid', 'border'].map((mode) => (
                      <button
                        key={mode}
                        onClick={() => setStyle(s => ({ ...s, elementPositionMode: mode as any }))}
                        className={cn(
                          "flex-1 py-1.5 rounded-lg text-[9px] font-bold uppercase transition-all",
                          style.elementPositionMode === mode ? "bg-white shadow-sm text-yellow-600" : "text-gray-500 hover:text-gray-700"
                        )}
                      >
                        {t(mode as any)}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-gray-400">{t('element_rotation')}</span>
                    <input
                      type="number"
                      min="0"
                      max="360"
                      disabled={style.elementRandomRotation}
                      value={style.elementRotation}
                      onChange={(e) => setStyle(s => ({ ...s, elementRotation: parseInt(e.target.value) }))}
                      className="w-full p-1.5 text-xs border border-gray-200 rounded-lg text-center font-bold bg-gray-50 disabled:opacity-50"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-gray-400">{t('random_rotation')}</span>
                    <button
                      onClick={() => setStyle(s => ({ ...s, elementRandomRotation: !s.elementRandomRotation }))}
                      className={cn(
                        "w-full py-1.5 rounded-lg text-[9px] font-bold uppercase border transition-all",
                        style.elementRandomRotation ? "bg-yellow-400 border-yellow-400 text-black" : "border-gray-200 text-gray-500"
                      )}
                    >
                      {style.elementRandomRotation ? 'On' : 'Off'}
                    </button>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <span className="text-[9px] font-bold uppercase tracking-wider text-gray-400">{t('blend_mode')}</span>
                  <select
                    value={style.elementBlendMode}
                    onChange={(e) => setStyle(s => ({ ...s, elementBlendMode: e.target.value }))}
                    className="w-full p-2 text-xs border border-gray-200 rounded-xl bg-gray-50 font-bold outline-none focus:ring-2 focus:ring-yellow-400"
                  >
                    {['normal', 'multiply', 'screen', 'overlay', 'soft-light', 'difference'].map(mode => (
                      <option key={mode} value={mode}>{t(mode as any)}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <span className="text-[9px] font-bold uppercase tracking-wider text-gray-400">{t('layering')}</span>
                  <div className="flex gap-1 p-1 bg-gray-100 rounded-xl">
                    {[
                      { label: t('behind_text'), value: 'behind' },
                      { label: t('in_front'), value: 'front' }
                    ].map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => setStyle(s => ({ ...s, elementZIndex: opt.value as any }))}
                        className={cn(
                          "flex-1 py-1.5 rounded-lg text-[9px] font-bold uppercase transition-all",
                          style.elementZIndex === opt.value ? "bg-white shadow-sm text-yellow-600" : "text-gray-500 hover:text-gray-700"
                        )}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </CollapsibleSection>

          {/* Font Control */}
          <CollapsibleSection
            title={t('font_control')}
            icon={Type}
            isOpen={expandedSections.typography}
            onToggle={() => toggleSection('typography')}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">{t('font_family')}</label>
                <button
                  onClick={() => {
                    const fonts = FONTS.map(f => f.value);
                    const aligns: ('left' | 'center' | 'right')[] = ['left', 'center', 'right'];
                    const randomFont = fonts[Math.floor(Math.random() * fonts.length)];
                    const randomSize = Math.floor(Math.random() * 40) + 20;
                    const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
                    setStyle(s => ({ 
                      ...s, 
                      fontFamily: randomFont, 
                      fontSize: randomSize,
                      textColor: randomColor,
                      textAlign: aligns[Math.floor(Math.random() * aligns.length)],
                      padding: Math.floor(Math.random() * 60) + 20,
                      borderWidth: Math.floor(Math.random() * 20),
                      letterSpacing: Math.floor(Math.random() * 10) - 2,
                      lineHeight: parseFloat((Math.random() * 0.8 + 1).toFixed(1)),
                      textShadow: Math.random() > 0.5,
                      theme: 'Custom'
                    }));
                  }}
                  className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider text-yellow-600 hover:text-yellow-700 transition-colors"
                >
                  <Sparkles className="w-3 h-3" />
                  {t('feeling_lucky')}
                </button>
              </div>
              <div className="space-y-2">
                <select
                  value={style.fontFamily}
                  onChange={(e) => setStyle(s => ({ ...s, fontFamily: e.target.value }))}
                  className="w-full p-2.5 text-xs border border-gray-200 rounded-xl bg-gray-50 font-bold outline-none focus:ring-2 focus:ring-yellow-400 transition-all appearance-none cursor-pointer"
                  style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 10px center', backgroundSize: '16px' }}
                >
                  {FONTS.map(f => (
                    <option key={f.value} value={f.value}>
                      {t(`font_${f.name.toLowerCase().replace(/ /g, '_')}` as any)}
                    </option>
                  ))}
                </select>
              </div>

                <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider text-gray-400">
                    <span>{t('font_size')}</span>
                    <span className="text-yellow-600 font-mono">{style.fontSize}px</span>
                  </div>
                  <input
                    type="range"
                    min="12"
                    max="120"
                    step="1"
                    value={style.fontSize}
                    onChange={(e) => setStyle(s => ({ ...s, fontSize: parseInt(e.target.value) }))}
                    className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-yellow-400"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">{t('text_color')}</label>
                  <input
                    type="color"
                    value={style.textColor}
                    onChange={(e) => setStyle(s => ({ ...s, textColor: e.target.value, theme: 'Custom' }))}
                    className="w-full h-8 p-0 border-none rounded-lg cursor-pointer bg-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider text-gray-400">
                    <span>{t('padding')}</span>
                    <span className="text-yellow-600 font-mono">{style.padding}px</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="1"
                    value={style.padding}
                    onChange={(e) => setStyle(s => ({ ...s, padding: parseInt(e.target.value) }))}
                    className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-yellow-400"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">{t('text_align')}</label>
                <div className="flex gap-1 p-1 bg-gray-100 rounded-xl">
                  {['left', 'center', 'right'].map((align) => (
                    <button
                      key={align}
                      onClick={() => setStyle(s => ({ ...s, textAlign: align as any }))}
                      className={cn(
                        "flex-1 py-1.5 rounded-lg text-[10px] font-bold uppercase transition-all",
                        style.textAlign === align ? "bg-white shadow-sm text-yellow-600" : "text-gray-500 hover:text-gray-700"
                      )}
                    >
                      {t(align as any)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">{t('tracking')}</label>
                  <input
                    type="range"
                    min="-5"
                    max="20"
                    step="0.5"
                    value={style.letterSpacing}
                    onChange={(e) => setStyle(s => ({ ...s, letterSpacing: parseFloat(e.target.value) }))}
                    className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-yellow-400"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">{t('leading')}</label>
                  <input
                    type="range"
                    min="0.8"
                    max="2"
                    step="0.1"
                    value={style.lineHeight}
                    onChange={(e) => setStyle(s => ({ ...s, lineHeight: parseFloat(e.target.value) }))}
                    className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-yellow-400"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-xs font-bold text-gray-600">{t('text_shadow')}</span>
                <button
                  onClick={() => setStyle(s => ({ ...s, textShadow: !s.textShadow }))}
                  className={cn(
                    "w-10 h-5 rounded-full transition-all relative",
                    style.textShadow ? "bg-yellow-400" : "bg-gray-300"
                  )}
                >
                  <div className={cn(
                    "absolute top-1 w-3 h-3 bg-white rounded-full transition-all",
                    style.textShadow ? "left-6" : "left-1"
                  )} />
                </button>
              </div>
            </div>
          </CollapsibleSection>

          {/* Card Title */}
          <CollapsibleSection
            title={t('card_title')}
            icon={Layout}
            isOpen={expandedSections.title}
            onToggle={() => toggleSection('title')}
          >
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">{t('title_text')}</label>
                <input
                  type="text"
                  value={style.title}
                  onChange={(e) => setStyle(s => ({ ...s, title: e.target.value }))}
                  className="w-full p-2 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-400 outline-none bg-gray-50 font-medium"
                  placeholder={t('title_placeholder')}
                />
                <div className="flex gap-1 p-1 bg-gray-100 rounded-xl">
                  {['left', 'center', 'right'].map((align) => (
                    <button
                      key={align}
                      onClick={() => setStyle(s => ({ ...s, titleAlign: align as any }))}
                      className={cn(
                        "flex-1 py-1 rounded-lg text-[9px] font-bold uppercase transition-all",
                        style.titleAlign === align ? "bg-white shadow-sm text-yellow-600" : "text-gray-500 hover:text-gray-700"
                      )}
                    >
                      {t(align as any)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </CollapsibleSection>

          {/* Card Footer */}
          <CollapsibleSection
            title={t('card_footer')}
            icon={MoreHorizontal}
            isOpen={expandedSections.footer}
            onToggle={() => toggleSection('footer')}
          >
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">{t('footer_text')}</label>
                <input
                  type="text"
                  value={style.footer}
                  onChange={(e) => setStyle(s => ({ ...s, footer: e.target.value }))}
                  className="w-full p-2 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-400 outline-none bg-gray-50 font-medium"
                  placeholder={t('footer_placeholder')}
                />
                <div className="flex gap-1 p-1 bg-gray-100 rounded-xl">
                  {['left', 'center', 'right'].map((align) => (
                    <button
                      key={align}
                      onClick={() => setStyle(s => ({ ...s, footerAlign: align as any }))}
                      className={cn(
                        "flex-1 py-1 rounded-lg text-[9px] font-bold uppercase transition-all",
                        style.footerAlign === align ? "bg-white shadow-sm text-yellow-600" : "text-gray-500 hover:text-gray-700"
                      )}
                    >
                      {t(align as any)}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between pt-2">
                <span className="text-xs font-bold text-gray-600">{t('page_numbers')}</span>
                <button
                  onClick={() => setStyle(s => ({ ...s, showPageNumber: !s.showPageNumber }))}
                  className={cn(
                    "w-10 h-5 rounded-full transition-all relative",
                    style.showPageNumber ? "bg-yellow-400" : "bg-gray-300"
                  )}
                >
                  <div className={cn(
                    "absolute top-1 w-3 h-3 bg-white rounded-full transition-all",
                    style.showPageNumber ? "left-6" : "left-1"
                  )} />
                </button>
              </div>
            </div>
          </CollapsibleSection>
        </div>
      </div>

      {/* Fixed Bottom Export Section */}
      <div className="p-6 border-t border-gray-100 bg-white">
        <button
          onClick={handleExportAll}
          disabled={cards.length === 0}
          className="w-full py-4 bg-black hover:bg-gray-900 disabled:bg-gray-300 text-yellow-400 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all shadow-lg shadow-gray-200 active:scale-[0.98] hover:shadow-xl hover:-translate-y-0.5"
        >
          <Download className="w-5 h-5" />
          {t('export_cards', { count: cards.length })}
        </button>
        <p className="text-[10px] text-center text-gray-400 font-medium mt-3">
          {t('export_description')}
        </p>
      </div>
    </aside>
    </>
  );
};