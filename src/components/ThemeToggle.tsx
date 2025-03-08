
import { useEffect } from 'react';
import { Lightbulb } from 'lucide-react';
import { useLocalStorage } from '@/hooks/useLocalStorage';

export const ThemeToggle = () => {
  const [theme, setTheme] = useLocalStorage<'light' | 'dark'>('theme', 'dark');
  
  useEffect(() => {
    const root = window.document.documentElement;
    
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
  }, [theme]);
  
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };
  
  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      className="fixed top-6 right-6 p-3 rounded-full glass-card button-glow animate-float z-50"
    >
      <Lightbulb 
        className={`h-6 w-6 transition-all duration-300 ${
          theme === 'light' 
            ? 'text-library-accent fill-library-accent' 
            : 'text-gray-400'
        }`}
      />
      <span className="sr-only">Toggle light mode</span>
    </button>
  );
};
