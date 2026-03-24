import React from 'react';
import { TEXTURES } from '../constants';
import { CardStyle } from '../types';

interface TextureProps {
  style: CardStyle;
}

export const Texture = ({ style }: TextureProps) => {
  if (style.texture === 'none') return null;

  const texture = TEXTURES.find(t => t.value === style.texture);
  if (!texture) return null;

  return (
    <div 
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage: `url("${texture.svg}")`,
        backgroundSize: ['stencil', 'dots', 'lines', 'carbon'].includes(style.texture) ? '20px' : 'cover',
        opacity: style.textureOpacity,
        mixBlendMode: 'multiply',
        zIndex: 1
      }}
    />
  );
};