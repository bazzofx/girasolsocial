import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Download, Image as ImageIcon, RefreshCw, Sun, Menu } from 'lucide-react';
import { toPng } from 'html-to-image';
import { cn } from '../utils/cn';
import { DecorativeElements } from './DecorativeElements';
import { Texture } from './texture';
import { CardStyle } from '../types';
import { THEMES, TEXTURES } from '../constants';
import { useTranslation } from '../utils/LanguageContext';

const PetalEffect = () => {
  const petals = Array.from({ length: 12 });
  return (
    <div className="absolute inset-x-0 bottom-0 pointer-events-none overflow-visible z-[100]">
      {petals.map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0, x: 0, y: 0, rotate: 0 }}
          animate={{ 
            opacity: [0, 1, 1, 0], 
            scale: [0, 1.2, 1, 0.8], 
            x: (Math.random() - 0.5) * 400, 
            y: -Math.random() * 250 - 150,
            rotate: Math.random() * 720
          }}
          transition={{ 
            duration: 3 + Math.random() * 2, 
            ease: "circOut",
            delay: Math.random() * 0.8
          }}
          className="absolute left-1/2 -translate-x-1/2"
        >
          <div 
            className="w-3 h-5 bg-yellow-400 rounded-full shadow-lg border border-yellow-500/20" 
            style={{ 
              borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
              boxShadow: '0 0 15px rgba(250, 204, 21, 0.4)'
            }} 
          />
        </motion.div>
      ))}
    </div>
  );
};

interface PreviewAreaProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (val: boolean) => void;
  cards: string[];
  style: CardStyle;
  cardRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
  textareaRefs: React.MutableRefObject<(HTMLTextAreaElement | null)[]>;
  handleCardEdit: (idx: number, newContent: string) => void;
}

export const PreviewArea = ({
  isSidebarOpen,
  setIsSidebarOpen,
  cards,
  style,
  cardRefs,
  textareaRefs,
  handleCardEdit
}: PreviewAreaProps) => {
  const { t } = useTranslation();

  return (
    <main className="flex-1 overflow-y-auto p-4 md:p-12 bg-[#f0f2f5] scroll-smooth no-scrollbar relative">
      {/* Mobile Menu Button */}
      {!isSidebarOpen && (
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="fixed top-4 left-4 z-30 p-3 bg-black text-yellow-400 rounded-2xl shadow-xl lg:hidden hover:scale-110 active:scale-95 transition-all"
        >
          <Menu className="w-6 h-6" />
        </button>
      )}

      <div className="max-w-5xl mx-auto space-y-16 mt-12 lg:mt-0">
        {cards.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 justify-items-center pb-20">
            <AnimatePresence mode="popLayout">
              {cards.map((content, idx) => (
                <motion.div
                  key={idx}
                  layout
                  initial={{ opacity: 0, y: 50, scale: 0.8, rotate: -5 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0, 
                    scale: 1,
                    rotate: [0, -2, 2, -1, 1, 0]
                  }}
                  exit={{ opacity: 0, scale: 0.9, y: 20 }}
                  transition={{ 
                    opacity: { duration: 0.4, delay: idx * 0.05 },
                    y: { type: 'spring', damping: 15, stiffness: 100, delay: idx * 0.05 },
                    scale: { type: 'spring', damping: 15, stiffness: 100, delay: idx * 0.05 },
                    rotate: { duration: 0.8, delay: idx * 0.05 + 0.4, ease: "easeInOut" }
                  }}
                  className="relative group"
                >
                  {/* Magical Petal Effect */}
                  <PetalEffect />

                  {/* Card Container with 3:4 Aspect Ratio */}
                  <div
                    ref={(el) => (cardRefs.current[idx] = el)}
                    className="relative overflow-hidden shadow-[0_32px_64px_-12px_rgba(0,0,0,0.15)] transition-all duration-500 group-hover:shadow-[0_48px_80px_-12px_rgba(0,0,0,0.2)]"
                    style={{
                      width: 'min(400px, 90vw)',
                      aspectRatio: '3/4',
                      background: style.gradient || (style.customGradient 
                        ? `linear-gradient(${style.gradientAngle}deg, ${style.backgroundColor} 0%, ${style.gradientColor2} 100%)`
                        : THEMES.find(t => t.name === style.theme)?.gradient || style.backgroundColor),
                      color: style.textColor,
                      borderColor: style.borderColor,
                      borderWidth: `${style.borderWidth}px`,
                      borderRadius: `${style.borderRadius}px`,
                      padding: `${style.padding}px`,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      alignItems: 'stretch',
                      position: 'relative',
                      borderStyle: 'solid'
                    }}
                  >
                    {/* Decorative Elements */}
                    <DecorativeElements style={style} cardIdx={idx} />

                    {/* Background Texture Overlay */}
                    <Texture style={style} />

                    {/* Title */}
                    {style.title && (
                      <div 
                        className={cn(
                          "text-lg font-bold mb-4",
                          style.fontFamily
                        )}
                        style={{ 
                          textAlign: style.titleAlign,
                          color: style.textColor,
                          zIndex: 10
                        }}
                      >
                        {style.title}
                      </div>
                    )}

                    {/* Inner Frame */}
                    {style.innerFrameWidth > 0 && (
                      <div 
                        className="absolute pointer-events-none"
                        style={{
                          top: `${style.innerFramePadding}px`,
                          left: `${style.innerFramePadding}px`,
                          right: `${style.innerFramePadding}px`,
                          bottom: `${style.innerFramePadding}px`,
                          border: `${style.innerFrameWidth}px solid ${style.innerFrameColor}`,
                          borderRadius: `${Math.max(0, style.borderRadius - style.innerFramePadding)}px`,
                          zIndex: 5
                        }}
                      />
                    )}

                    {/* Draggable Text Container */}
                    <div className="flex-1 flex flex-col justify-center">
                      <motion.div
                        drag
                        dragConstraints={cardRefs.current[idx] ? {
                          top: - (533 / 2) + style.padding,
                          left: - (400 / 2) + style.padding,
                          right: (400 / 2) - style.padding,
                          bottom: (533 / 2) - style.padding
                        } : undefined}
                        dragElastic={0.1}
                        dragMomentum={false}
                        className="cursor-move active:cursor-grabbing w-full flex flex-col items-center justify-center"
                        style={{
                          maxHeight: `calc(533px - ${style.padding * 2}px)`,
                          alignItems: style.textAlign === 'center' ? 'center' : style.textAlign === 'left' ? 'flex-start' : 'flex-end',
                          textAlign: style.textAlign,
                        }}
                      >
                        <textarea
                          ref={(el) => (textareaRefs.current[idx] = el)}
                          value={content}
                          onChange={(e) => handleCardEdit(idx, e.target.value)}
                          className={cn(
                            "w-full bg-transparent border-none focus:ring-0 outline-none resize-none transition-all no-scrollbar break-words",
                            style.fontFamily
                          )}
                          style={{ 
                            fontSize: `${style.fontSize}px`,
                            color: 'inherit',
                            height: 'auto',
                            maxHeight: `calc(533px - ${style.padding * 2}px)`,
                            padding: 0,
                            margin: 0,
                            overflow: 'hidden',
                            display: 'block',
                            letterSpacing: `${style.letterSpacing}px`,
                            lineHeight: style.lineHeight,
                            textShadow: style.textShadow ? '0 4px 12px rgba(0,0,0,0.3)' : 'none'
                          }}
                          spellCheck={false}
                          onInput={(e) => {
                            const target = e.target as HTMLTextAreaElement;
                            target.style.height = 'auto';
                            target.style.height = `${target.scrollHeight}px`;
                          }}
                        />
                      </motion.div>
                    </div>

                    {/* Footer */}
                    {style.footer && (
                      <div 
                        className={cn(
                          "text-sm font-medium mt-4",
                          style.fontFamily
                        )}
                        style={{ 
                          textAlign: style.footerAlign,
                          color: style.textColor,
                          zIndex: 10
                        }}
                      >
                        {style.footer}
                      </div>
                    )}

                    {style.showPageNumber && (
                      <div 
                        className="absolute bottom-10 right-10 text-[10px] font-black opacity-30 tracking-[0.2em] uppercase pointer-events-none"
                        style={{ color: style.textColor }}
                      >
                        {idx + 1} / {cards.length}
                      </div>
                    )}
                  </div>

                  {/* Individual Export Button */}
                  <div className="absolute -top-4 -right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                    <button
                      onClick={async () => {
                        const node = cardRefs.current[idx];
                        if (node) {
                          const dataUrl = await toPng(node, { pixelRatio: 3, backgroundColor: style.backgroundColor });
                          const link = document.createElement('a');
                          link.download = `social-card-${idx + 1}.png`;
                          link.href = dataUrl;
                          link.click();
                        }
                      }}
                      className="p-3 bg-black rounded-2xl shadow-xl hover:bg-gray-900 text-yellow-400 transition-all active:scale-90 border border-yellow-400/20"
                      title="Download this card"
                    >
                      <Download className="w-5 h-5" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-[70vh] text-gray-400 space-y-8">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="p-10 bg-white rounded-[40px] shadow-2xl shadow-gray-200 border border-gray-100 relative"
            >
              <Sun className="w-20 h-20 text-yellow-100" />
              <div className="absolute -bottom-2 -right-2 p-3 bg-yellow-400 rounded-2xl shadow-lg">
                <RefreshCw className="w-6 h-6 text-black animate-spin-slow" />
              </div>
            </motion.div>
            <div className="text-center space-y-2">
              <h3 className="text-2xl font-bold text-gray-800">{t('preview_empty_title')}</h3>
              <p className="text-gray-500 max-w-xs mx-auto">{t('preview_empty_desc')}</p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};