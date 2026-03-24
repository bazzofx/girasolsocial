import React from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Sun, 
  Palette, 
  Download, 
  Type, 
  Share2 
} from 'lucide-react';

import { useTranslation } from '../utils/LanguageContext';

export const LandingPage = ({ onStart }: { onStart: () => void }) => {
  const { t, setLanguage, language } = useTranslation();

  return (
    <div className="min-h-screen bg-[#fafafa] text-[#171717] font-sans overflow-x-hidden">
      {/* Language Switcher */}
      <div className="absolute top-6 right-6 z-50 flex gap-2">
        <button 
          onClick={() => setLanguage('en')}
          className={`w-10 h-10 rounded-full flex items-center justify-center text-2xl shadow-sm border transition-all ${language === 'en' ? 'border-yellow-400 bg-white scale-110' : 'border-transparent bg-white/50 hover:bg-white'}`}
          title="English (UK)"
        >
      <img 
        src="https://flagcdn.com/w40/gb.png" 
        alt="UK flag" 
        className="w-6 h-6 object-contain"
      />
        </button>
        <button 
          onClick={() => setLanguage('pt')}
          className={`w-10 h-10 rounded-full flex items-center justify-center text-2xl shadow-sm border transition-all ${language === 'pt' ? 'border-yellow-400 bg-white scale-110' : 'border-transparent bg-white/50 hover:bg-white'}`}
          title="Português (Brasil)"
        >
      <img 
        src="https://flagcdn.com/w40/br.png" 
        alt="Brazil flag" 
        className="w-6 h-6 object-contain"
      />
        </button>
      </div>

      {/* Hero Section */}
      <header className="relative px-6 py-12 lg:py-24 max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8 z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xl font-bold uppercase tracking-wider">
            <Sun className="w-6 h-6 fill-red-400 text-xl" />
            <span>{t('app_name')}</span>
          </div>
          
          <h1 className="text-4xl sm:text-6xl lg:text-8xl font-black tracking-tighter leading-[0.85] uppercase italic">
            {t('hero_title_1')} <br />
            {t('hero_title_2')} <br />
            <span className="text-yellow-500">{t('hero_title_3')}</span>
          </h1>
          
          <p className="text-lg text-gray-500 max-w-md font-medium leading-relaxed">
            {t('hero_subtitle')}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button 
              onClick={onStart}
              className="flex items-center justify-center gap-2 px-8 py-4 px-12 bg-yellow-400 text-black rounded-2xl font-bold text-lg hover:bg-yellow-500 transition-all group shadow-lg shadow-yellow-100"
            >
              {t('get_started')}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <div className="flex items-center gap-4 px-6 text-gray-400 font-bold text-sm">
              <div className="flex -space-x-2">
                {[1, 2, 3].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 overflow-hidden">
                    <img src={`https://picsum.photos/seed/user${i}/100/100`} alt="user" referrerPolicy="no-referrer" />
                  </div>
                ))}
              </div>
              <span>{t('join_creators')}</span>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-yellow-100 rounded-full blur-3xl opacity-50" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-amber-100 rounded-full blur-3xl opacity-50" />
          
          <div className="relative grid grid-cols-2 gap-4 rotate-3 scale-110">
            <div className="space-y-4 translate-y-8">
              <div className="aspect-[3/4] bg-yellow-400 rounded-2xl shadow-2xl flex items-center justify-center p-6 text-black text-center italic font-black text-xl">
                "{t('hero_card_1')}"
              </div>
              <div className="aspect-[3/4] bg-white border-2 border-gray-100 rounded-2xl shadow-xl flex items-center justify-center p-6 text-gray-900 text-center font-serif italic text-lg">
                {t('hero_card_2')}
              </div>
            </div>
            <div className="space-y-4">
              <div className="aspect-[3/4] bg-[#171717] rounded-2xl shadow-2xl flex items-center justify-center p-6 text-white text-center font-mono text-sm">
                {t('hero_card_3')}
              </div>
              <div className="aspect-[3/4] bg-rose-500 rounded-2xl shadow-xl flex items-center justify-center p-6 text-white text-center font-black uppercase text-2xl leading-none">
                {t('hero_card_4').split(' ').map((word, i) => (
                  <React.Fragment key={i}>{word} <br /></React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="bg-white py-24 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
            <h2 className="text-4xl font-black uppercase italic tracking-tight">{t('features_title')}</h2>
            <p className="text-gray-500 font-medium">{t('features_subtitle')}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                icon: <Sun className="w-8 h-8 text-yellow-500 fill-yellow-200" />,
                title: t('feature_smart_splitting_title'),
                desc: t('feature_smart_splitting_desc')
              },
              {
                icon: <Palette className="w-8 h-8 text-rose-500" />,
                title: t('feature_visual_themes_title'),
                desc: t('feature_visual_themes_desc')
              },
              {
                icon: <Download className="w-8 h-8 text-emerald-500" />,
                title: t('feature_instant_export_title'),
                desc: t('feature_instant_export_desc')
              },
              {
                icon: <Sparkles className="w-8 h-8 text-amber-500" />,
                title: t('feature_decorative_elements_title'),
                desc: t('feature_decorative_elements_desc')
              },
              {
                icon: <Type className="w-8 h-8 text-violet-500" />,
                title: t('feature_typography_control_title'),
                desc: t('feature_typography_control_desc')
              },
              {
                icon: <Share2 className="w-8 h-8 text-sky-500" />,
                title: t('feature_social_ready_title'),
                desc: t('feature_social_ready_desc')
              }
            ].map((feature, i) => (
              <div key={i} className="space-y-4 group">
                <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold">{feature.title}</h3>
                <p className="text-gray-500 font-medium leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 bg-[#fafafa]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-12">
              <h2 className="text-5xl font-black uppercase italic tracking-tight leading-none">
                {t('how_it_works_title').split('.')[0]} <br /> <span className="text-yellow-500">{t('how_it_works_title').split('.')[1] || 'works.'}</span>
              </h2>
              
              <div className="space-y-8">
                {[
                  { step: "01", title: t('step_1_title'), desc: t('step_1_desc') },
                  { step: "02", title: t('step_2_title'), desc: t('step_2_desc') },
                  { step: "03", title: t('step_3_title'), desc: t('step_3_desc') },
                  { step: "04", title: t('step_4_title'), desc: t('step_4_desc') }
                ].map((item, i) => (
                  <div key={i} className="flex gap-6">
                    <span className="text-3xl font-black text-yellow-200 italic">{item.step}</span>
                    <div className="space-y-1">
                      <h4 className="text-lg font-bold">{item.title}</h4>
                      <p className="text-gray-500 font-medium">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-8 rounded-[32px] shadow-2xl border border-gray-100">
              <div className="space-y-6">
                <div className="flex items-center gap-4 border-b border-gray-100 pb-6">
                  <div className="w-12 h-12 bg-yellow-400 rounded-xl flex items-center justify-center text-black font-bold">GS</div>
                  <div>
                    <div className="font-bold">{t('editor_title')}</div>
                    <div className="text-xs text-gray-400 font-medium">{t('editor_version')}</div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="h-4 bg-gray-100 rounded-full w-3/4" />
                  <div className="h-4 bg-gray-100 rounded-full w-full" />
                  <div className="h-4 bg-gray-100 rounded-full w-1/2" />
                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <div className="h-32 bg-yellow-50 rounded-2xl border-2 border-yellow-100 border-dashed" />
                    <div className="h-32 bg-rose-50 rounded-2xl border-2 border-rose-100 border-dashed" />
                  </div>
                </div>
                <button 
                  onClick={onStart}
                  className="w-full py-4 bg-black text-yellow-400 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-gray-900 transition-colors"
                >
                  {t('enter_editor')}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-gray-100 text-center text-gray-400 text-sm font-bold uppercase tracking-widest bg-black">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <Sun className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span className="text-white">{t('app_name')}</span>
          </div>
          <div className="flex gap-8">
            <a href="#" className="hover:text-yellow-400 transition-colors text-white/60">Twitter</a>
            <a href="#" className="hover:text-yellow-400 transition-colors text-white/60">GitHub</a>
          </div>
          <div className="text-white/40">© 2026 {t('all_rights_reserved')}</div>
        </div>
      </footer>
    </div>
  );
};