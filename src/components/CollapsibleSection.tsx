import React, { ReactNode } from 'react';
import { ChevronDown, LucideIcon } from 'lucide-react';
import { cn } from '../utils/cn';

interface CollapsibleSectionProps {
  title: string;
  icon: LucideIcon;
  isOpen: boolean;
  onToggle: () => void;
  badge?: string | number;
  children: ReactNode;
  className?: string;
}

export const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({
  title,
  icon: Icon,
  isOpen,
  onToggle,
  badge,
  children,
  className
}) => {
  return (
    <div className={cn("border-b border-gray-50 last:border-0", className)}>
      <button
        onClick={onToggle}
        className={cn(
          "w-full flex items-center justify-between p-6 transition-all hover:bg-gray-50/50",
          isOpen ? "bg-gray-50/30" : ""
        )}
      >
        <div className="flex items-center gap-3">
          <div className={cn(
            "w-8 h-8 rounded-xl flex items-center justify-center transition-all",
            isOpen ? "bg-yellow-400 text-black shadow-md shadow-yellow-100" : "bg-gray-100 text-gray-500"
          )}>
            <Icon className="w-4 h-4" />
          </div>
          <div className="flex flex-col items-start">
            <span className={cn(
              "text-xs font-bold uppercase tracking-wider transition-all",
              isOpen ? "text-black" : "text-gray-500"
            )}>
              {title}
            </span>
            {badge !== undefined && !isOpen && (
              <span className="text-[10px] font-bold text-yellow-600 bg-yellow-50 px-1.5 rounded-md mt-0.5">
                {badge}
              </span>
            )}
          </div>
        </div>
        <ChevronDown className={cn(
          "w-4 h-4 text-gray-400 transition-transform duration-300",
          isOpen ? "rotate-180 text-yellow-600" : ""
        )} />
      </button>
      
      <div className={cn(
        "overflow-hidden transition-all duration-300 ease-in-out",
        isOpen ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
      )}>
        <div className="p-6 pt-0 space-y-6">
          {children}
        </div>
      </div>
    </div>
  );
};
