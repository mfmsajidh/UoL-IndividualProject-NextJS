import { HelpCircle } from 'lucide-react';
import React, { useState } from 'react';

interface HintProps {
  text: string;
}

export function Hint({ text }: HintProps) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative inline-block">
      <button
        type="button"
        className="rounded-full text-blue-400 transition-colors duration-200 hover:text-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        onClick={() => setIsVisible(!isVisible)}
        aria-label="Show hint"
      >
        <HelpCircle className="size-5" />
      </button>
      {isVisible && (
        <div className="absolute z-10 mt-2 w-96 rounded-md border border-gray-700 bg-gray-800 px-4 py-2 text-sm text-gray-200 shadow-lg">
          <div className="absolute -top-0.5 left-2 -mt-2 size-3 rotate-45 border-l border-t border-gray-700 bg-gray-800" />
          <p className="text-justify">{text}</p>
        </div>
      )}
    </div>
  );
}
