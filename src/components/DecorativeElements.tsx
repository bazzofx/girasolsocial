import React from 'react';
import { 
  Type, Scissors, Download, Palette, Settings2, Layout, ChevronRight, ChevronLeft,
  ChevronDown, ChevronUp, Copy, Check, RefreshCw, Image as ImageIcon, MoreHorizontal, HelpCircle,
  Sparkles, Circle, Square, Heart, Triangle, Waves, Star, Zap, Moon, Sun, Cloud, Ghost,
  Coffee, Music, Trophy, Target, Flame, Leaf, Wind, Snowflake, Hexagon, Octagon,
  Diamond, Anchor, Award, Bell, Bird, Bomb, Bot, Bug, Cake, Camera, Cat, Cherry,
  Citrus, Coins, Cookie, Crown, Dog, Droplet, Dumbbell, Eye, Feather, Fish, Flag,
  Flower, Flower2, Gamepad2, Gem, Gift, GlassWater, Globe, GraduationCap, Hammer,
  HandMetal, HardHat, Headphones, History, Home, IceCream, Infinity, Key, Lamp,
  Languages, Laptop, Library, LifeBuoy, Lightbulb, Magnet, Mail, Map, MapPin, Martini,
  Medal, Megaphone, Mic, Microscope, Mountain, Mouse, Navigation, Network, Newspaper,
  Package, PaintBucket, Paintbrush, Palmtree, Paperclip, PartyPopper, Pencil, Phone,
  PieChart, PiggyBank, Pill, Pizza, Plane, Play, Plug, Pocket, Podcast, Power, Printer,
  Puzzle, QrCode, Quote, Radiation, Radio, Rat, Receipt, Recycle, Rocket, Rss, Ruler,
  Sailboat, Save, Scale, Scan, Scroll, Search, Send, Server, Settings, Shield, Shirt,
  ShoppingBag, ShoppingCart, Shovel, Shuffle, Sidebar, Sigma, Signal, Siren, Skull,
  Slack, Slash, Slice, Sliders, Smartphone, Smile, Sofa, Soup, Speaker, Sprout, Stamp,
  Stethoscope, Sticker, StickyNote, Sunrise, Sunset, Sword, Swords, Syringe, Table,
  Tablet, Tag, Tent, Terminal, Thermometer, ThumbsDown, ThumbsUp, Ticket, Timer,
  Tornado, ToyBrick, Train, Trash2, TreePine, Trees, Truck, Tv, Twitch, Twitter,
  Umbrella, User, Users, Utensils, Variable, Video, Volume2, Wallet, Wand2, Watch,
  Webcam, Webhook, Weight, Wheat, Wifi, Wine, Workflow, Youtube
} from 'lucide-react';
import { CardStyle } from '../types';

export const DecorativeElements = ({ style, cardIdx }: { style: CardStyle, cardIdx: number }) => {
  if (style.elementIcon === 'none' || style.elementQuantity === 0) return null;

  const elements = [];
  const seed = style.elementSeed + cardIdx;
  
  const random = (s: number) => {
    const x = Math.sin(s) * 10000;
    return x - Math.floor(x);
  };

  const icons: Record<string, any> = {
    Type, Scissors, Download, Palette, Settings2, Layout, ChevronRight, ChevronLeft,
    ChevronDown, ChevronUp, Copy, Check, RefreshCw, ImageIcon, MoreHorizontal, HelpCircle,
    Sparkles, Circle, Square, Heart, Triangle, Waves, Star, Zap, Moon, Sun, Cloud, Ghost,
    Coffee, Music, Trophy, Target, Flame, Leaf, Wind, Snowflake, Hexagon, Octagon,
    Diamond, Anchor, Award, Bell, Bird, Bomb, Bot, Bug, Cake, Camera, Cat, Cherry,
    Citrus, Coins, Cookie, Crown, Dog, Droplet, Dumbbell, Eye, Feather, Fish, Flag,
    Flower, Flower2, Gamepad2, Gem, Gift, GlassWater, Globe, GraduationCap, Hammer,
    HandMetal, HardHat, Headphones, History, Home, IceCream, Infinity, Key, Lamp,
    Languages, Laptop, Library, LifeBuoy, Lightbulb, Magnet, Mail, Map, MapPin, Martini,
    Medal, Megaphone, Mic, Microscope, Mountain, Mouse, Navigation, Network, Newspaper,
    Package, PaintBucket, Paintbrush, Palmtree, Paperclip, PartyPopper, Pencil, Phone,
    PieChart, PiggyBank, Pill, Pizza, Plane, Play, Plug, Pocket, Podcast, Power, Printer,
    Puzzle, QrCode, Quote, Radiation, Radio, Rat, Receipt, Recycle, Rocket, Rss, Ruler,
    Sailboat, Save, Scale, Scan, Scroll, Search, Send, Server, Settings, Shield, Shirt,
    ShoppingBag, ShoppingCart, Shovel, Shuffle, Sidebar, Sigma, Signal, Siren, Skull,
    Slack, Slash, Slice, Sliders, Smartphone, Smile, Sofa, Soup, Speaker, Sprout, Stamp,
    Stethoscope, Sticker, StickyNote, Sunrise, Sunset, Sword, Swords, Syringe, Table,
    Tablet, Tag, Tent, Terminal, Thermometer, ThumbsDown, ThumbsUp, Ticket, Timer,
    Tornado, ToyBrick, Train, Trash2, TreePine, Trees, Truck, Tv, Twitch, Twitter,
    Umbrella, User, Users, Utensils, Variable, Video, Volume2, Wallet, Wand2, Watch,
    Webcam, Webhook, Weight, Wheat, Wifi, Wine, Workflow, Youtube
  };
  
  const IconComponent = icons[style.elementIcon];
  if (!IconComponent) return null;

  const getPosition = (i: number) => {
    if (style.elementPositionMode === 'grid') {
      const cols = Math.ceil(Math.sqrt(style.elementQuantity));
      const rows = Math.ceil(style.elementQuantity / cols);
      const col = i % cols;
      const row = Math.floor(i / cols);
      return {
        x: (col + 0.5) * (100 / cols),
        y: (row + 0.5) * (100 / rows)
      };
    }
    if (style.elementPositionMode === 'border') {
      const side = i % 4;
      const pos = random(seed + i) * 100;
      switch(side) {
        case 0: return { x: pos, y: 0 }; // Top
        case 1: return { x: 100, y: pos }; // Right
        case 2: return { x: pos, y: 100 }; // Bottom
        default: return { x: 0, y: pos }; // Left
      }
    }
    // Default: random
    return {
      x: random(seed + i * 1.1) * 100,
      y: random(seed + i * 2.2) * 100
    };
  };

  for (let i = 0; i < style.elementQuantity; i++) {
    const { x, y } = getPosition(i);
    const rotation = style.elementRandomRotation 
      ? random(seed + i * 3.3) * 360 
      : style.elementRotation;
    const scale = 0.5 + random(seed + i * 4.4) * 1;

    elements.push(
      <div
        key={i}
        className="absolute pointer-events-none"
        style={{
          left: `${x}%`,
          top: `${y}%`,
          transform: `translate(-50%, -50%) rotate(${rotation}deg) scale(${scale})`,
          opacity: style.elementOpacity,
          color: style.elementColor,
          mixBlendMode: style.elementBlendMode as any,
          zIndex: style.elementZIndex === 'behind' ? 1 : 20
        }}
      >
        <IconComponent size={style.elementSize} />
      </div>
    );
  }

  return <>{elements}</>;
};